import axios from "axios";
import convert from 'xml-js'

const uri = "http://ws.dataservice.ecm.technology.totvs.com/";
const urlWsdl = "https://vanadiode121347.fluig.cloudtotvs.com.br/webdesk/ECMDatasetService"; //homologação
const urlWsdl__ = "https://vanadiode121346.fluig.cloudtotvs.com.br/webdesk/ECMDatasetService"; //Produção
const SOAPActionFluig = 'getDataset';
const adminFluig = 'admin';
const senhaFluig = 'Vmsa@123'
const empresaFluig = '01';

const getContracts = async ({ email }) => {

    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                    <soapenv:Header/>
                    <soapenv:Body>
                    <ws:getDataset>
                        <companyId>${empresaFluig}</companyId>
                        <username>${adminFluig}</username>
                        <password>${senhaFluig}</password>
                        <name>dsBuscaContratosProtheus</name>
                        <fields>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </fields>
                        <constraints>
                            <!--Zero or more repetitions:-->
                            <item>
                                <!--Optional:-->
                                <contraintType>?</contraintType>
                                <!--Optional:-->
                                <fieldName>EMAIL</fieldName>
                                <!--Optional:-->
                                <finalValue>${email}</finalValue>
                                <!--Optional:-->
                                <initialValue>${email}</initialValue>
                                <likeSearch>?</likeSearch>
                            </item>
                        </constraints>
                        <order>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </order>
                    </ws:getDataset>
                    </soapenv:Body>
                </soapenv:Envelope>`

    const result = await axios.post(urlWsdl, xml,
        {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: SOAPActionFluig
            }
        })

    const resultJson = JSON.parse(convert.xml2json(result.data, { compact: true }))
    if (Array.isArray(resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"])) {
        return criaObjetosArray(resultJson);
    } else {
        return criaObjeto(resultJson);
    }
}

const getCompetencias = async (contrato) => {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                    <soapenv:Header />
                    <soapenv:Body>
                        <ws:getDataset>
                            <companyId>${empresaFluig}</companyId>
                            <username>${adminFluig}</username>
                            <password>${senhaFluig}</password>
                            <name>sdListaCompetenciaProtheus</name>
                            <fields>
                                <!--Zero or more repetitions:-->
                                <item>?</item>
                            </fields>
                            <constraints>
                                <!--Zero or more repetitions:-->
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CONTRATO</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${contrato}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                            </constraints>
                            <order>
                                <!--Zero or more repetitions:-->
                                <item>?</item>
                            </order>
                        </ws:getDataset>
                    </soapenv:Body>
                </soapenv:Envelope>`

    const result = await axios.post(urlWsdl, xml,
        {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: SOAPActionFluig
            }
        })

    const resultJson = JSON.parse(convert.xml2json(result.data, { compact: true }))
    if (Array.isArray(resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"])) {
        return criaObjetosArray(resultJson);
    } else {
        return criaObjeto(resultJson);
    }
}

