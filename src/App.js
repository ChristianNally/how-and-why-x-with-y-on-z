import './App.css';
import { useState, useEffect } from 'react';

function App() {

	// default code_snippets
	const default_task = 'object_detection';
	const default_stack = 'tensorflow';
	const default_framework = 'flask';
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
	const [code, setCode] = useState(code_snippets[`${default_task}-${default_stack}-${default_framework}-${default_deployment}`]); 	// state to hold the code snippet

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
		console.log(`Current state: task=${task}, stack=${stack}, framework=${framework}, deployment=${deployment}`);
		let code = code_snippets[`${task}-${stack}-${framework}-${deployment}`];
		if (code) {
			setCode(code);
		} else {
			setCode('n/a');
		}
	}, [task, stack, framework, deployment]);

  return (
    <div className="App">
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
				<pre>
					<code>
						{code.code}
					</code>
				</pre>
      </article>
    </div>
  );
}

export default App;
