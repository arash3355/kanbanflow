export default function AuthLayout({

    title,

    subtitle,

    children,

    footer

}) {

    return (

        <div className="container min-vh-100 d-flex justify-content-center align-items-center">

            <div
                className="card shadow-lg border-0 p-4"
                style={{
                    maxWidth: "450px",
                    width: "100%",
                    borderRadius: "16px"
                }}
            >

                <div className="card-body">

                    <h2 className="fw-bold mb-2">

                        {title}

                    </h2>

                    <p className="text-secondary mb-4">

                        {subtitle}

                    </p>

                    {children}

                    {footer}

                </div>

            </div>

        </div>

    );

}