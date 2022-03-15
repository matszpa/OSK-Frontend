import './App.css';
import NavigationBar from "./components/navigationBar/NavigationBar";
import {Routes, Route} from "react-router-dom";
import {SingleQuestionPage} from "./pages/SingleQuestionPage";
import {HomePage} from "./pages/HomePage";
import {CategoryList} from "./components/CategoryList/CategoryList";
import {ExamPage} from "./pages/ExamPage";
import {AddQuestion} from "./components/AdminPageComponents/AddQuestion";
import {NotFound} from "./components/NotFound/NotFound";
import {QuestionList} from "./components/AdminPageComponents/QuestionList";
import {LoginPage} from "./pages/LoginPage";
import {AddNewUser} from "./pages/AddNewUser";
import {UserListPage} from "./pages/UserListPage";
import {TrainingPage} from "./pages/TrainingPage";
import {Container} from "./components/HelperComponents/Container";
import {DrivingPage} from "./pages/DrivingPage";
import {ProfilePage} from "./pages/ProfilePage";
import {LecturePage} from "./pages/LecturePage";

function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Container>
                <Routes>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/singleQuestion" element={<CategoryList/>}/>
                    <Route path="/singleQuestion/:Category" element={<SingleQuestionPage/>}/>
                    <Route path="/exam/" element={<CategoryList/>}/>
                    <Route path="/exam/:Category" element={<ExamPage/>}/>
                    <Route path="/qustions" element={<QuestionList/>}/>
                    <Route path="/addQuestion" element={<AddQuestion/>}/>
                    <Route path="/users" element={<UserListPage/>}/>
                    <Route path="/users/addNewUser" element={<AddNewUser/>}/>
                    <Route path="/training" element={<TrainingPage/>}/>
                    <Route path="/driving" element={<DrivingPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/lecture" element={<LecturePage/>}/>
                </Routes>
            </Container>

        </div>
    );
}

export default App;
