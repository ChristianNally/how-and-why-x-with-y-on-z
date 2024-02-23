import './App.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Import a style of your choice
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useEffect } from 'react';

function App() {

	// default code_snippets
	const default_task = 'object_detection';
	const default_stack = 'pytorch';
	const default_framework = 'fastapi';
	const default_deployment = 'aws';

	// each key is formed from the value of the task, stack, framework, and deployment
	// thusly... ${task}-${stack}-${framework}-${deployment}
	const code_snippets = {
		'object_detection-tensorflow-flask-aws' : {
			"task": "object_detection",
			"stack": "tensorflow",
			"framework": "flask",
			"deployment": "aws",
			"code": "import tensorflow as tf\nfrom flask import Flask, request\napp = Flask(__name__)\""
		},
		'object_detection-pytorch-fastapi-aws' : {
			"task": "object_detection",
			"stack": "pytorch",
			"framework": "fastapi",
			"deployment": "aws",
			"code": "object_detection-pytorch-fastapi.txt"
		},
		'image_classification-tensorflow-flask-gcp': {
			"task": "image_classification",
			"stack": "tensorflow",
			"framework": "flask",
			"deployment": "gcp",
			"code": "import tensorflow as tf\nfrom flask import Flask, request\napp = Flask(__name__)\""
		},
		'image_generation-tensorflow-flask-azure' : {
			"task": "image_generation",
			"stack": "tensorflow",
			"framework": "flask",
			"deployment": "azure",
			"code": "import tensorflow as tf\nfrom flask import Flask, request\napp = Flask(__name__)\""
		},
		'image_segmentation-tensorflow-flask-heroku': {
			"task": "image_segmentation",
			"stack": "tensorflow",
			"framework": "flask",
			"deployment": "heroku",
			"code": "import tensorflow as tf\nfrom flask import Flask, request\napp = Flask(__name__)\""
		},
	};

	const [task, setTask] = useState(default_task);
	const [stack, setStack] = useState(default_stack);
	const [framework, setFramework] = useState(default_framework);
	const [deployment, setDeployment] = useState(default_deployment);
	const [code, setCode] = useState(''); 	// state to hold the code snippet

	const handle = (e) => {
		const name = e.target.name; 		// get the name of the select element
		const value = e.target.value;		// get the new value of the select element

		console.log(`Changing ${name} to ${value}`);

		switch(name) { 		// set the state of the select element
			case 'task':
				setTask(value);
				break;
			case 'stack':
				setStack(value);
				break;
			case 'framework':
				setFramework(value);
				break;
			case 'deployment':
				setDeployment(value);
				break;
			default:
				break;
		}
	};

// update the code snippet when the state changes
useEffect(() => {
  const snippetKey = `${task}-${stack}-${framework}-${deployment}`;
  const snippet = code_snippets[snippetKey];
	console.log('snippet', snippet);

  // Check if the code snippet is a file name (ends with '.txt') or direct code
  if (snippet && snippet.code.endsWith('.txt')) {
    // It's a file name, fetch its contents
    fetch(`/code_samples/${snippet.code}`)
      .then(response => response.text()) // Convert the readable stream to text
      .then(text => {
        setCode(text); // Update the code state with the fetched text
      })
      .catch(error => {
        console.error('Error fetching code:', error);
        setCode('Error loading code snippet.');
      });
  } else {
    // It's direct code, set it directly
    // setCode(snippet.code); // Update the code state with the direct code
		console.log('not a text file');
		setCode('no text file');
	}
}, [task, stack, framework, deployment]); // Dependency array


  return (
    <div className="App">
		<h1>HoWXYZ</h1>
		<h3>How and Why do X with Y on Z</h3>
      <header className="App-header">
				<label htmlFor="task">Task</label>
				<select id="tast" name="task" onChange={handle}>
					<option value="object_detection">Object Detection</option>
					<option value="image_classification">Image Classification</option>
					<option value="image_generation">Image Generation</option>
					<option value="image_segmentation">Image Segmentation</option>
					<option value="image_restoration">Image Restoration</option>
					<option value="image_super_resolution">Image Super Resolution</option>
					<option value="image_colorization">Image Colorization</option>
        </select>
				<label htmlFor="stack">Stack</label>
				<select id="stack" name="stack" onChange={handle}>
					<option value="tensorflow">tensorflow</option>
					<option value="pytorch">pytorch</option>
					<option value="keras">keras</option>
				</select>
				<label htmlFor="stack">Framework</label>
				<select name="framework" onChange={handle}>
					<option value="flask">flask</option>
					<option value="django">django</option>
					<option value="fastapi">fastapi</option>
				</select>
				<label htmlFor="deployment">Deployment</label>
				<select name="deployment" onChange={handle}>
					<option value="aws">aws</option>
					<option value="gcp">gcp</option>
					<option value="azure">azure</option>
					<option value="heroku">heroku</option>
				</select>
      </header>
      <article>
				<SyntaxHighlighter language="python" style={dark}>
          {code}
        </SyntaxHighlighter>
      </article>
    </div>
  );
}

export default App;