const getItensContracts = async (contrato) => {

    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                    <soapenv:Header/>
                    <soapenv:Body>
                    <ws:getDataset>
                        <companyId>${empresaFluig}</companyId>
                        <username>${adminFluig}</username>
                        <password>${senhaFluig}</password>
                        <name>dsItensContratoProtheus</name>
                        <fields>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </fields>
                        <constraints>
                            <!--Zero or more repetitions:-->
                            <item>
                                <!--Optional:-->
                                <contraintType>?</contraintType>
                                <!--Optional:-->
                                <fieldName>CONTRATO</fieldName>
                                <!--Optional:-->
                                <finalValue></finalValue>
                                <!--Optional:-->
                                <initialValue>${contrato}</initialValue>
                                <likeSearch>?</likeSearch>
                            </item>
                        </constraints>
                        <order>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </order>
                    </ws:getDataset>
                    </soapenv:Body>
                </soapenv:Envelope>`

    const result = await axios.post(urlWsdl, xml,
        {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: SOAPActionFluig
            }
        })

    const resultJson = JSON.parse(convert.xml2json(result.data, { compact: true }));
    if (Array.isArray(resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"])) {
        return criaObjetosArray(resultJson);
    } else {
        return criaObjeto(resultJson);
    }
}

const getCentroCusto = async () => {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                    <soapenv:Header/>
                    <soapenv:Body>
                    <ws:getDataset>
                        <companyId>${empresaFluig}</companyId>
                        <username>${adminFluig}</username>
                        <password>${senhaFluig}</password>
                        <name>dsCentroCustoProtheus</name>
                        <fields>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </fields>
                        <constraints>
                            <!--Zero or more repetitions:-->
                            
                        </constraints>
                        <order>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </order>
                    </ws:getDataset>
                    </soapenv:Body>
                </soapenv:Envelope>`

    const result = await axios.post(urlWsdl, xml,
        {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: SOAPActionFluig
            }
        })

    const resultJson = JSON.parse(convert.xml2json(result.data, { compact: true }));
    if (Array.isArray(resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"])) {
        return criaObjetosArray(resultJson);
    } else {
        return criaObjeto(resultJson);
    }
}

const getMedicoes = async (contrato) => {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                    <soapenv:Header/>
                    <soapenv:Body>
                    <ws:getDataset>
                        <companyId>${empresaFluig}</companyId>
                        <username>${adminFluig}</username>
                        <password>${senhaFluig}</password>
                        <name>dsMedicoesContratoProtheus</name>
                        <fields>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </fields>
                        <constraints>
                            <!--Zero or more repetitions:-->
                            <item>
                                <!--Optional:-->
                                <contraintType>?</contraintType>
                                <!--Optional:-->
                                <fieldName>CONTRATO</fieldName>
                                <!--Optional:-->
                                <finalValue></finalValue>
                                <!--Optional:-->
                                <initialValue>${contrato}</initialValue>
                                <likeSearch>?</likeSearch>
                            </item>
                        </constraints>
                        <order>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </order>
                    </ws:getDataset>
                    </soapenv:Body>
                </soapenv:Envelope>`

    const result = await axios.post(urlWsdl, xml,
        {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: SOAPActionFluig
            }
        })
    //trabalhando
    const resultJson = JSON.parse(convert.xml2json(result.data, { compact: true }));
    if (Array.isArray(resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"])) {
        var arrayObjetos = []
        arrayObjetos.push(criaObjetosArray(resultJson));
        return criaObjetosArray(resultJson);
    } else {
        var arrayObjetos = []
        arrayObjetos.push(criaObjeto(resultJson));
        return arrayObjetos;
    }
}

const getPedidoDeCompras = async ({ cnpj }) => {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                    <soapenv:Header/>
                    <soapenv:Body>
                    <ws:getDataset>
                        <companyId>${empresaFluig}</companyId>
                        <username>${adminFluig}</username>
                        <password>${senhaFluig}</password>
                        <name>dsPedidoCompraRM</name>
                        <fields>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </fields>
                        <constraints>
                            <!--Zero or more repetitions:-->
                            <item>
                                <!--Optional:-->
                                <contraintType>?</contraintType>
                                <!--Optional:-->
                                <fieldName>CNPJ</fieldName>
                                <!--Optional:-->
                                <finalValue></finalValue>
                                <!--Optional:-->
                                <initialValue>${cnpj}</initialValue>
                                <likeSearch>?</likeSearch>
                            </item>
                        </constraints>
                        <order>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </order>
                    </ws:getDataset>
                    </soapenv:Body>
                </soapenv:Envelope>`

    const result = await axios.post(urlWsdl, xml,
        {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: SOAPActionFluig
            }
        })
    const resultJson = JSON.parse(convert.xml2json(result.data, { compact: true }));
    if (Array.isArray(resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"])) {
        return criaObjetosArray(resultJson);
    } else {
        return criaObjeto(resultJson);
    }

}

