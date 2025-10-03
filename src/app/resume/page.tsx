import React from 'react';

const Resume = () => {
  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Ayaan Farooq</h1>
          <p className="text-lg mt-2">Full Stack Developer</p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Contact</h2>
          <p className="mb-1">0312-1234567</p>
          <p className="mb-1">ayaan.dev@example.com</p>
          <p className="mb-1">linkedin.com/in/ayaanfarooq</p>
          <p>House #22, Street 10, Bahria Town, Islamabad</p>
        </div>

        {/* Objective */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Objective</h2>
          <p>
            Passionate software developer with 3+ years of experience in building web apps using JavaScript, TypeScript, and modern frameworks. Eager to contribute to team success through hard work and clean code.
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Technical Skills</h2>
          <p className="mb-1">React.js</p>
          <p className="mb-1">Next.js</p>
          <p className="mb-1">Node.js</p>
          <p className="mb-1">TypeScript</p>
          <p className="mb-1">Tailwind CSS</p>
          <p>MongoDB</p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Experience</h2>
          
          <div className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Frontend Developer</h3>
              <span>Jan 2022 – Present</span>
            </div>
            <p className="mb-1">Tech Solutions Inc.</p>
            <p>Developed responsive web applications using React and modern front-end technologies.</p>
          </div>
          
          <div>
            <div className="flex justify-between">
              <h3 className="font-semibold">Junior Web Developer</h3>
              <span>Jul 2020 – Dec 2021</span>
            </div>
            <p className="mb-1">WebCraft Studio</p>
            <p>Built and maintained client websites using HTML, CSS, JavaScript, and WordPress.</p>
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Education</h2>
          
          <div className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">BS in Computer Science</h3>
              <span>2016-2020</span>
            </div>
            <p>COMSATS University Islamabad</p>
            <p>CGPA: 3.55</p>
          </div>
          
          <div>
            <div className="flex justify-between">
              <h3 className="font-semibold">Intermediate (Pre-Engineering)</h3>
              <span>2014-2016</span>
            </div>
            <p>Punjab College, Islamabad</p>
            <p>Grade: A</p>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-xl font-bold mb-2">Projects</h2>
          
          <div>
            <h3 className="font-semibold">E-Commerce Store (Next.js + Stripe)</h3>
            <p>Developed a modern full-stack e-commerce app with product management, shopping cart, checkout (Stripe), and user authentication.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

