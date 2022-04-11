import "./assets/styles/main.scss"

function ThemeTest() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" tabIndex="-1" aria-disabled="true">Another Link</a>
                    </li>  
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                    </li>
                    </ul>
                    <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                </div>
            </nav>
            <div className="container-xxl">
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-6">
                    <div className="mt-3 mb-3">
                        <p>Hello this is body text, Documentation and examples for common text utilities to control 
                            alignment, wrapping, weight, and more.</p>
                    </div>

                        <div className="mt-5 mb-5">
                            <button type="button" className="btn btn-primary">Primary</button>
                            <button type="button" className="btn btn-secondary">Secondary</button>
                            <button type="button" className="btn btn-success">Success</button>
                            <button type="button" className="btn btn-danger">Danger</button>
                            <button type="button" className="btn btn-warning">Warning</button>
                            <button type="button" className="btn btn-info">Info</button>
                            <button type="button" className="btn btn-light">Light</button>
                            <button type="button" className="btn btn-dark">Dark</button>
                            <button type="button" className="btn btn-link">Link</button>
                        </div>
                        <div className="mt-5 mb-5">
                            <button type="button" className="btn btn-outline-primary">Primary</button>
                            <button type="button" className="btn btn-outline-secondary">Secondary</button>
                            <button type="button" className="btn btn-outline-success">Success</button>
                            <button type="button" className="btn btn-outline-danger">Danger</button>
                            <button type="button" className="btn btn-outline-warning">Warning</button>
                            <button type="button" className="btn btn-outline-info">Info</button>
                            <button type="button" className="btn btn-outline-light">Light</button>
                            <button type="button" className="btn btn-outline-dark">Dark</button>
                        </div>
                        <div className="mt-3 mb-3">
                        <p className="fs-1">.fs-1 text</p>
                        <p className="fs-2">.fs-2 text</p>
                        <p className="fs-3">.fs-3 text</p>
                        <p className="fs-4">.fs-4 text</p>
                        <p className="fs-5">.fs-5 text</p>
                        <p className="fs-6">.fs-6 text</p>
                        </div>
                        <div className="mt-5 mb-3">
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-primary">Left</button>
                                <button type="button" className="btn btn-primary">Middle</button>
                                <button type="button" className="btn btn-primary">Right</button>
                            </div>
                        </div>
                        <div className="mt-3 mb-3">
                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" className="btn btn-danger">Left</button>
                                <button type="button" className="btn btn-warning">Middle</button>
                                <button type="button" className="btn btn-success">Right</button>
                            </div>
                        </div>
                        <div className="mt-3 mb-3">
                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <button type="button" className="btn btn-primary">1</button>
                            <button type="button" className="btn btn-primary">2</button>
                        
                            <div className="btn-group" role="group">
                            <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                            </ul>
                            </div>
                        </div>
                        <div className="row mt-5 mb-3">
                            <div className="col-3 p-4 border border-primary me-2 my-2"></div>
                            <div className="col-3 p-4 border border-secondary me-2 my-2"></div>
                            <div className="col-3 p-4 border border-success me-2 my-2"></div>
                            <div className="col-3 p-4 border border-danger me-2 my-2"></div>
                            <div className="col-3 p-4 border border-warning me-2 my-2"></div>
                            <div className="col-3 p-4 border border-info me-2 my-2"></div>
                            <div className="col-3 p-4 border border-light me-2 my-2"></div>
                            <div className="col-3 p-4 border border-dark me-2 my-2"></div>
                            <div className="col-3 p-4 border border-white me-2 my-2"></div>
                        </div>
                        <div className="row mt-3 mb-3 d-flex d-block">
                            <div className="col-3 p-4 border border-1 me-2 my-2"></div>
                            <div className="col-3 p-4 border border-2 me-2 my-2"></div>
                            <div className="col-3 p-4 border border-3 me-2 my-2"></div>
                            <div className="col-3 p-4 border border-4 me-2 my-2"></div>
                            <div className="col-3 p-4 border border-5 me-2 my-2"></div>
                        </div>
                        
                        <div className="mt-3 mb-3">
                            <table className="table table-bordered border-primary">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
            
                <div className="col-lg-4 col-md-6">
                    <div className="mt-3 mb-3">
                        <div className="alert alert-primary" role="alert">
                            A simple primary alert—check it out!
                        </div>
                        <div className="alert alert-secondary" role="alert">
                            A simple secondary alert—check it out!
                        </div>
                        <div className="alert alert-success" role="alert">
                            A simple success alert—check it out!
                        </div>
                        <div className="alert alert-danger" role="alert">
                            A simple danger alert—check it out!
                        </div>
                        <div className="alert alert-warning" role="alert">
                            A simple warning alert—check it out!
                        </div>
                        <div className="alert alert-info" role="alert">
                            A simple info alert—check it out!
                        </div>
                        <div className="alert alert-light" role="alert">
                            A simple light alert—check it out!
                        </div>
                        <div className="alert alert-dark" role="alert">
                            A simple dark alert—check it out!
                        </div>
                    </div>
                    <div className="mt-3 mb-3">
                        <h1 className="display-1">Display 1</h1>
                        <h1 className="display-2">Display 2</h1>
                        <h1 className="display-3">Display 3</h1>
                        <h1 className="display-4">Display 4</h1>
                        <h1 className="display-5">Display 5</h1>
                        <h1 className="display-6">Display 6</h1>
                    </div>
                    <div className="mt-3 mb-3">
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Accordion Item #1
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                        </div>
                        <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Accordion Item #2
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div className="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                        </div>
                        <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Accordion Item #3
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                            <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 mb-3">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Home</li>
                    </ol>
                    </nav>
                    
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Library</li>
                    </ol>
                    </nav>
                    
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Library</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                    </nav>
                </div>
                </div>
                
                <div className="col-lg-4 col-md-6">
                    <div className="mt-3 mb-3">
                        <span className="badge bg-primary">Primary</span>
                        <span className="badge bg-secondary">Secondary</span>
                        <span className="badge bg-success">Success</span>
                        <span className="badge bg-danger">Danger</span>
                        <span className="badge bg-warning text-dark">Warning</span>
                        <span className="badge bg-info text-dark">Info</span>
                        <span className="badge bg-light text-dark">Light</span>
                        <span className="badge bg-dark">Dark</span>
                    </div>
                    <div className="mt-3 mb-3">
                    <span className="badge rounded-pill bg-primary">Primary</span>
                    <span className="badge rounded-pill bg-secondary">Secondary</span>
                    <span className="badge rounded-pill bg-success">Success</span>
                    <span className="badge rounded-pill bg-danger">Danger</span>
                    <span className="badge rounded-pill bg-warning text-dark">Warning</span>
                    <span className="badge rounded-pill bg-info text-dark">Info</span>
                    <span className="badge rounded-pill bg-light text-dark">Light</span>
                    <span className="badge rounded-pill bg-dark">Dark</span>
                    </div>
                    
                    <div className="mt-3 mb-3">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Primary card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card text-white bg-secondary mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Secondary card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Success card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card text-white bg-danger mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Danger card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card text-dark bg-warning mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Warning card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card text-dark bg-info mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Info card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card text-dark bg-light mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Light card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Dark card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ThemeTest;