const getAcesso = async ({ cnpj, email, password }) => {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                    <soapenv:Header/>
                    <soapenv:Body>
                    <ws:getDataset>
                        <companyId>${empresaFluig}</companyId>
                        <username>${adminFluig}</username>
                        <password>${senhaFluig}</password>
                        <name>dsValidaAcessoProtheus</name>
                        <fields>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </fields>
                        <constraints>
                            <!--Zero or more repetitions:-->
                            <item>
                                <!--Optional:-->
                                <contraintType>?</contraintType>
                                <!--Optional:-->
                                <fieldName>EMAIL</fieldName>
                                <!--Optional:-->
                                <finalValue>${email}</finalValue>
                                <!--Optional:-->
                                <initialValue>${email}</initialValue>
                                <likeSearch>?</likeSearch>
                            </item>
                            <item>
                                <!--Optional:-->
                                <contraintType>?</contraintType>
                                <!--Optional:-->
                                <fieldName>CNPJ</fieldName>
                                <!--Optional:-->
                                <finalValue>${cnpj}</finalValue>
                                <!--Optional:-->
                                <initialValue>${cnpj}</initialValue>
                                <likeSearch>?</likeSearch>
                            </item>
                            <item>
                                <!--Optional:-->
                                <contraintType>?</contraintType>
                                <!--Optional:-->
                                <fieldName>SENHA</fieldName>
                                <!--Optional:-->
                                <finalValue>${password}</finalValue>
                                <!--Optional:-->
                                <initialValue>${password}</initialValue>
                                <likeSearch>?</likeSearch>
                            </item>
                
                        </constraints>
                        <order>
                            <!--Zero or more repetitions:-->
                            <item>?</item>
                        </order>
                    </ws:getDataset>
                    </soapenv:Body>
                </soapenv:Envelope>`

    const result = await axios.post(urlWsdl, xml,
        {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: SOAPActionFluig
            }
        })

    const resultJson = JSON.parse(convert.xml2json(result.data, { compact: true }))

    //return resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]

    var arrayObjetos = criaObjeto(resultJson);
    return arrayObjetos;

}

const gravaMedicao = async (medicao, selected, filial) => {
    var kpis = []
    var itensMedicao = [];
    for (var i = 0; i < medicao.itens.length; i++) {

        itensMedicao.push(`{
            "cNEITEM": "${medicao.itens[i].cnbitem}",
            "cNEQUANT": ${parseFloat(medicao.itens[i].quantidade)},
            "cNECC": ${medicao.itens[i].cnbcc}
        }`)
        for (var ii = 0; ii < medicao.itens[i].kpi.strkpiplanilha.length; ii++) {
            kpis.push(`{
                "zKDESCRIC": "${medicao.itens[i].kpi.strkpiplanilha[ii].zkdescric.trim()}",
                "zKITEM": "${medicao.itens[i].kpi.strkpiplanilha[ii].zkitem.trim()}",
                "zKITSC": "${medicao.itens[i].kpi.strkpiplanilha[ii].zkitsc.trim()}",
                "zKMETA": "${medicao.itens[i].kpi.strkpiplanilha[ii].zkmeta.trim()}",
                "zKOBS": "${medicao.itens[i].kpi.strkpiplanilha[ii].zkobs.trim()}",
                "zKREFEREN": "${medicao.itens[i].kpi.strkpiplanilha[ii].zkreferen.trim()}",
                "zKSC": "${medicao.itens[i].kpi.strkpiplanilha[ii].zksc.trim()}",
                "zKTIPO": "${medicao.itens[i].kpi.strkpiplanilha[ii].zktipo.trim()}",
                "zLITEMMED": "${medicao.itens[i].kpi.strkpiplanilha[ii].zlitemmed.trim()}",
                "zLVLRMED": "${medicao.itens[i].kpi.strkpiplanilha[ii].zlvlrmed.trim()}",
            }`)
        }
    }

    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <ws:getDataset>
                            <companyId>${empresaFluig}</companyId>
                            <username>${adminFluig}</username>
                            <password>${senhaFluig}</password>
                            <name>dsGravacaoMedicaoProtheus</name>
                            <fields>
                                <!--Zero or more repetitions:-->
                                <item>?</item>
                            </fields>
                            <constraints>
                                <!--Zero or more repetitions:-->
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CND_FILIAL</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${filial}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CND_CONTRA</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${medicao.cnd_contra}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CND_FORNEC</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${medicao.cnd_fornec}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CND_LJFORN</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${medicao.cnd_ljforn}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CND_NFPARC</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${medicao.cnd_nfparc}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CND_NUMERO</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${medicao.cnd_numero}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CND_PARCEL</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${medicao.cnd_parcel}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CND_REVISA</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${medicao.cnd_revisa}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CNDRCCOMP</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${selected}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CNE_ITEM</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${itensMedicao}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>KPIS</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${kpis}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                            </constraints>
                            <order>
                                <!--Zero or more repetitions:-->
                                <item>?</item>
                            </order>
                        </ws:getDataset>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const result = await axios.post(urlWsdl, xml,
        {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: SOAPActionFluig
            }
        })

    const resultJson = JSON.parse(convert.xml2json(result.data, { compact: true }))
    return criaObjeto(resultJson)

}

const recuperaSenha = async ({ cnpj, email, password }) => {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dataservice.ecm.technology.totvs.com/">
                    <soapenv:Header />
                    <soapenv:Body>
                        <ws:getDataset>
                            <companyId>${empresaFluig}</companyId>
                            <username>${adminFluig}</username>
                            <password>${senhaFluig}</password>
                            <name>dsAlteraSenhaProtheus</name>
                            <fields>
                                <!--Zero or more repetitions:-->
                                <item>?</item>
                            </fields>
                            <constraints>
                                <!--Zero or more repetitions:-->
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>CNPJ</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${cnpj}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>EMAIL</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${email}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                                <item>
                                    <!--Optional:-->
                                    <contraintType>?</contraintType>
                                    <!--Optional:-->
                                    <fieldName>SENHA</fieldName>
                                    <!--Optional:-->
                                    <finalValue></finalValue>
                                    <!--Optional:-->
                                    <initialValue>${password}</initialValue>
                                    <likeSearch>?</likeSearch>
                                </item>
                            </constraints>
                            <order>
                                <!--Zero or more repetitions:-->
                                <item>?</item>
                            </order>
                        </ws:getDataset>
                    </soapenv:Body>
                </soapenv:Envelope>`

    const result = await axios.post(urlWsdl, xml,
        {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: SOAPActionFluig
            }
        })

    const resultJson = JSON.parse(convert.xml2json(result.data, { compact: true }))

    return criaObjeto(resultJson)
}

function criaObjeto(resultJson) {
    var parametros = resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["columns"];
    var values = resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"]["value"];
    var objeto = {};
    var arrayObjetos = []
    var forValues = values.length;

    for (var i = 0; i < forValues; i++) {
        objeto = {};
        for (var ii = 0; ii < parametros.length; ii++) {
            objeto[parametros[ii]['_text']] = values[ii]['_text']
        }
    }

    return objeto
}

function criaObjetosArray(resultJson) {
    var parametros = resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["columns"];
    var values = resultJson["soap:Envelope"]["soap:Body"]["ns1:getDatasetResponse"]["dataset"]["values"];

    var objeto = {};
    var arrayObjetos = []
    var forValues = values.length;
    for (var i = 0; i < forValues; i++) {
        objeto = {};
        for (var ii = 0; ii < parametros.length; ii++) {
            objeto[parametros[ii]['_text']] = values[i]['value'][ii]['_text']
        }
        arrayObjetos.push(objeto)
    }

    return arrayObjetos
}

export {
    getContracts,
    getItensContracts,
    getMedicoes,
    getPedidoDeCompras,
    getAcesso,
    gravaMedicao,
    recuperaSenha,
    getCompetencias,
    getCentroCusto
}