import { Link } from "wouter";

const LinkButton = () => {
  return (
    <Link className="link" href="/">
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M0 8C-1.93129e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 1.93129e-07 8 0C3.58172 -1.93129e-07 1.93129e-07 3.58172 0 8ZM8 12V9H13V7L8 7V4H7L3 8L7 12H8Z"
          fill="#fff"
          fillRule="evenodd"
        />
      </svg>
      links
    </Link>
  );
};

export default LinkButton;
