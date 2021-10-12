export default function TableEntry(props) {
  return (
    <td
      style={{
        color: "#fff",
        textAlign: "center",
        backgroundColor: "#000",
        width: "120px",
      }}
    >
      {props.val}
    </td>
  );
}
