// ============================================================
// Package
const express = require("express");
const app = express();
const port = 3000;
const db = require("./src/db");
const { QueryTypes } = require("sequelize");
const session = require("express-session");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const multer = require("multer");
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
}));
app.use((req, res, next) => {
    res.locals.isLogin = req.session.isLogin || false;
    res.locals.user = req.session.user || {}
    next();
});
// Set Up Internal Folder
// ============================================================
// Routing GET
app.get("/", renderIndex);
app.get("/profile/:blog_id", renderProfile);
app.get("/project", renderProject);
app.get("/testimonial", renderTestimonial);
app.get("/contact", renderContact);
app.get("/project-detail/:blog_id", renderProjectDetail);
app.get("/edit/:blog_id", renderEditProject);
app.get("/delete/:blog_id", deleteProject);
app.get("/login", renderLogin);
app.get("/register", renderRegister);
app.get("/change", renderChange);
app.get("/logout", logout);
app.get("/profile-edit/:blog_id", renderProfileEdit);
// Routing GET
// ============================================================
// Routing POST
app.post("/", upload.single("image"), addProject);
app.post("/edit/:blog_id", upload.single("image"), editProject);
app.post("/login", login);
app.post("/register", upload.single("image"), register);
app.post("/profile-edit/:blog_id", editProfile);
// Routing POST
// ============================================================
// Render Function
async function renderIndex(req, res) {
    try {
        const isLogin = req.session.isLogin;
        const userId = req.session.userId;
        if (!isLogin || !userId) {
            res.redirect("/login");
            return;
        }

        const user = `SELECT * FROM public."user" WHERE id = $1`;
        const project = `SELECT * FROM public.project WHERE user_id = $1`;

        const [userResult, projectResult] = await Promise.all([
            db.query(user, { type: QueryTypes.SELECT, bind: [userId] }),
            db.query(project, { type: QueryTypes.SELECT, bind: [userId] })
        ]);


        res.render("index", {
            data: projectResult,
            renderUser: userResult,
            isLogin: isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.error("Error in renderIndex:", error);
        res.status(500).send("Internal Server Error");
    }
};
async function renderProfile(req, res) {
    try {
        const isLogin = req.session.isLogin;
        const id = req.params.blog_id;
        const users = await db.query(`SELECT * FROM public.user WHERE id = ${id}`, {
            type: QueryTypes.SELECT
        });

        res.render("profile", {
            data: users[0],
            isLogin: isLogin,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
};
async function renderProject(req, res) {
    try {
        const isLogin = req.session.isLogin;
        const user = await db.query(`SELECT * FROM public.user`, {
            type: QueryTypes.SELECT
        });

        res.render("project", {
            isLogin: isLogin,
            renderUser: user,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
};
async function renderTestimonial(req, res) {
    try {
        const isLogin = req.session.isLogin;
        const user = await db.query(`SELECT * FROM public.user`, {
            type: QueryTypes.SELECT
        });

        res.render("testimonial", {
            isLogin: isLogin,
            renderUser: user,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
};
async function renderContact(req, res) {
    try {
        const isLogin = req.session.isLogin;
        const user = await db.query(`SELECT * FROM public.user`, {
            type: QueryTypes.SELECT
        });

        res.render("contact", {
            isLogin: isLogin,
            renderUser: user,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
    }
};
async function renderProjectDetail(req, res) {
    try {
        const isLogin = req.session.isLogin;
        const id = req.params.blog_id;
        const blogs = await db.query(`SELECT * FROM project WHERE id = ${id}`, {
            type: QueryTypes.SELECT
        });
        const user = await db.query(`SELECT * FROM public.user`, {
            type: QueryTypes.SELECT
        });

        res.render("project-detail", {
            data: blogs[0],
            renderUser: user,
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
        const user = await db.query(`SELECT * FROM public.user`, {
            type: QueryTypes.SELECT
        });

        res.render("project-edit", {
            data: blogs[0],
            renderUser: user,
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

        res.render("login", {
            isLogin: isLogin,
            user: req.session.user,
            messages: req.flash()
        });
    } catch (error) {
        console.log(error);
    }
};
async function renderRegister(req, res) {
    try {
        const isLogin = req.session.isLogin;
        res.render("register", {
            isLogin: isLogin,
            user: req.session.user,
            messages: req.flash()
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
};
async function renderProfileEdit(req, res) {
    try {
        const isLogin = req.session.isLogin;
        const id = req.params.blog_id;
        const blogs = await db.query(`SELECT * FROM public.user WHERE id = ${id}`, {
            type: QueryTypes.SELECT
        });
        const user = await db.query(`SELECT * FROM public.user`, {
            type: QueryTypes.SELECT
        })

        res.render("profile-edit", {
            data: blogs[0],
            renderUser: user,
            isLogin: isLogin,
            user: req.session.user
        })
    } catch (error) {
        console.log(error);

    }
};
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
    (title, start_date, end_date, description, is_swift, is_ruby, is_python, is_javascript, image, duration, created_at, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`

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
            new Date(),
            req.session.userId
        ];

        await db.query(newProject, {
            type: QueryTypes.INSERT,
            bind: values,
        });

        req.flash("projectSuccess", "Project added successfully!")
        res.redirect("/");
    } catch (error) {
        console.log(error);
        req.flash("success", "Project failed to add successfully!")
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
        const userId = req.session.userId
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
            duration: duration,
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
            userId,
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
            duration = $10,
            user_id = $11
            WHERE id = $12`;

        await db.query(updateProject, {
            bind: values
        });

        req.flash("projectSuccess", "Project edit successfully!")
        res.redirect("/")
    } catch (error) {
        console.log(error);
        req.flash("success", "Project failed to edit successfully!")
    };
};
async function deleteProject(req, res) {
    try {
        const id = req.params.blog_id;
        const deleteProject = `DELETE FROM project WHERE id = ${id}`

        await db.query(deleteProject);

        req.flash("projectSuccess", "Project deleted successfully!")
        res.redirect("/");
    } catch (error) {
        console.log(error);
        req.flash("success", "Project failed to delete successfully!")
    }
};
async function login(req, res) {
    try {
        const userLogin = `
        SELECT * FROM public."user" WHERE email = $1`;

        const user = await db.query(userLogin, {
            type: QueryTypes.SELECT,
            bind: [req.body.email]
        });

        if (user.length === 0) {
            req.flash("danger", "Email not found");
            return res.redirect("/login");
        }

        const users = user[0];

        const checkPassword = await bcrypt.compare(req.body.password, users.password)

        if(!checkPassword) {
            req.flash("danger", "Password is wrong!")
            return res.redirect("/login")
        }

        req.session.user = user[0];
        req.session.isLogin = true;
        req.session.userId = user[0].id;
        req.session.save((err) => {
            if (err) {
                console.log(err);
                req.flash("danger", "Login failed due to session error");
                return res.redirect("/login");
            }
            req.flash("success", "Success to login");
            return res.redirect("/");
        });
    } catch (error) {
        console.log(error);
        req.flash("danger", "Login Failed: Password is wrong!")
        res.redirect("/login");
    };
};
async function register(req, res) {
    try {
        const checkUserExists = `SELECT * FROM public."user" WHERE email = $1`;
        const userExists = await db.query(checkUserExists, {
            type: QueryTypes.SELECT,
            bind: [req.body.email]
        });

        if (userExists.length > 0) {
            req.flash("danger", "Email already registered");
            return res.redirect("/register")
        } else {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = await bcrypt.hash(req.body.password, salt);
            const image = req?.file?.filename || null;
            const userRegister = `
        INSERT INTO public."user" 
        (name, email, password, image)
            VALUES
        ($1, $2, $3, $4) RETURNING id`;

            const values = [
                req.body.name,
                req.body.email,
                passwordHash,
                image
            ];

            const result = await db.query(userRegister, {
                type: QueryTypes.INSERT,
                bind: values,
                returning: true
            });

            const newUser = result[0][0];

            req.session.user = { id: newUser.id, name: req.body.name, email: req.body.email };
            req.session.isLogin = true;
            req.session.save((err) => {
                if (err) {
                    req.flash("danger", "Registration failed, please try again");
                    return res.redirect("/register");
                }
                req.flash("success", "Success to register");
                res.redirect("/");
            });

        };
    } catch (error) {
        console.log(error);
        req.flash("danger", "Registration failed, please try again");
        res.redirect("/register");
    };
};
async function logout(req, res) {
    try {
        req.flash("success", "Successfully logged out");
        req.session.destroy(() => {
            res.redirect("/login");
        });
    } catch (error) {
        console.log(error);
        req.flash("danger", "Failed to Logout");
        res.redirect("/login");
    }
};
async function editProfile(req, res) {
    try {
        const id = req.params.blog_id;
        const editProfile = {
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            hoby: req.body.hoby,
            position: req.body.position
        };

        console.log(editProfile);


        const values = [
            editProfile.name,
            editProfile.age,
            editProfile.city,
            editProfile.hoby,
            editProfile.position,
            id
        ];

        const updateProfile = `
            UPDATE public.user
            SET name = $1,
            age = $2,
            city = $3,
            hoby = $4,
            position = $5
            WHERE id = $6;`

        console.log("data ter update", updateProfile);


        await db.query(updateProfile, {
            bind: values
        });
        req.flash("projectSuccess", "Profile edited successfully!")
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
};
// Post Function
// ============================================================
// Add Function
function deleteImage(url) {

};
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});