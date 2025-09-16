import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoleOfHonor from './RoleOfHonor'
import Main from './main'
import PhotoGallery from './PhotoGallery';
import ImageUploadPage from './photoUpload';
import GalleryLogin from './GalleryLogin';
import BoardOfDirectors from './BoardOfDirectors';
import PurchaseForms from './PurchaseForms';
import CyberCirculars from './CyberCirculars';
import CyberAwarenessVideos from './AwarnessVedios';
import CyberManuals from './CyberManuals';
import AssignTask from './TaskManager';
import TMLoginPage from './TaskmngLogin';
import TaskDelegationPage from './DelegatedTasks';
import Circulars from './Circulars';
import CircularLogin from './CircularLogin';
import UploadCircular from './CircularUpload';
import TripReports from './TripReports';
import Sop from './sop';
import SafetyForms from './safetyforms';
import InsertGrossGeneration from './GossGenerationData';
import CapexTargetsPage from './capex_targets';
import Contract from './Contract';
import Circular_contract from './Circular_contract';
import Manual from './Manual';
import ContractAndPurchase from './ContractAndPurchase';
import HRPhotoGallery from './HRPhotoGallery'
import HRImageUploadPage from './HRImageUploadPage';
import HRGalleryLogin from './HrGalleryLogin';
import Dashboard from './PowerGenerationDisplay';
import AIToolsPage from './AItools';
// import HindiWordOfTheDay from '../../../IP Manager/ip_manage/src/HindiWord';

function App() {
  

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/roleofhonor" element={<RoleOfHonor />} />
          <Route path="/photogallery" element={<PhotoGallery />} />
          <Route path="/photoupload" element={<ImageUploadPage />} />
          <Route path='/hrgallerylogin' element={<HRGalleryLogin/>}/>
          <Route path="/hrphotogallery" element={<HRPhotoGallery />} />
          <Route path="/hrphotoupload" element={<HRImageUploadPage />} />
          <Route path="/gallerylogin" element={<GalleryLogin />} />
          <Route path="/boardofdirectors" element={<BoardOfDirectors />} />
          <Route path="/purchaseforms" element={<PurchaseForms />} />
          <Route path="/cybersecurity" element={<CyberCirculars />} />
          <Route path="/cyber-awareness-videos" element={<CyberAwarenessVideos />} />
          <Route path="/cyber-manuals" element={<CyberManuals />} />
          <Route path='/taskmanager' element={<AssignTask/>}/>
          <Route path='/taskmanager-login' element={<TMLoginPage/>}/>
          <Route path='/delegatedtasks' element={<TaskDelegationPage/>}/>
          <Route path='/circulars' element={<Circulars/>}/>
          <Route path='/circularlogin' element={<CircularLogin/>}/>
          <Route path='/circularupload' element={<UploadCircular/>}/>
          <Route path='/tripreports' element={<TripReports/>}/>
          <Route path='/safetyforms' element={<SafetyForms/>}/>
          <Route path='/sop' element={<Sop/>}/>
          <Route path='/update-gross-generation' element={<InsertGrossGeneration/>}/>
          <Route path='/capex-targets' element={<CapexTargetsPage/>}/>
          <Route path='/contarct-purchase' element={<Contract/>}/>
          <Route path='/contract-circulars' element={<Circular_contract/>}/>
          <Route path='/contrat-manuals' element={<Manual/>}/>
          <Route path='/ContractandPurchase' element={<ContractAndPurchase/>}/>
          <Route path='/power-generation' element={<Dashboard/>}/>
          <Route path='/ai-for-engineers' element={<AIToolsPage/>}/>
          {/* <Route path='hindiword' element={<HindiWordOfTheDay/>}/> */}
        </Routes>
      </Router>
    
  
  );
}

export default App;
