type Props = {
  when: boolean;
  children: React.ReactNode;
};

export default function Show({ when, children }: Props) {
  return when ? children : null;
}
