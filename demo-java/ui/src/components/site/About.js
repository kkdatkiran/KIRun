import React from "react";

export default function About() {
  const year = Math.round(
    (Date.now() - new Date("November 7, 2005 09:00:00").getTime()) /
      (365 * 24 * 60 * 60 * 1000)
  );
  return (
    <>
      <h1>ABOUT</h1>
      <p>
        <br />
        My name is <b>Kiran Grandhi</b>. I have been developing applications for{" "}
        {year} years in various domains on multiple platforms, all along I had
        trouble providing a window for an end-user to edit a piece of logic here
        or there. I recently had a lot of time to think while recovering from
        COVID-19 lying on the bed. It gave me a thought about why not define
        language simple enough to build in JSON.
        <br />
        <br />
        The objective of this deceptively simple initative is to understand the
        structured JSON input and execute it as instructions of a program. More
        you put your thought about it, the more fascinating it appears and
        becomes. An unstructured text called a program fed to an interpreter or
        a compiler it starts breaking it into meaningful tokens and try to
        execute. Here trying to keep it simple using a structured JSON map with
        pre-defined operations. A user can easily edit this JSON with a simple
        visual tool to change the course of execution logic.
        <br />
        <br />
        This initative will be managed by few people, maybe only one, to
        showcase the idea. The code will be available in the repository for
        others to be accessed and run and see and use the code where and when
        wanted. Maybe, later I shall make it as a library to be used as a
        module.
      </p>
    </>
  );
}
