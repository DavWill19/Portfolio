import React from "react";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";

export const Parallax = (props) => {


    return (
        <Fade>
            <div className="animate text-center four sticky">
                <span>A</span><span>b</span><span>o</span><span>u</span>
                <span>t</span>&nbsp;<span>M</span><span>e</span>

            </div>
        </Fade>
    );
}
export default Parallax;

