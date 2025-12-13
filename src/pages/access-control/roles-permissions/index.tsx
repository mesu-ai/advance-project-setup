import Status from '@/components/atoms/Status';
import Pagination from '@/components/molecules/Pagination';
import { useState } from 'react';
import DataTable from '@/components/organisms/DataTable';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import ActionButtons, { type ActionItemProps } from '@/components/molecules/ActionButtons';
import Modal from '@/components/organisms/Modal/Modal';

const RolePermissionPage = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [isOpen, setOpen] = useState<boolean>(false);

  console.log({ currPage });

  const handleView = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};

  const actionItems: ActionItemProps[] = [
    {
      label: 'View',
      onClick: handleView,
    },
    {
      label: 'Edit',
      onClick: handleEdit,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
    },
  ];

  return (
    <div>
      <h2 className="heading-2">All Employee List</h2>
      <div className="bg-surface mt-3 rounded-xl border border-border">
        <div className="flex justify-between px-5 py-4">
          <SearchBar />
          <Button variant="add" onClick={() => setOpen(true)}>
            Add New Employee
          </Button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable header={['SL No', 'Role Name', 'Status', 'Action']}>
          <tr>
            <td className="px-5 py-3">01</td>
            <td className="px-5 py-3">Tester</td>
            <td className="px-5 py-3">
              <Status status="active" />
            </td>
            <td className="px-5 py-3">
              <ActionButtons actions={actionItems} />
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3">01</td>
            <td className="px-5 py-3">Tester</td>
            <td className="px-5 py-3">
              <Status status="inactive" />
            </td>
            <td className="px-5 py-3">
              <ActionButtons actions={actionItems} />
            </td>
          </tr>
        </DataTable>
        <div className="text-center py-5">
          <Pagination totalPage={12} currentPage={5} setCurrentPage={setCurrPage} />
        </div>
      </div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur vero sint perferendis,
        dolores provident atque qui quasi et aut explicabo aperiam in animi facere odit aspernatur
        iusto consequatur nesciunt cumque officia est suscipit eos harum! Doloremque molestias culpa
        facilis perspiciatis eos iste minima corporis, cum beatae eius, quo saepe soluta voluptatum
        tempora ab magni iure at nemo fugiat vel. Possimus, impedit natus? Ut eligendi quibusdam
        dolores nihil earum corporis ipsum pariatur. Adipisci eveniet similique at maxime nemo
        nesciunt labore fugit magnam velit odit excepturi dignissimos odio, consequuntur praesentium
        iure numquam magni ipsam facilis? Iure libero facere, nesciunt pariatur, autem quasi
        voluptatum quas laboriosam sapiente quis provident, minima eius! Quae magnam praesentium
        voluptatem rem non magni minima tenetur libero corporis. Quam qui, mollitia optio pariatur
        veniam voluptatem fuga. Facere magnam eveniet quia ut. Facere odio voluptas exercitationem.
        Eos, veniam ullam? Neque quaerat earum aspernatur eaque fuga minima commodi nulla cumque
        eos, nemo iste possimus ab exercitationem voluptas quo laborum corrupti porro nobis a
        repellat doloremque! Nobis molestiae sed temporibus eius vitae, amet dicta reprehenderit
        dolorem totam quas et enim deleniti recusandae dolore culpa. Magni non pariatur autem,
        fugiat atque laboriosam eius aut ut delectus inventore distinctio, reiciendis nemo, qui odit
        labore veniam dicta fugit illo aperiam impedit vel? Magni aliquam sequi temporibus amet quis
        repellat sapiente debitis eum voluptatum impedit deserunt quam alias aut a, praesentium
        laudantium dolores laboriosam modi atque deleniti? Et, quis perferendis commodi dicta modi
        corrupti dolore soluta. Possimus necessitatibus beatae iure vero debitis, sit aliquid itaque
        nihil praesentium perferendis consequatur laudantium! Repellat placeat rerum quia maiores
        nulla quae quaerat labore dolore aperiam animi, aut sunt assumenda dolorum incidunt
        accusantium cum natus quas mollitia quam totam tempora voluptatibus. Voluptate numquam,
        velit unde beatae quasi qui quisquam dicta consectetur molestiae accusantium, reprehenderit
        blanditiis nisi eum ad similique corrupti quod. Earum nostrum provident maxime error quo
        delectus magni odio et optio veritatis, commodi, natus, asperiores fugiat quia? Officia quos
        sunt aperiam? Iste suscipit corporis labore voluptates quibusdam natus pariatur libero
        exercitationem dolorem nam soluta aliquid provident deserunt magnam accusantium laboriosam,
        rem asperiores reiciendis dolores doloribus possimus, accusamus recusandae eaque adipisci?
        Modi animi asperiores facere? Inventore quisquam similique vero officia labore? Ducimus
        dolor nam vitae dicta obcaecati ipsa, officiis sit eos libero illo quaerat quod voluptas
        accusamus cum consequuntur explicabo dolorem iure quo quae facilis corporis? Ad similique
        iure unde tempora saepe ullam minima, aliquam voluptatem delectus reprehenderit est
        aspernatur animi. Nisi eum impedit perspiciatis sapiente excepturi cum, harum minus illum
        adipisci necessitatibus in aliquid ut similique non quos tempore temporibus tenetur sit
        odio, nesciunt enim laboriosam maxime. Minus dolore non commodi magni, dolorem fugiat
        voluptatum earum iusto! Voluptatum harum cumque vel eum inventore ex nulla doloribus at
        impedit animi corrupti exercitationem sit nam nemo perferendis iusto dicta, ducimus nisi
        fugiat sunt nostrum dolore, molestias aliquid facere? Ad soluta nesciunt maiores mollitia
        pariatur error dolorum iure asperiores reiciendis ab quidem fugiat, saepe perferendis maxime
        recusandae molestiae. Vero minima adipisci, soluta illum odio quod beatae mollitia ab
        repellendus, quidem dicta eaque iure quaerat dolor quas consectetur nostrum vitae, cumque
        nemo at! Quo reprehenderit earum esse illo optio asperiores at voluptas delectus
        voluptatibus nulla necessitatibus, a hic sapiente repellat expedita laborum quas eos sit vel
        iste nesciunt explicabo nemo. Nisi totam voluptates exercitationem necessitatibus et,
        eligendi vitae deleniti! Fuga earum hic autem velit dicta. Magni aliquam veniam illum
        officia tempore maiores iste quidem, dicta accusantium quis accusamus qui nisi ullam iusto
        pariatur mollitia sunt omnis facere labore repellat. Natus, ullam quisquam alias aspernatur
        delectus fugiat rem. Quos temporibus expedita hic sunt soluta neque facilis veritatis
        aspernatur sequi natus id itaque consequuntur et autem blanditiis ex cupiditate ab sint
        dolorum, enim cumque incidunt perferendis nostrum? Odit tempore porro, provident qui aut
        quas. Aut doloremque similique quam. Qui commodi nesciunt porro explicabo vero, impedit
        sequi quo perferendis dignissimos quae laborum eaque dolorum asperiores nihil accusamus?
        Minus magni officia facilis incidunt possimus inventore odit cupiditate ducimus magnam quae
        consequuntur animi praesentium similique ex id ea consequatur culpa aut, soluta sapiente?
        Consectetur labore inventore laboriosam eveniet autem dicta consequatur voluptas? Fuga
        temporibus doloremque excepturi ipsum illum labore? Ratione tenetur cupiditate, deleniti
        reprehenderit magni consequuntur fuga nulla tempore, officia impedit dignissimos suscipit
        autem quasi. Odit veritatis aut inventore iusto magni numquam rem eveniet, id laudantium
        obcaecati ducimus itaque, voluptatum molestias delectus consequuntur incidunt voluptatem
        necessitatibus nisi blanditiis! Consequatur error cupiditate, dicta sapiente, et odio non
        nobis nesciunt blanditiis quibusdam esse, nostrum sint accusantium iusto! Modi, pariatur?
        Commodi ullam assumenda, soluta qui et in quidem vitae voluptates ipsa? Iste maiores,
        quibusdam recusandae, aperiam ex voluptatibus rerum optio veniam ipsum laboriosam
        perspiciatis deserunt aut voluptatum. Iste maxime fugiat veritatis? Deserunt sint
        consectetur voluptate nemo quos quas exercitationem explicabo accusamus fugiat consequatur
        soluta animi perferendis recusandae nostrum eum excepturi minima iure tenetur, nisi
        temporibus quia dolores commodi! Pariatur vero recusandae corrupti natus ipsum quod sed
        doloribus saepe! Inventore voluptates totam dolore optio animi provident eveniet eaque
        voluptatem laborum saepe, facere asperiores est et libero sunt, eum ex placeat nisi maxime,
        praesentium expedita ipsum eligendi? Temporibus aspernatur debitis labore, repellat nihil
        ipsa explicabo fuga facilis. Modi illum eos voluptatem nostrum neque at tempore adipisci
        quaerat ut a ad praesentium fuga aut quasi maxime cum, harum vitae! Deleniti minus
        cupiditate velit! Voluptate architecto, repellat omnis minus sunt ullam atque veniam porro
        aspernatur nemo sed obcaecati eaque vel debitis? Officia labore aperiam laudantium quisquam
        possimus ullam amet in quasi neque. Quam maiores, autem at odit, corrupti dolorum vel,
        inventore eaque aspernatur eligendi fuga aperiam blanditiis vitae veritatis officiis non?
        Dicta laborum nesciunt, porro eum natus facilis! Repudiandae doloribus magni harum error
        quae, eius reprehenderit blanditiis dolore quisquam pariatur laboriosam, fuga deserunt,
        repellendus maiores! Illo cum impedit deserunt officia quidem consectetur optio ducimus
        veritatis voluptatibus excepturi iusto reiciendis, beatae, eligendi assumenda voluptatum.
        Natus mollitia in aspernatur molestias, cumque libero sit atque dignissimos minima, nisi
        sequi numquam, dolores veniam! Pariatur nobis id quaerat repudiandae non minus in nemo dolor
        aliquid velit hic est numquam error illo, accusantium nostrum facere architecto iure laborum
        magnam fugiat voluptatem nisi.
      </div>
      {isOpen && (
        <Modal title="Add New Employee" isOpen={isOpen} onClose={setOpen}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quos rerum veniam
            at reprehenderit accusamus! Velit sint beatae mollitia inventore deserunt cum voluptatum
            rerum numquam. Dolore distinctio sunt quaerat saepe eveniet quod, tenetur pariatur
            voluptate corrupti consequuntur iure animi non fuga consectetur perferendis ut
            voluptates temporibus similique eius nemo ipsam? Perferendis sint fugiat accusantium
            modi debitis quae consectetur esse repudiandae. Voluptas harum necessitatibus natus aut,
            cum recusandae nobis optio quam esse quas impedit dolorem deserunt fugit voluptatem
            dolores totam voluptate ratione error dolore provident veritatis eius animi eos
            similique. Nam dicta minus quaerat pariatur est dignissimos numquam molestias cumque
            explicabo minima id alias sunt blanditiis fugit libero aperiam, magni dolorum fuga
            sapiente facilis veniam reprehenderit aliquam ipsum. Reiciendis eveniet numquam ab vero
            a aliquam delectus natus non veniam blanditiis laboriosam omnis at ex quia tempore
            distinctio, sint similique quod voluptatibus rem doloribus officiis cumque neque!
            Aliquid doloribus natus qui debitis animi quaerat iste! Vitae ducimus alias impedit cum
            tempore. Et tempore tempora rem dicta rerum, sapiente ut autem consequuntur itaque enim
            odit iusto! Labore officia at unde. Itaque voluptatum fuga impedit vitae porro at
            perferendis. Iure ipsa tempore quod est totam deserunt architecto vero, quam ex
            molestiae. A asperiores, est earum beatae molestiae voluptatem accusantium.
            Voluptatibus, ad autem. Cupiditate, dolores. Eum velit sint, dignissimos laudantium
            nihil quos sapiente, obcaecati recusandae molestias dicta adipisci ipsam voluptate
            ducimus cum magni aspernatur impedit, accusamus voluptates reprehenderit atque beatae
            alias numquam. Pariatur perferendis omnis qui autem unde cum culpa dignissimos
            distinctio itaque aperiam? Eum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero officiis
            accusantium qui laborum quaerat iste dolor incidunt saepe id? Expedita maiores
            temporibus facere ipsum quidem tenetur veritatis, voluptatum, molestias iusto nihil odit
            harum dolor enim facilis minima quasi. Maxime explicabo consectetur unde molestiae
            corrupti quae quia hic excepturi cum accusantium ullam consequatur voluptatibus
            reiciendis accusamus, error illum corporis voluptate. Officia ullam dicta provident
            atque quas, praesentium ab maxime amet optio harum consequatur quae debitis error dolore
            adipisci, neque quasi perspiciatis accusantium dignissimos beatae, suscipit cum! Rem
            labore error ad sequi eius non provident tempore ullam numquam asperiores voluptatibus
            eveniet enim molestias id, dolor porro placeat eligendi sapiente architecto cum nam.
            Eligendi, non repellendus consectetur corporis amet suscipit, deleniti assumenda itaque
            ipsa adipisci quod modi provident fugit soluta placeat temporibus. Impedit qui nihil
            explicabo vitae quae commodi assumenda temporibus itaque distinctio, praesentium aliquid
            inventore aperiam tempora corporis corrupti sit quaerat placeat. Suscipit soluta
            perferendis cumque sapiente quae asperiores quas, nesciunt voluptatibus at debitis,
            minus, harum minima nostrum laudantium! Voluptatem possimus ducimus dicta deleniti
            aperiam aliquid aut, reiciendis ipsam recusandae id cum praesentium veniam veritatis
            officia reprehenderit molestiae quasi! Natus minus laudantium, fugit fuga deserunt quo
            velit delectus tempore quaerat architecto, doloribus error cupiditate odio corporis
            voluptate est! Doloremque facilis aspernatur laboriosam libero quia? Odit vel quam
            aliquam nisi blanditiis, ut tempore mollitia dolor. Officia cum labore id qui similique
            voluptatem molestiae alias quibusdam architecto? Hic ipsum, facilis deleniti nisi
            aliquid blanditiis ea ratione nam tempora magnam officiis repellat atque. Delectus.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default RolePermissionPage;
