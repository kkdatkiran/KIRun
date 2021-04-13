import React from "react";

export default function Home() {
  const sample = { abcde: 2, value: 3 };
  return (
    <>
      <h1>What is Kinetic Instruction Runtime (KIRUN)?</h1>
      <p>
        <br />
        KIRUN, in simple terms, is a toolset or an entry point to build a no-code or low code platform.
        <br />
        <br />
        Every application at one point in time needs to supply customization for each client. There are no set rules or products
        readily available to the developer to integrate without having to jump through a lot of hoops. Here I am building this
        product to supply the toolset to enable end-user to easily change logic without needing to have programming knowledge with
        the minimal development effort.
        <br />
        <br />
        The idea here is to supply a set of instructions in JSON format and execute them. The heart of this product is to define a
        schema definition for the JSON formatted instructions and an engine to run them. Also, a UI tool which can be used to
        create the instruction set and easily integrated into any web application.
        <br />
        <br />
      </p>
      <h2>Example</h2>
      <div className="json">
        <div className="header">Generate fibonacci numbers and return them.</div>
        <div className="body">{JSON.stringify(sample, null, 2)}</div>
      </div>
      <p>
        <br />
        To understand better, please checkout the demo.
      </p>
    </>
  );
}
