// ============================================================
// Package
const express = require("express");
const app = express();
const port = 3000;
const blog = [];
const db = require("./src/db");
const { QueryTypes } = require("sequelize");
const session = require("express-session");
const flash = require("express-flash");
const multer = require("multer")
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploadImage/");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname);
        },
    }),
});
// Package
// ============================================================
// Set Up File
app.set("view engine", "hbs");
app.set("views", "views");
app.set("trust proxy", 1);
// Set Up File
// ============================================================
// Set Up Internal Folder
app.use("/data", express.static("data"));
app.use("/uploadImage", express.static("uploadImage"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: "alexa",
    cookie: { maxAge: 3600000, secure: false, httpOnly: true },
    saveUninitialized: true,
    resave: false,
    store: new session.MemoryStore()
}))
// Set Up Internal Folder
// ============================================================
// Routing GET
app.get("/", renderIndex);
app.get("/profile", renderProfile);
app.get("/project", renderProject);
app.get("/testimonial", renderTestimonial);
app.get("/contact", renderContact);
app.get("/project-detail/:blog_id", renderProjectDetail)
app.get("/edit/:blog_id", renderEditProject);
app.get("/delete/:blog_id", deleteProject);
app.get("/login", renderLogin);
app.get("/register", renderRegister);
app.get("/change", renderChange)
app.get("/logout", logout)
app.get("/profile-edit/:blog_id", renderProfileEdit)
// Routing GET
// ============================================================
// Routing POST
app.post("/", upload.single("image"), addProject);
app.post("/edit/:blog_id", upload.single("image"), editProject);
app.post("/login", login);
app.post("/register", upload.single("image"), register);
app.post("/profile-edit/:blog_id", editProfile)
// Routing POST
// ============================================================
// Render Function
async function renderIndex(req, res) {
    const isLogin = req.session.isLogin;
    const user = `SELECT * FROM public."user"`
    const project = `SELECT * FROM public.project`
    const [userResult, projectResult] = await Promise.all([
        db.query(user, { type: QueryTypes.SELECT }),
        db.query(project, { type: QueryTypes.SELECT })
    ]);

    res.render("index", {
        data: projectResult,
        renderUser: userResult,
        isLogin: isLogin,
        user: req.session.user
    });
};
async function renderProfile(req, res) {
    const isLogin = req.session.isLogin;
    const user = `SELECT * FROM public."user"`

    await db.query(user, {
        type: QueryTypes.SELECT
    })

    res.render("profile", {
        isLogin: isLogin,
        user: req.session.user
    });
};
function renderProject(req, res) {
    const isLogin = req.session.isLogin;

    res.render("project", {
        isLogin: isLogin,
        user: req.session.user
    });
};
function renderTestimonial(req, res) {
    const isLogin = req.session.isLogin;

    res.render("testimonial", {
        isLogin: isLogin,
        user: req.session.user
    });
};
function renderContact(req, res) {
    const isLogin = req.session.isLogin;

    res.render("contact", {
        isLogin: isLogin,
        user: req.session.user
    });
};
async function renderProjectDetail(req, res) {
    try {
        const isLogin = req.session.isLogin;
        const id = req.params.blog_id;
        const blogs = await db.query(`SELECT * FROM project WHERE id = ${id}`, {
            type: QueryTypes.SELECT
        });

        res.render("project-detail", {
            data: blogs[0],
            isLogin: isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
};
async function renderEditProject(req, res) {
    try {
        const isLogin = req.session.isLogin
        const id = req.params.blog_id;
        const blogs = await db.query(`SELECT * FROM project WHERE id = ${id}`, {
            type: QueryTypes.SELECT
        });

        res.render("project-edit", {
            data: blogs[0],
            isLogin: isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
};
function renderLogin(req, res) {
    try {
        const isLogin = res.session?.isLogin;

        if (isLogin) {
            req.flash("error", "You must login first");
            req.redirect("/login")
        }
        res.render("login", {
            isLogin: isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
};
async function renderRegister(req, res) {
    try {
        const isLogin = req.session.isLogin;
        if (isLogin) {
            req.flash("error", "You must login first");
            res.redirect("/register");
            return;
        }
        res.render("register", {
            isLogin: isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    };
};
function renderChange(req, res) {
    const isLogin = req.session.isLogin;

    res.render("changePW", {
        isLogin: isLogin,
        user: req.session.user
    })
}
async function renderProfileEdit(req, res) {
    try {
        const isLogin = req.session.isLogin;
        const id = req.params.blog_id;
        const blogs = await db.query(`SELECT * FROM public.user WHERE id = ${id}`, {
            type: QueryTypes.SELECT
        });

        res.render("profile-edit", {
            data: blogs[0],
            isLogin: isLogin,
            user: req.session.user
        })
    } catch (error) {
        console.log(error);

    }
}
// Render Function
// ============================================================
// Post Function
async function addProject(req, res) {
    try {
        let miliSecond = 1000;
        let secondInHour = 3600;
        let hourInDay = 24;
        let dayInHour = 30;
        let monthInYear = 12;

        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const durationDate = Math.abs(endDate - startDate);
        const durationYear = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour * monthInYear));
        const durationMonth = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour)) % monthInYear;
        const durationDay = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay)) % dayInHour;

        let duration = '';

        if (durationYear > 1) {
            duration += `${durationYear} Years `;
        } else if (durationYear === 1) {
            duration += `${durationYear} Year `;
        }

        if (durationMonth > 1) {
            duration += `${durationMonth} Months `;
        } else if (durationMonth === 1) {
            duration += `${durationMonth} Month `;
        }

        if (durationDay > 1) {
            duration += `${durationDay} Days`;
        } else if (durationDay === 1) {
            duration += `${durationDay} Day`;
        }

        const checkSwift = '<i class="fa-brands fa-swift p-2 g-col-6"></i>';
        const checkRuby = '<i class="fa-solid fa-gem p-2 g-col-6"></i>';
        const checkPhyton = '<i class="fa-brands fa-python p-2 g-col-6"></i>';
        const checkJavascript = '<i class="fa-brands fa-js p-2 g-col-6"></i>';
        const newProject = `
    INSERT INTO public.project
    (title, start_date, end_date, description, is_swift, is_ruby, is_python, is_javascript, image, duration, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`

        const values = [
            req.body.project,
            req.body.startDate,
            req.body.endDate,
            req.body.description,
            req.body.swift ? checkSwift : null,
            req.body.ruby ? checkRuby : null,
            req.body.python ? checkPhyton : null,
            req.body.javascript ? checkJavascript : null,
            req?.file?.filename,
            duration,
            new Date()
        ];

        await db.query(newProject, {
            type: QueryTypes.INSERT,
            bind: values,
        });
        res.redirect("/");
    } catch (error) {
        console.log(error);
    };
};
async function editProject(req, res) {
    try {
        let miliSecond = 1000;
        let secondInHour = 3600;
        let hourInDay = 24;
        let dayInHour = 30;
        let monthInYear = 12;

        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const durationDate = Math.abs(endDate - startDate);
        const durationYear = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour * monthInYear));
        const durationMonth = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour)) % monthInYear;
        const durationDay = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay)) % dayInHour;

        let duration = '';

        if (durationYear > 1) {
            duration += `${durationYear} Years `;
        } else if (durationYear === 1) {
            duration += `${durationYear} Year `;
        }

        if (durationMonth > 1) {
            duration += `${durationMonth} Months `;
        } else if (durationMonth === 1) {
            duration += `${durationMonth} Month `;
        }

        if (durationDay > 1) {
            duration += `${durationDay} Days`;
        } else if (durationDay === 1) {
            duration += `${durationDay} Day`;
        }

        const checkSwift = '<i class="fa-brands fa-swift p-2 g-col-6"></i>';
        const checkRuby = '<i class="fa-solid fa-gem p-2 g-col-6"></i>';
        const checkPhyton = '<i class="fa-brands fa-python p-2 g-col-6"></i>';
        const checkJavascript = '<i class="fa-brands fa-js p-2 g-col-6"></i>';

        const id = req.params.blog_id;
        const newProject = {
            project: req.body.project,
            start: req.body.startDate,
            end: req.body.endDate,
            description: req.body.description,
            swift: req.body.swift ? checkSwift : null,
            ruby: req.body.ruby ? checkRuby : null,
            python: req.body.python ? checkPhyton : null,
            javascript: req.body.javascript ? checkJavascript : null,
            image: req.file ? req.file.filename : null,
            duration: duration
        };

        const values = [
            newProject.project,
            newProject.start,
            newProject.end,
            newProject.description,
            newProject.swift,
            newProject.ruby,
            newProject.python,
            newProject.javascript,
            newProject.image,
            newProject.duration,
            id
        ];

        const updateProject = `
            UPDATE project SET 
            title = $1,
            start_date = $2,
            end_date = $3,
            description = $4,
            is_swift = $5,
            is_ruby = $6,
            is_python = $7,
            is_javascript = $8,
            image = $9,
            duration = $10
            WHERE id = $11`;

        await db.query(updateProject, {
            bind: values
        });
        res.redirect("/")
    } catch (error) {
        console.log(error);
    };
};
async function deleteProject(req, res) {
    try {
        const id = req.params.blog_id;
        const deleteProject = `DELETE FROM project WHERE id = ${id}`

        await db.query(deleteProject)
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};
async function login(req, res) {
    try {
        const userLogin = `
        SELECT * FROM public."user" WHERE
        email = '${req.body.email}'
            AND
        password = '${req.body.password}'`
        const user = await db.query(userLogin, {
            type: QueryTypes.SELECT
        });
        console.log(user);

        if (user.length == 0) {
            req.flash("error", "Failed to login");
            res.redirect("/login");
            return;
        };

        req.session.user = user[0];
        req.session.isLogin = true;

        req.flash("success", "Success to login");
        res.redirect("/");
    } catch (error) {
        console.log(error);

        res.redirect("/login");
    };
};
async function register(req, res) {
    try {
        console.log(req.body, req.file);

        const userRegister = `
        INSERT INTO public."user" 
        (name, email, password, image)
            VALUES
        ('${req.body.name}', '${req.body.email}', '${req.body.password}', '${req?.file?.filename}')`

        await db.query(userRegister, {
            type: QueryTypes.INSERT
        });

        req.flash("success", "Success to register");
        res.redirect("/login")
    } catch (error) {
        console.log(error);

        res.redirect("/register")
    };
};
async function logout(req, res) {
    req.session.destroy();
    res.redirect("/login")
};
async function editProfile(req, res) {
    try {
        const id = req.params.blog_id;
        const editProfile = {
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            hoby: req.body.hoby
        };
        console.log(editProfile);
        

        const values = [
            editProfile.name,
            editProfile.age,
            editProfile.city,
            editProfile.hoby,
            id
        ];
        const updateProfile = `
            UPDATE public.user
            SET name = $1,
            age = $2,
            city = $3,
            hoby = $4
            WHERE id = $5;`

        await db.query(updateProfile, {
            type: QueryTypes.UPDATE,
            bind: values
        });
        res.redirect("/profile")
    } catch (error) {
        console.log(error);
    }
}
// Post Function
// ============================================================
// Add Function
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});