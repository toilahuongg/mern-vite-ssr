import Button from '@src/components/Layout/Button';
import Container from '@src/components/Layout/Container';
import Heading from '@src/components/Layout/Heading';
import TextField from '@src/components/Layout/TextField';
import ListProject from '@src/components/Project/List';
import Skills from '@src/components/Skills';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <Container>
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-5">
            <h1 className="text-3_5xl font-semibold text-white leading-normal mt-20">
              Devhugon is a <span className="text-primary">Backend developer</span> and
              <span className="text-primary"> Front-end developer</span>
            </h1>
            <p className="text-gray my-8">He crafts responsive websites where technologies meet creativity</p>
            <Button>Contact me!!</Button>
          </div>
          <div className="col-span-5 flex justify-end">
            <div className="px-2">
              <img className="mx-auto" src="/assets/images/Image-1.png" />
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-12 items-center mb-12">
          <div className="col-span-9">
            <Heading title="projects" />
          </div>
          <div className="col-span-3">
            <div className="flex justify-end text-white hover:text-primary font-medium">
              <Link to="/projects">{'View all ~~>'} </Link>
            </div>
          </div>
        </div>
        <ListProject
          items={[
            {
              _id: '1',
              desc: 'Minecraft servers hosting ',
              name: 'ChertNodes',
              slug: 'chert-nodes',
              technicals: ['HTML', 'CSS', 'Python', 'Flask'],
              thumbnail: '/assets/images/project-1.jpg',
            },
            {
              _id: '1',
              desc: 'Minecraft servers hosting ',
              name: 'ChertNodes',
              slug: 'chert-nodes',
              technicals: ['HTML', 'CSS', 'Python', 'Flask'],
              thumbnail: '/assets/images/project-1.jpg',
            },
            {
              _id: '1',
              desc: 'Minecraft servers hosting ',
              name: 'ChertNodes',
              slug: 'chert-nodes',
              technicals: ['HTML', 'CSS', 'Python', 'Flask'],
              thumbnail: '/assets/images/project-1.jpg',
            },
          ]}
        />
      </Container>
      <Container>
        <div className="grid grid-cols-12 mb-12 gap-12">
          <div className="col-span-4">
            <Heading title="skills" />
          </div>
          <div className="col-span-8">
            <div className="mt-24">
              <Skills />
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-12 mb-12 gap-12">
          <div className="col-span-7">
            <Heading title="about-me" />
            <div className="mt-8 leading-relaxed text-gray">
              Hello, i’m Elias! I’m a self-taught front-end developer based in Kyiv, Ukraine. I can develop responsive
              websites from scratch and raise them into modern user-friendly web experiences. Transforming my creativity
              and knowledge into a websites has been my passion for over a year. I have been helping various clients to
              establish their presence online. I always strive to learn about the newest technologies and frameworks.
            </div>
            <div className="mt-8">
              <Button>{'Read more ->'}</Button>
            </div>
          </div>
          <div className="col-span-5 flex justify-center">
            <img src="/assets/images/Image.png" />
          </div>
        </div>
      </Container>
      <Container>
        <div className="max-w-2xl mx-auto mb-14">
          <Heading title="contacts" variant="center" />
        </div>
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField as="input" label="Name" />
            <TextField as="input" label="Email" />
          </div>
          <TextField as="input" label="Title" />
          <TextField as="textarea" label="Message" rows={4} />
          <div>
            <Button>Send</Button>
          </div>
        </div>
        <div className="h-4" />
      </Container>
    </>
  );
};

export default HomePage;
