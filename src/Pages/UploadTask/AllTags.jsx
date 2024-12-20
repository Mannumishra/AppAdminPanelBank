import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTags = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://www.api.goldstarstamps.com/api/get-all-task');
                const filtertask = response.data.data
                const allfilterData = filtertask.filter((x)=>x.status==="Pending")
                setTasks(allfilterData); // Set the tasks data from the API response
                setIsLoading(false);
            } catch (error) {
                toast.error('Error fetching tasks');
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Tasks</h4>
                </div>
                <div className="links">
                    <Link to="/add-task" className="add-new">Add New Task <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>
            <section className="d-table">
                {isLoading ? (
                    <p>Loading tasks...</p>
                ) : (
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Assign Date</th>
                                <th scope="col">Bank Name</th>
                                <th scope="col">Product</th>
                                <th scope="col">Applicant Name</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Applicant Address</th>
                                <th scope="col">Trigger</th>
                                <th scope="col">Verifier</th>
                                <th scope="col">Status</th>
                                {/* <th scope="col">Edit</th>
                                <th scope="col">Delete</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={task._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{task.assignDate}</td>
                                    <td>{task.bankName}</td>
                                    <td>{task.product}</td>
                                    <td>{task.applicantName}</td>
                                    <td>{task.contactNumber}</td>
                                    <td>{task.address}</td>
                                    <td>{task.trigger}</td>
                                    <td>{task.verifierNameOrId}</td>
                                    <td>{task.status}</td>
                                    {/* <td><Link to={`/edit-task/${task._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link></td>
                                    <td><button className="bt delete" onClick={() => handleDelete(task._id)}>Delete <i className="fa-solid fa-trash"></i></button></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );

    // const handleDelete = async (taskId) => {
    //     try {
    //         await axios.delete(`https://www.api.goldstarstamps.com/api/delete-task/${taskId}`);
    //         setTasks(tasks.filter(task => task._id !== taskId)); // Remove the deleted task from the state
    //         toast.success('Task deleted successfully');
    //     } catch (error) {
    //         toast.error('Error deleting task');
    //     }
    // };
}

export default AllTags;
