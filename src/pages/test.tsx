import Layout from "~/layouts/Layout";

const Test = () => {
  return (
    <Layout>
      <div className="h-screen w-full">
        <h1 className="font-heading text-3xl">Heading</h1>
        <p className="text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pretium
          augue et fermentum sollicitudin. Mauris at nisi ut enim volutpat
          venenatis nec quis dui. Cras viverra aliquam est. Fusce nec ornare
          orci. Etiam faucibus odio quis orci lacinia eleifend facilisis id
          urna. Cras vitae suscipit nisl, quis ornare lacus. Sed consequat
          consequat facilisis. Donec ut risus est. Nullam gravida metus eget dui
          aliquet malesuada. Cras nec libero ante.
        </p>
      </div>
    </Layout>
  );
};
export default Test;
