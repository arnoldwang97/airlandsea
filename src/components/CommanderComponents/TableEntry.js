export default function TableEntry(props) {
  return (
    <td
      style={{
        color: "#fff",
        textAlign: "center",
        width: 120,
      }}
    >
      {props.val}
    </td>
  );
}
