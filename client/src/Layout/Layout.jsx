import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({children}) => {
	return (
		<div className="">
			<Navbar />
			<div className="min-h-[90vh]"> {children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
