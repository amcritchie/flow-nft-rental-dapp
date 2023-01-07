// import PackDetails from '../pages/PackDetails.page'
// import Collection from '../pages/Collection.page'
// import Dappies from '../pages/Dappies.page'
// import Packs from '../pages/Packs.page'
// import Home from '../pages/Home.page'
// import Designer from '../pages/Designer.page'

import Home from '../components/home/Home';
import Interact from '../components/interact/Interact';
import UpdateProfile from '../components/updateProfile/UpdateProfile';
import Mutate from '../components/mutate/Mutate';
import Query from '../components/query/Query';
import FlowAccountDetails from '../components/flowAccountDetails/FlowAccountDetails';
import Legacy from '../components/legacy/Legacy';
import MyMoments from '../components/myMoments/MyMoments';


{/* <Routes>
<Route path="/" element={<Home />} />
<Route path="/interact" element={<Interact />} />
<Route path="/updateProfile" element={<UpdateProfile />} />
<Route path="/mutate" element={<Mutate />} />
<Route path="/query" element={<Query />} />
<Route path="/flowAccountDetails" element={<FlowAccountDetails />} />
<Route path="/legacy" element={<Legacy />} />
<Route path="/myMoments" element={<MyMoments />} />
</Routes> */}

export const ROUTES = [
  { name: "Home", path: "/", component: Home, nav: true },
  { name: "Interact", path: "/interact", component: Interact, nav: true },
  { name: "UpdateProfile", path: '/updateProfile', component: UpdateProfile, nav: true },
  { name: "Mutate", path: '/mutate', component: Mutate, nav: true },
  { name: "Query", path: '/query', component: Query, nav: true },
  { name: "Account", path: '/flowAccountDetails', component: FlowAccountDetails, nav: true },
  { name: "Legacy", path: '/legacy', component: Legacy, nav: true },
  { name: "My Moments", path: '/myMoments', component: MyMoments, nav: true }
]

export const NAV_ROUTES = ROUTES.filter(r => r.nav)




