import { html, render } from "lit-html";

const fetchData = async () => {};

const styles = () => {
  return html`
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
      .container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 400px;
      }
      .label-form {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .input-form {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      .input-form:focus {
        outline: none;
      }
      .btn-form {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #ccc;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease-in-out;
      }
      .btn-form:hover {
        background-color: #fff;
        color: #000;
        border: none;
        transform: scale(1.1);
      }
      .result {
        display: flex;
        width: 100%;
        justify-content: center;
      }
      .result_con {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .result_link {
        text-decoration: none;
        color: #000;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .result_link:hover {
        text-decoration: underline;
        transform: scale(1.1);
    }
    </style>
  `;
};

const createResult = (url, short) => {
  console.log(url, short);
  render(
    html`
      <div class="result_con">
        <div>
          <a class="result_link" href="${short}">${short}</a>
        </div>
      </div>
    `,
    document.getElementById("result")
  );
};

const formTemplate = () => {
  return html`
    <form class="form">
      <label for="url" class="label-form">URL</label>
      <input
        name="url"
        id="url_to_change"
        type="text"
        id="url"
        class="input-form"
        placeholder="Enter URL"
      />
      <button
        @click=${(e) => {
          e.preventDefault();
          const url = document.getElementById("url_to_change").value;

          fetch("http://localhost:5000/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: url,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              if (data.error) {
                alert(data.error);
              } else {
                createResult(url, data.short);
              }
            });
        }}
        type="submit"
        class="btn-form"
      >
        Submit
      </button>
    </form>
  `;
};

const app = () => {
  return html`
    ${styles()}
    <div class="container">${formTemplate()}</div>

    <div class="result" id="result"></div>
  `;
};

render(app(), document.getElementById("app"));
