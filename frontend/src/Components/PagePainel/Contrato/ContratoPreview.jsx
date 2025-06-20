/* Dependencias */

/* Imports */

/* Icons */

/* Funções arquivo */

export default function ContratoPreview({ contrato }) {

  return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="select-none flex flex-col justify-center items-center w-full h-full">
            <div className="
            w-full max-w-200 h-full max-h-140 
            flex flex-col items-between
            bg-white
            border-1 border-[#c9c9c9] rounded-xl
            ">
                <div className="
                w-full h-15 
                flex justify-center items-center
                bg-gray-100 
                border-b-1 border-[#c9c9c9] rounded-tr-xl rounded-tl-xl">
                    <p className="text-xl font-semibold">CONTRATO DE PRESTAÇÃO DE SERVIÇO</p>
                </div>
                <div className="h-full overflow-y-auto px-5 py-5 space-y-2">
                    <div className="flex">
                        <p className="font-semibold text-lg">FICHA CADASTRAL</p>
                    </div>

                    <div className="space-y-2">
                        {contrato.Alunos.map((aluno, index) => (
                        <div key={index} className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">ALUNO:</p>
                                <p className="absolute bottom-0.5 left-20 italic font-light text-lg text-[rgb(0,55,85)]">{aluno.nome}</p>
                                <p>________________________________</p>
                            </div>
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">DATA NASC:</p>
                                <p className="absolute bottom-0.5 left-26 italic font-light text-lg text-[rgb(0,55,85)]">{aluno.nascimento}</p>
                                <p>_______________</p>
                            </div>
                        </div>
                        ))}

                        <div className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">ENDEREÇO:</p>
                                <p className="absolute bottom-0.5 left-25 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.contratado[0].endereco}</p>
                                <p>________________________________</p>
                            </div>
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">Nº:</p>
                                <p className="absolute bottom-0.5 left-15 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.contratado[0].numeroCasa}</p>
                                <p>_______________</p>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">BAIRRO:</p>
                                <p className="absolute bottom-0.5 left-18 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.contratado[0].bairro}</p>
                                <p>________________________________</p>
                            </div>
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">CEP:</p>
                                <p className="absolute bottom-0.5 left-12 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.contratado[0].cep}</p>
                                <p>_______________</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 mt-6">
                        <div className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">RESPONSÁVEL:</p>
                                <p className="absolute bottom-0.5 left-32 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.contratado[0].nome}</p>
                                <p>________________________________</p>
                            </div>
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">TELEFONE:</p>
                                <p className="absolute bottom-0.5 left-23 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.contratado[0].telefone}</p>
                                <p>________________________________</p>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">CPF:</p>
                                <p className="absolute bottom-0.5 left-12 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.contratado[0].cpf}</p>
                                <p>________________________________</p>
                            </div>
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">RG:</p>
                                <p className="absolute bottom-0.5 left-10 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.contratado[0].rg}</p>
                                <p>________________________________</p>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-2 mt-6">
                        <div className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">ESCOLA:</p>
                                <p className="absolute bottom-0.5 left-20 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.Alunos[0].nomeEscola}</p>
                                <p>________________________________</p>
                            </div>
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">SÉRIE:</p>
                                <p className="absolute bottom-0.5 left-14 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.Alunos[0].serie}</p>
                                <p>________________________________</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                {contrato.tipoTrajeto === 0 && (
                                    <p>( X )</p>
                                )}
                                {contrato.tipoTrajeto === 1 && (
                                    <p>(  )</p>
                                )}
                                <p className="font-semibold">TRAJETO (IDA OU VOLTA)</p>
                            </div>
                            <div className="flex space-x-1 relative">
                                {contrato.tipoTrajeto === 0 && (
                                    <p>(  )</p>
                                )}
                                {contrato.tipoTrajeto === 1 && (
                                    <p>( X )</p>
                                )}
                                <p className="font-semibold">TRAJETO DE IDA E VOLTA</p>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-2 mt-6">

                        <div className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">FORMA DE PAGAMENTO:</p>
                                <p className="absolute bottom-0.5 left-50 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.formaPagamento}</p>
                                <p>________________________________</p>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">VALOR TOTAL DO CONTRATO:</p>
                                <p className="absolute bottom-0.5 left-65 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.valorTotal}</p>
                                <p>R$________________________________</p>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-2 mt-6">

                        <div className="flex space-x-3">
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">Nº PARCELAS:</p>
                                <p className="absolute bottom-0.5 left-32 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.numeroParcelas}</p>
                                <p>_______</p>
                            </div>
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">VALOR:</p>
                                <p className="absolute bottom-0.5 left-22 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.valorParcela}</p>
                                <p>R$______________</p>
                            </div>
                            <div className="flex space-x-1 relative">
                                <p className="font-semibold">DATA PGTO:</p>
                                <p className="absolute bottom-0.5 left-25 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.dataPagamento}</p>
                                <p>__________________</p>
                            </div>
                        </div>

                    </div>

                    <div className="flex mt-6">
                        <p className="font-semibold text-lg">CONTRATO PARTICULAR DE PRESTAÇÃO DE SERVIÇO</p>
                    </div>
                    <p>Pelo presente instrumento particular, CONTRATANTE e CONTRATADO, tem entre si justo e combinado na melhor forma de direito o contrato particular de prestação de serviços para transporte escolar, que se regerá nas seguintes cláusulas:</p>
                    <p><span className="font-semibold">CLAUSULA PRIMEIRA</span> – DO OBJETO: O CONTRATADO compromete-se a transportar o ALUNO da sua residência (ou local indicado pelo responsável legal) até a escola (ou vice-versa) em seu período normal de aula pelo tempo acordado e valores celebrados entre partes conforme FICHA DE CADASTRO (anexo) que faz parte integrante deste contrato.</p>
                    <p><span className="font-semibold">CLAUSULA SEGUNDA</span> -  DO PRAZO E VALOR DO CONTRATO: O valor estipulado pelos serviços será aquele previamente acordado na FICHA DE CADASTRO (anexo).</p>
                    <p>Parágrafo primeiro: O presente contrato tem seu início na assinatura da FICHA DE CADASTRO e termino conforme respectivo número de parcelas celebradas.</p>
                    <p>Parágrafo segundo: Quando o valor total do contrato for fracionado e pago mensalmente cada parcela não quitada até a data convencionada será acrescida de multa de 2% (dois por cento) além de juros de 1% (um por cento) ao mês para pagamento em atraso.</p>
                    <p>Paragrafo terceiro: Em caso de inadimplemento superior a 10(dez) dias da data do vencimento, o transporte será suspenso e o contrato enviado para cobrança através do departamento jurídico, com aplicação das cláusulas Quinta e Sétima deste acordo;</p>
                    <p>Paragrafo quarto: O CONTRATADO não se responsabiliza pelo pagamento efetuado a pessoas não autorizadas;</p>
                    <p>Paragrafo quinto: O valor do contrato poderá ser corrigido a qualquer tempo pelo CONTRATADO em casos necessários, como: aumento do combustível, aplicação de novos tributos pela gestão pública, entre outros, devendo sempre o CONTRATADO comunicar ao CONTRATANTE o referido reajuste mediant4e aviso prévio não inferior a 30(trinta) dias do vencimento da próxima prestação.</p>
                    <p><span className="font-semibold">CLAUSULA TERCEIRA</span> - DAS OBRIGAÇÕES DO CONTRATANTE E DO ALUNO:  CONTRATANTE e ALUNO </p>
                    <p>a.	Partes, bem como não ocorra qualquer prejudicialidade aos demais alunos;</p>
                    <p>b.	Em hipótese alguma, poderá o transportador esperar pelo ALUNO ou alterar o local acordado sem aviso prévio;</p>
                    <p>c.	O CONTRATADO não se responsabilizara pelo ALUNO dispensada da aula fora do horário previamente acordado;</p>
                    <p>d.	O ALUNO devera obrigatoriamente acatar as ordens do motorista/auxiliar sempre que solicitado;</p>
                    <p>e.	Será comunicado ao responsável legal os casos de indisciplina do ALUNO, ficando a critério do CONTRATADO a manutenção do contrato caso este verifique que o ALUNO está causando alguma prejudicialidade aos demais transportados, ao veículo ou quaisquer membros da equipe do CONTRATADO;</p>
                    <p>f.	O CONTRATANTE será responsável pelos reparos necessários ao veículo sempre que o ALUNO der causa a avaria, sendo cobrado o referido valor no mês subsequente a constatação do dano.</p>
                    <p><span className="font-semibold">CLAUSULA QUARTA</span> -  DAS OBRIGAÇÕES DO CONTRATADO: O CONTRATADO devera cumpri as seguintes disposições:</p>
                    <p>O CONTRATADO compromete-se a oferecer veículo em bom estado e condições de uso, garantindo assim a deverão cumprir as seguintes disposições:</p>
                    <p>a.	O ALUNO deverá estar pronto no local e hora cordados para que não haja atraso no horário estabelecido entre chegada do aluno na escola; e na residência bem como tratar com zelo e respeito o ALUNO E CONTRATANTE;</p>
                    <p>b.	O CONTRATADO não se obriga a transitar, por vias que não ofereçam condições normais de tráfego assim como: pavimentação perigosa, manobras inversas, ou ainda itinerários que possam causar danos ao veículo ou ponham em risco a integridade física dos ALUNOS, auxiliares, pedestres ou que comprometam os horários estabelecidos entre partes;</p>
                    <p>c.	Em casos não previstos que possam se assemelhar o item ¨b¨ (obras do poder público, fechamento temporário de vias, deslizamentos de terra motivados por chuvas, etc.), o ALUNO devera obrigatoriamente aguardar o transporte em local apropriado e seguro mais próximo de sua residência;</p>
                    <p>d.	Em caso de alterações de endereços ou do local, o CONTRATADO avaliara a viabilidade de continuidade do contrato, podendo estabelecer novo valor ou efetuar a rescisão do mesmo sem incorrer em qualquer penalidade, não podendo o CONTRATANTE reclamar judicial ou extrajudicialmente tal condição, devendo inclusive quitar a fração do mês em que o serviço foi prestado no endereço anterior;</p>
                    <p>e.	Em caso de pane elétrica, mecânica ou afins, o CONTRATADO poderá substituir sempre que possível, não sendo devido qualquer valor ou abatimento ao CONTRATANTE pelo CONTRATADO;</p>
                    <p>f.	Não será</p>
                    <p>g.	 Permitido embarque ou desembarque de ALUNOS ao longo do itinerário, salvo nos locais previamente celebrados em cada FICHA DE CADASTRO.</p>
                    <p><span className="font-semibold">CLAUSULA QUINTA</span> – DA EXECUTIVIDADE DESTE INSTRUMENTO: Fica desde já estipulado que o presente instrumento tem força normativa de título executivo extrajudicial, nos termos do artigo 784, III, do Código de processo civil, podendo o mesmo ser cobrado judicialmente na forma supra em caso do inadimplemento.</p>
                    <p><span className="font-semibold">CLAUSULA SEXTA</span> – DA CLAUSULA PENAL E COBRANÇA JUDICIAL: Fica estabelecido ainda que, em caso de não cumprimento de qualquer disposição deste instrumento por parte do CONTRATANTE, este estará sujeito a clausula penal moratória de 20% (vinte por cento) sobre o valor total do acordo, ainda que a motivadora seja puramente o inadimplemento dos valores celebrados, independentemente da época da rescisão bem como que, ficara o CONTRATANTE  responsável por eventuais despesas judiciais e/ou extrajudiciais que o CONTRATADO tiver que despender para ressalva e proteção de sus diretos e interesses, inclusive honorários advocatícios, desde já fixados em 20% (vinte por cento) do valor da causa nos termos do artigo 85, 2º do CPC, sem prejuízos a eventuais perdas e danos que por ventura ultrapassarem a referida quantia.</p>
                    <p><span className="font-semibold">CLAUSULA SETIMA</span> – DA DECLARAÇÃO DE VONTADE: Todas as partes expressamente ter pleno      conhecimento das cláusulas e condições do presente termo estando de acordo com tudo que nele consta, prometendo contra o mesmo jamais alegar qualquer lesão de direito;</p>
                    <p><span className="font-semibold">CLAUSULA OITAVA</span> – DO FORO: Fica eleito o foro da Comarca de Joinville para dirimir eventuais questões judiciais, abdicando-se as partes de qualquer outro por mais especial que seja.</p>
                    <p>E por estarem justos e contratados, firmam o presente, em duas vias perante as testemunhas que subscrevem.</p>
                    <p>Joinville, <span className="font-semibold">{contrato.data[0].dia}</span> de <span className="font-semibold">{contrato.data[0].mes}</span> de <span className="font-semibold">{contrato.data[0].ano}</span></p>
                    <div className="flex justify-between mt-10">
                        <div className="flex flex-col justify-center items-center relative">
                            <p className="absolute bottom-7 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.nomeCondutor}</p>
                            <p>_________________________________</p>
                            <p>Assinatura do Contratante</p>
                        </div>
                        <div className="flex flex-col justify-center items-center relative">
                            {contrato.assinado === true && (
                                <p className="absolute bottom-7 italic font-light text-lg text-[rgb(0,55,85)]">{contrato.contratado[0].nome}</p>
                            )}
                            <p>_________________________________</p>
                            <p>Assinatura do Contratado</p>
                        </div>
                    </div>
                    <div className="flex justify-between mt-10">
                        <div className="flex flex-col justify-center items-center relative">
                            <p>_________________________________</p>
                            <p>Assinatura da Testemunha</p>
                        </div>
                        <div className="flex flex-col justify-center items-center relative">
                            <p>_________________________________</p>
                            <p>Assinatura da Testemunha</p>
                        </div>
                    </div>
                </div>
                <div className="
                w-full h-15
                flex justify-center items-center
                mt-auto
                bg-gray-100 
                border-t-1 border-[#c9c9c9] rounded-br-xl rounded-bl-xl">
                </div>
            </div>
        </div>
    </div>
  );
}
