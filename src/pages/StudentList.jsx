import { useState, useRef } from "react";
import InputField from "../component/InputField";
import { CiUser, CiBookmark } from "react-icons/ci";
import { BsChatSquareText } from "react-icons/bs";
import { FaCircleChevronDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent, deleteStudent } from "../Store/slices/StudentSlice";

const StudentList = ({ handleLogout }) => {    
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);

  const [state, setState] = useState({
    showModal: false,
    name: "",
    subject: "",
    mark: "",
    editPopup: false,
    editPopupIndex: null,
    isEditing: false,
    editIndex: null,
    errors: {}
  });

  const openModal = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: true,
      isEditing: false,
      name: "",
      subject: "",
      mark: "",
      errors: {}
    }));
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: false,
      isEditing: false,
      name: "",
      subject: "",
      mark: "",
      errors: {}
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...state.errors };

    if (name === "name") {
      if (!/^[a-zA-Z]+$/.test(value)) {
        errors[name] = "Must be alphabets";
      }else if(value.length < 5){
        errors[name] = "Must be of 5 chars";
      }else {
        delete errors[name];
      }
    } else if (name === "subject") {
      if (!/^[a-zA-Z]+$/.test(value)) {
        errors[name] = "Must be alphabets";
      }else if(value.length < 5){
        errors[name] = "Must be of 5 chars";
      }else {
        delete errors[name];
      }
    } else if (name === "mark") {
      if (!/^[0-9]+$/.test(value)) {
        errors[name] = "Must be a digit";
      }else if(value.length < 1){
        errors[name] = "Must be of 1 chars";
      }else {
        delete errors[name];
      }
    }

    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors
    }));
  };

  const handleAddStudent = () => {
    const { name, subject, mark, errors } = state;

    if (Object.keys(errors).length === 0 && name && subject && mark) {
      dispatch(addStudent({ name, subject, mark }));
      setState((prevState) => ({
        ...prevState,
        showModal: false,
        name: "",
        subject: "",
        mark: "",
        errors: {}
      }));
    }
  };

  const handleEdit = (index) => {
    const student = students[index];
    setState((prevState) => ({
      ...prevState,
      showModal: true,
      name: student.name,
      subject: student.subject,
      mark: student.mark,
      editIndex: index,
      isEditing: true,
      editPopup: false,
      errors: {}
    }));
  };

  const handleSaveChanges = () => {
    const { name, subject, mark, editIndex, errors } = state;

    if (Object.keys(errors).length === 0 && name && subject && mark) {
      dispatch(updateStudent({ index: editIndex, name, subject, mark }));
      setState((prevState) => ({
        ...prevState,
        showModal: false,
        name: "",
        subject: "",
        mark: "",
        isEditing: false,
        errors: {}
      }));
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteStudent(index));
    setState(((prevState) => ({
      ...prevState,
      editPopup: false
    })));
  };

  const editButtonRef = useRef(null);
  const toggleEditPopup = (index, e) => {
    setState((prevState) => ({
      ...prevState,
      editPopup: !prevState.editPopup,
      editIndex: prevState.editPopup ? null : index,
    }));

    const buttonPosition = e.currentTarget.getBoundingClientRect();
    editButtonRef.current = {
      top: buttonPosition.top,
      left: buttonPosition.left,
    };
  };

  const navigate = useNavigate();
  const onLogout = () => {
    handleLogout();
    navigate('/');
  }

  return (
    <div className="flex flex-col gap-y-5 sm:mx-10">
      <div className="flex justify-between items-center pt-5">
        <div className="text-xl text-red-500 pl-5 sm:pl-1">tailwebs.</div>
        <div className="flex gap-x-4 text-base pr-3">
          <div>Home</div>
          <div onClick={onLogout} className="cursor-pointer">Logout</div>
        </div>
      </div>
      <div className="overflow-x-hidden shadow-md sm:rounded-lg pb-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Mark
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {students.map((student, index) => (
              <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex items-center gap-x-2">
                    <div className="h-8 w-8 bg-blue-400 border rounded-full flex justify-center items-center text-white">
                      <div>{student.name[0].toUpperCase()}</div>
                    </div>
                    <div>{student.name}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{student.subject}</td>
                <td className="px-6 py-4">{student.mark}</td>

                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-black cursor-pointer"
                    onClick={(e) => toggleEditPopup(index, e)}

                  >
                    <FaCircleChevronDown />
                  </a>
                  {/* Popup for edit starts */}
                  {state.editPopup && state.editIndex === index && (
                    <>
                      <div 
                      className="max-h-full w-20 
                      text-black flex flex-col 
                      items-start gap-y-1 bg-white 
                      text-sm border rounded-lg 
                      shadow-lg pl-1 py-2 
                      absolute right-[25px] 
                      sm:absolute sm:right-[55px] 
                      md:absolute md:right-[85px]
                      lg:absolute lg:right-[140px]
                      xl:absolute xl:right-[200px]
                      2xl:absolute 2xl:right-[260px]                      
                      ">
                        <div className="cursor-pointer" onClick={() => handleEdit(index)}>Edit</div>
                        <div className="cursor-pointer" onClick={() => handleDelete(index)}>Delete</div>
                      </div>
                    </>
                  )}
                  {/* Popup for edit ends */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pl-5 sm:pl-1">
        <button className="bg-black text-white px-8 py-2" onClick={openModal}>
          ADD
        </button>
      </div>
      {/* Modal form to add students starts */}
      {state.showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white px-10 rounded-sm flex flex-col gap-y-6 border border-red-50 relative md:px-28 md:relative ">
            <div className="flex justify-end" onClick={handleClose}>
              <div className="text-2xl absolute top-0 right-5 md:absolute md:top-1 md:right-4">x</div>
            </div>
            <div>
              <InputField
                nameIcon={<CiUser />}
                label={"Name"}
                onChange={handleChange}
                fieldName={"name"}
                value={state.name}
                error={state.errors.name}
              />
            </div>
            <div>
              <InputField
                subjectIcon={<BsChatSquareText />}
                label={"Subject"}
                onChange={handleChange}
                fieldName={"subject"}
                value={state.subject}
                error={state.errors.subject}
              />
            </div>
            <div>
              <InputField
                markIcon={<CiBookmark />}
                label={"Marks"}
                onChange={handleChange}
                fieldName={"mark"}
                value={state.mark}
                error={state.errors.mark}
              />
            </div>
            <div className="text-center pb-8 md:pt-5">
              <button
                className="bg-black px-7 py-1 text-white"
                onClick={state.isEditing ? handleSaveChanges : handleAddStudent}
              >
                {state.isEditing ? "SUBMIT" : "ADD STUDENT"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal form to add students ends */}
    </div>
  );
};

export default StudentList;