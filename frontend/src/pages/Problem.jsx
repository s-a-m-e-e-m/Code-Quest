import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getIssue, solveIssue } from '../utils/links';
import Editor from '@monaco-editor/react'
import { AuthContext } from '../auth/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { GiTwoCoins } from "react-icons/gi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import Comments from '../components/Comments';

const Problem = () => {

    const { id } = useParams();
    const [issue, setIssue] = useState(null);
    const [error, setError] = useState("");
    const { user } = useContext(AuthContext);

    const [userCode, setUserCode] = useState("");

    const fetchIssue = async () => {
        try {
            const res = await axios.get(`${getIssue}/${id}`,
                { withCredentials: true });
            setIssue(res.data.issue);
            setUserCode(res.data.issue.buggyCode);

        } catch (error) {
            setError("Something went wrong. Please try again later")
        }
    }

    useEffect(() => {
        fetchIssue();
    }, [id]);

    const executeCode = async (code, language = 'js') => {
        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: language,
                version: language === 'js' ? '18.15.0' : '*',
                files: [
                    {
                        content: code
                    }
                ],
            });
            handleSolveIssue(response.data.run.output)
        } catch (error) {
            console.error("Piston API Error: ", error.message);
            throw new Error("Code execution failed");
        }
    };

    const handleSolveIssue = async (generatedOutput) => {
        try {
            const res = await axios.post(solveIssue, {
                issueId: id,
                generatedOutput: generatedOutput,
                userId: user._id
            }, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data?.message || "Correct Answer")
            }
        } catch (error) {
            toast.error(error.response?.data?.message + " Try again");
        }
    }

    const isRunnableCategory = issue?.category === 'Syntax' || issue?.category === 'Logic';

    const handleSubmit = () => {
        if (!issue) return;
        if (isRunnableCategory) {
            executeCode(userCode, 'js');
        } else {
            handleSolveIssue(userCode);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Toaster position="top-center" />

            <div className="max-w-7xl mx-auto p-4 lg:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Issue */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-md transition-shadow order-1">
                        <div className="p-6 lg:p-8">
                            {issue ? (
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{issue.title}</h1>
                                    <p className="text-gray-800 text-lg leading-relaxed mb-6">{issue.description}</p>

                                    <div className="mb-6">
                                        <h3 className='text-md font-semibold text-gray-700 uppercase tracking-wide mb-3'>Tags & Rewards</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{issue.category}</span>
                                            <span className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">{issue.status}</span>
                                            <span className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-full text-xs font-medium"><GiTwoCoins /> {issue.rewards.coins}</span>
                                            <span className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"><BsFillLightningChargeFill /> {issue.rewards.xp}</span>
                                        </div>
                                    </div>

                                    {issue.solvedBy !== null && (
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <p className="text-sm text-gray-600">✓ Solved by <Link to={`/profile/${issue.solvedBy}`} className="font-semibold text-blue-600 hover:text-blue-700">{issue.solvedBy}</Link></p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center py-12">
                                    <p className="text-red-500 text-lg text-center">{error}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-md transition-shadow flex flex-col order-2">
                        <div className="p-6 lg:p-8 border-b border-gray-200">
                            <h3 className='text-2xl font-bold text-gray-900'>Fix the Code</h3>
                            <p className="text-md text-gray-600 mt-1">Identify and correct the bugs in the code below</p>
                        </div>

                        <div className="p-6 lg:p-8 border-t border-gray-200">
                            <button
                                onClick={handleSubmit}
                                disabled={!user || !issue}
                                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                {user ? 'Submit Solution' : 'Login to Submit'}
                            </button>
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <Editor
                                height={"500px"}
                                defaultLanguage="javascript"
                                theme="light"
                                value={userCode}
                                onChange={(value) => setUserCode(value)}
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 16, bottom: 16 },
                                }}
                            />
                        </div>

                    </div>

                    {/* Discussion */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow lg:col-span-2 order-3">
                        <Comments />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Problem