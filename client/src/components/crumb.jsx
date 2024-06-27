// Breadcrumbs.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const mainpairs = {
    athome: "Home Play",
    playPlaces: "Museum Play",
    playstyles: "Playstyles"
  }
  const pathnames = location.pathname.split('/').filter((x) => x);
    const transformToGoodText = (path) => {
        switch(path){
            case "athome":
                return "Home Play";
            case "playPlaces":
                return "Museum Play";
            case "playstyles":
                return "Playstyles"
            default:
                return "Current Page"

        
        }
    }
  return (
    <div>
      <Link className={"noLink"} to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={name}>
            <span > &gt; </span>
            {isLast ? (
              <span className={'noLink'}>{transformToGoodText(name)}</span>
            ) : (
              <Link className={"noLink"} to={routeTo}>{transformToGoodText(name)}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
