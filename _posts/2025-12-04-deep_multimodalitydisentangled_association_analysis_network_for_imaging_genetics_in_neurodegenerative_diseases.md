---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNJSIB4A%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIGIivMoxrfc%2BUb8UsQeHSZXLdPNo%2FMjFe5pY9inVSJy5AiEAtoCpAYLuTHzxQcyhBOhFfrK3MJnpvcLDgSMswKai5PMq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDCaIm%2Bc%2BsL4LL3JHVircAzGXaEi106unpiuEXcbSBCWxBf9TMjnHTgCoUKPaSZG5DGIRsQspZb6qHrixlHItqOK5usJiarOv54FmAO4eMxUPPUA44JEgDqoH1mOaEPg4Apw3E0rCjTd%2FN3WC8KU7iNyKx4ZMStnpp%2FfEs1muAY%2FPML0fbuuGkJqF%2BgbJ4O691LHOxV7W0XVTRG54RDhJkrKN9WNvFSTfjm8rr5leVsssJsMDZORRCtuUO%2FGsu%2F1KQ6WFKkZmy32yRGjCqaWanSRRr6lc9YqBIUF1KLf4l%2F8fP%2BkNa4YMDhpLTdy0M6DURfZ5mW%2FH5GRkmSEUVS8aqmKzJ2EdO4CXwAms0Jyt23M7ndItngmciS%2FHeDA%2FTzU9N%2Fjapg2Qdkl1Qyb%2BtsDPvfiC4TpM2lF223McbmnESa3t%2BUtqBsRVBrT3%2FdEg9P6qfnPhTIGkTPN5TWqXfzxHSsISpRjaAYlcKbiO0F5Cv7NZKhq%2BRtdu%2BO%2FSAOZoV1TPD9kDQUX6hYeyPLbQbv5opU4zESayn9aSyAIu2p8hT18X%2Fw0GZvzmeOgKJU3bYW%2BJzPwDAgUllb9ExaMGPC%2FtATwza2lyL7AfUWx0YbSSdSfY5GnIvp4TZyZerNalB7BYp9BbPS3A%2BrbbmZ7CMLeM6s0GOqUBjLfLM5cL%2FaRpyveeXj4hf29v7Y%2FEn7QVh4JUAAM7MGp%2FYbEsuq5ar5q06ZLsYVpctq6ArxZzGI55TSpRHLnr7sp0KaVZYvPeWcBKP5812U5S%2BNbx4Kk0BtHexpU4QaEcQDXqyiOoGbB9SZ33P7akkH3dmWaxYfmyUdQ5atVGvcPQ9HTUgQedl3GdrGRNQ0V9IkV8N%2FxCkJcKdt6EHwh7Z%2BtD5Rzs&X-Amz-Signature=96690527e90768397cc47fc456abf8de02baf4ba56e2abea98c4ed57320ec15f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNJSIB4A%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIGIivMoxrfc%2BUb8UsQeHSZXLdPNo%2FMjFe5pY9inVSJy5AiEAtoCpAYLuTHzxQcyhBOhFfrK3MJnpvcLDgSMswKai5PMq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDCaIm%2Bc%2BsL4LL3JHVircAzGXaEi106unpiuEXcbSBCWxBf9TMjnHTgCoUKPaSZG5DGIRsQspZb6qHrixlHItqOK5usJiarOv54FmAO4eMxUPPUA44JEgDqoH1mOaEPg4Apw3E0rCjTd%2FN3WC8KU7iNyKx4ZMStnpp%2FfEs1muAY%2FPML0fbuuGkJqF%2BgbJ4O691LHOxV7W0XVTRG54RDhJkrKN9WNvFSTfjm8rr5leVsssJsMDZORRCtuUO%2FGsu%2F1KQ6WFKkZmy32yRGjCqaWanSRRr6lc9YqBIUF1KLf4l%2F8fP%2BkNa4YMDhpLTdy0M6DURfZ5mW%2FH5GRkmSEUVS8aqmKzJ2EdO4CXwAms0Jyt23M7ndItngmciS%2FHeDA%2FTzU9N%2Fjapg2Qdkl1Qyb%2BtsDPvfiC4TpM2lF223McbmnESa3t%2BUtqBsRVBrT3%2FdEg9P6qfnPhTIGkTPN5TWqXfzxHSsISpRjaAYlcKbiO0F5Cv7NZKhq%2BRtdu%2BO%2FSAOZoV1TPD9kDQUX6hYeyPLbQbv5opU4zESayn9aSyAIu2p8hT18X%2Fw0GZvzmeOgKJU3bYW%2BJzPwDAgUllb9ExaMGPC%2FtATwza2lyL7AfUWx0YbSSdSfY5GnIvp4TZyZerNalB7BYp9BbPS3A%2BrbbmZ7CMLeM6s0GOqUBjLfLM5cL%2FaRpyveeXj4hf29v7Y%2FEn7QVh4JUAAM7MGp%2FYbEsuq5ar5q06ZLsYVpctq6ArxZzGI55TSpRHLnr7sp0KaVZYvPeWcBKP5812U5S%2BNbx4Kk0BtHexpU4QaEcQDXqyiOoGbB9SZ33P7akkH3dmWaxYfmyUdQ5atVGvcPQ9HTUgQedl3GdrGRNQ0V9IkV8N%2FxCkJcKdt6EHwh7Z%2BtD5Rzs&X-Amz-Signature=96690527e90768397cc47fc456abf8de02baf4ba56e2abea98c4ed57320ec15f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XUWWWCJ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDeOw1cpVYVMFVAINsyT6AcfSFVs8R6IIFI7QRsGh7PYAIgFG2AtMWYaWPfVRgj0C%2FoBk8x%2BHEAnHfSDHwNuK9MOX0q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDPjOw0%2FH66KUMZwAiyrcAxlNNwTlD6CDV8lfsnR%2FCW6rnL7whKtrqP7KFG7mVVgc3GIF4O0kVuzgHClbCXk3eyqI%2FcttYTPe8grJ654a8tCmgSzgeAswzilHaxqA2KTsoybZI5Gt0Zv5BvdTIdpmGRZXFkNmnvTQ9IfyrBk5BZui%2Fkg7oPU2ssLjIiitUfnhfBk2GeYdHfYiIDtpeF8IUGPwl7rX8KLQaGRUO0T6WK3XjRopdqe%2Byo9BNhweVMRDzUPnXu35VJuLiK9avRxSNPTAth4T9sVtx6J3mPnNqb1wTq8efzqUrqiGv9qXH7Zg3JfZitZlvcFHNLUQKgjodLpvehA30fulGmQWGHafuJLs4tJowzH5v9eIwzk6QtFmHuv7NxWYZ1Es0Fqvw2AqPgNNB2rWmezoXvWYFc9aAzKgp5P%2Fgqy25INPBEI2AItEZWpMTZ85AxHxf%2Fi7JdhC3F5O9ce1lWsO8Dh%2FDuVY9Bbjv9qMYfYG9V7s8Z95T%2FyFUr15eIpDv9evPzvScz1dEbs3JNCKpMdi%2BikJ8oONLOqnwBjJ6O2oOE4WvGOmttVM2pEeNG4KnNhPbJwPV91N1y1NpQtp03Dyq3nNw2JbplVWrxT42pHzU95S2ihS4JN9uNhET5f1EEKGylyoMJmB6s0GOqUBmNzIKnRA8njD6cSvGQgw7rBCPAUH0EhAmoAh%2BzVYdnA47o52OtS93easeZ4FIqSaH8XIhziDMttDlCx9OcSz4URrKMUsTdCwSu4rQz85gO3vjDeuYj7k3hmjXkWjf9FyOkXAJTO%2FsZWRZuT6QQAqyPPPz2ho5FeGWQR%2FC4ACTy8MZ7%2F6rPoHYu7U%2FOu2NOMKw2%2F2nXnAyjhyzKy%2FGQeoNYUOpsFO&X-Amz-Signature=7bc01f28260fb04a86a44d10bfb295f097fcfce49bdb683cbf8ab381edd5fff4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CCNXO2J%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQC9bRNM577xSCyhAlkYMX%2BrOWAGTORKmviaMyAvanTQRQIgI4eYo14hcpjLA6D6AL8Iza6x6FFBfHkkWGJwQkxnObgq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDBP22zDagUGCQK1bkSrcA45Gv488qn9tn7xz6aCcVBc9LWECnQ3rhovq%2BvkpYG5Gc00MeNlcuwPnWiHTbR5f1ECK0KH3%2BEGX%2FUF1f3YE8l3Cik23YJVaT1GtpI81pIPhdSSHUv6A%2FN%2Bi1RFa2V1Hjv88tixm7Ogc8Vv2kRRq7qtFPhHJZcm%2F5FHKUxJ99nYJSz9na9cZrL9v1eJbZXDb0QYRvhvj4LdupgqjQ1krdq3n07WEFU2CTlbfiy75Yqpo6Hskza3CE6oNLj6RI8gNvYxIPRFV1j4ezRjBNlULWGr0Dgwcr9yQfR99uQJqk3MLG6YEvD2O4Wb2BLCIaRv9XHQWyd79F%2FfSa69bLlV9r9Kwhvngu%2FoR%2FYmXOVpBcbVm%2F8AW0JjxWBi23pac3Tjs6QPZvT%2BVxa1DsRd9Y1oSHz9t0DJ%2F%2BavrLK58Rl4Eb%2BeQsO2ZpGFyzD%2BHHCdzYhQRKF3djmqoqwOdsaoNJITpj69VEiRiyaHMQ2WhlvTWWdzWPneQb%2FYV4FkVdivkSu%2Bcywa9%2Bx02gbaSQJTma0%2BH52gEAPkIFRLDBIOwm%2FjPM%2BRxCSlZEttjf12ca5kUrwP7HgEMijJwscFXBdiEVvQybp8ZEM6spwGbsKdk3c6kOvm8MQX6TOcJV%2BkEpcY1MLCC6s0GOqUBa4Ye9PZqwQxlgyK%2BQJ4IphZGbvAVl1lTKJ5anThVGVScQOdpXYBvaBtpFy1n%2B9aDtMfhXzwKhlSv%2FVzT%2FaR%2BhG4oiYg1EhH4OOHGqwxc2CW23FURaV%2FVoS1hj4AgNSju6Uazb0qMTG2zyKURJMivo5EPQKUao6ID4zOTE1UldVJjdfcoOAlnszZTiLpsF1Bi4Zy36btkowdc34HtvK5bpCvFisZJ&X-Amz-Signature=91e4d2069bd8b482adcffdcde7bfc73030c60846aff6da1a7419cea6314346d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CCNXO2J%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQC9bRNM577xSCyhAlkYMX%2BrOWAGTORKmviaMyAvanTQRQIgI4eYo14hcpjLA6D6AL8Iza6x6FFBfHkkWGJwQkxnObgq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDBP22zDagUGCQK1bkSrcA45Gv488qn9tn7xz6aCcVBc9LWECnQ3rhovq%2BvkpYG5Gc00MeNlcuwPnWiHTbR5f1ECK0KH3%2BEGX%2FUF1f3YE8l3Cik23YJVaT1GtpI81pIPhdSSHUv6A%2FN%2Bi1RFa2V1Hjv88tixm7Ogc8Vv2kRRq7qtFPhHJZcm%2F5FHKUxJ99nYJSz9na9cZrL9v1eJbZXDb0QYRvhvj4LdupgqjQ1krdq3n07WEFU2CTlbfiy75Yqpo6Hskza3CE6oNLj6RI8gNvYxIPRFV1j4ezRjBNlULWGr0Dgwcr9yQfR99uQJqk3MLG6YEvD2O4Wb2BLCIaRv9XHQWyd79F%2FfSa69bLlV9r9Kwhvngu%2FoR%2FYmXOVpBcbVm%2F8AW0JjxWBi23pac3Tjs6QPZvT%2BVxa1DsRd9Y1oSHz9t0DJ%2F%2BavrLK58Rl4Eb%2BeQsO2ZpGFyzD%2BHHCdzYhQRKF3djmqoqwOdsaoNJITpj69VEiRiyaHMQ2WhlvTWWdzWPneQb%2FYV4FkVdivkSu%2Bcywa9%2Bx02gbaSQJTma0%2BH52gEAPkIFRLDBIOwm%2FjPM%2BRxCSlZEttjf12ca5kUrwP7HgEMijJwscFXBdiEVvQybp8ZEM6spwGbsKdk3c6kOvm8MQX6TOcJV%2BkEpcY1MLCC6s0GOqUBa4Ye9PZqwQxlgyK%2BQJ4IphZGbvAVl1lTKJ5anThVGVScQOdpXYBvaBtpFy1n%2B9aDtMfhXzwKhlSv%2FVzT%2FaR%2BhG4oiYg1EhH4OOHGqwxc2CW23FURaV%2FVoS1hj4AgNSju6Uazb0qMTG2zyKURJMivo5EPQKUao6ID4zOTE1UldVJjdfcoOAlnszZTiLpsF1Bi4Zy36btkowdc34HtvK5bpCvFisZJ&X-Amz-Signature=5f1ccec637b4292824d2f610de337757caee08b1c6fc92df9aa374be7c157267&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHKY3MJO%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDSH4wheip8j4u9cUkEJu6KTim86DstE4AAx%2F48AxWqPAIgdlN0IHzwyE5e89CzD4poCgGtfGXcCMeXo6xRF2LqTRwq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDMqamABuCE%2Fiw8cy2CrcA2B%2BBqv5gALjuW0kxo3%2BkpAepyTOZTOFtHYVop5v8lxzloyRf0aoZOlyrkLCFVhxn49WlFwJZ1JLzAro5FZfucrD5ykdwojpdpQyfc90CN38q5IwZ0cJPHgI5Wf2mVSIL%2FuB66tf%2BznhM62K6wwVA%2F89XdARpp2N2RrgJRLJQWgXNEgmBn0IhYSrGtrGfEWlm4ddKx%2FfC1NCUccx6OkAOBkyyNWCXM8Icqc073loDMy3Bj%2BgDiQ6y9IE6BtNeGNAghS8GW3LWaWLLWeo26tEG3J2y8UN%2FfCM2MCkANO0hhYd1A%2F334bLaEKci9lcdCNSaIqKiHP85mFr3p3Hxl%2FxHy8yRtLApJPoLbYpYi0v3ArHMYlY3Pv4m9jTq74WdGLhBfMPGErWupl6cHBFKml70zTaaiXmLBUBcKFBy4C0H372AzSBCzz%2FnCxbd49517wBUmqz2Xd00FO4DGutC0UBktugEYP7v2fKYL9Jj0FgWG%2FqyOJ2SuOh1ZQ0YUMA%2Bj6qZWuY8pz3DDrVtmWamSlmHlSsZ30fRZ5E7sFgsiDsGdaxtCJCREV4cRP4c8PgWJFpI%2FSIpw44S6pfzGqF%2Fvx1Wa1IBaWtreFV2z17bKnYSADoALiqi8CqM0PHzSfdMJ2C6s0GOqUBp%2FwXYf4DY88BO98YazyBFbS%2FNSLSGHAO33BJ3PQTAgbZPwsrOJ%2Fn7c9dr%2Byfyfts4ECxhdkXSwyPjbyEmHZ9MPc6w%2B0J9V%2BaEXRBcWZJh4%2FKCbcPjZ2cOP5BGEbDvfGpqOH1TkzKX5WKX8j5b7yqRCfCaHqPU9UkEIdwHmPHtDHGOq67%2F%2Fmo3FFIleni%2Bm1ts3Ky1LCoaRooGKfJvEHxuHKScvTA&X-Amz-Signature=385c4d17ffba1ee8dda6741f4f176838385029f658df1ef37f3eed6483ffde7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYBGHNOB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQCWs%2F47bzru%2FM8aRZ%2BOJw5y151gWA2dpo0Oj3j0E2kJOAIgYu6%2B68OZqjh4C83dr0KVxrczGXMrDmChibBJ%2BjOQSqAq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDCi4YjV00IjS%2F%2BJXICrcA3JRdUCWsPVA9iEbf0Dck1BBMLlircvpx7EEWp4aQgbQMj0Q2pUi37Rk7vM88srxCf9edAjZXuFBxCNLsCWT16pP8UCQK9htJhbMJZAiONAqmmK1G%2Bx4%2BZSg9ArSddnoEJSs026HU4Mhw6GQePhjnB%2B%2Ba8mafbE4aZkoISEtp9lQ7qNQz%2FrJPCRDa6VCzsGVraTpazo2ObRfaOM7M14kLDyZ%2F6t7pBZw%2BW4jCR89bQMG9vLpEedZ%2FyC%2BGGYWhN915yupcV5XyB6H0pvTv5j8cc6NQkslut2N0fyehIEGgTsTsVEICzgQY7DkXmwGuA6FDC74PGiWFERzYja9WiEcfi62OiYrfQXJv3iKTtiuYVvwYw9hxxrgGXJEmtGl1HTQXWO2dwh9XG2YhXDUod19aXhp8m0EuMMh8QcUC7fapbroC%2FgJEKQkBZ8dsoHCwWIZOktEi2O5RXVRM6SJXaVtW%2F3ZR6SHvA%2FEi5QDpICw67soBSKvlE7r5yc%2FCwE543j%2BKgS0ycnCKeBP4e%2FfrPBZINlBjtnLWqEf%2FoOrQxJ4Bv6EsZp3s%2BC0UQLkrSiKfFdHKWReLQ5ntF8ZUiE3yoavLIWnVah5%2BkaPws7b6%2FU7IQJn2N%2FV99zPL2%2FJKFvqMNuC6s0GOqUBRONgxHhb1R4f%2B9JRT699KGwJ4dKYcEoGopifUFNdaPCV0FmoKLPbsFeNQ5k5My3zAoTBEav1qoWoVEWOUUO9%2Fhw%2BOqjya4JYGzoz2dYtwB8DzCcoA7CNQVmXaKiT3L3%2B9O776movPp%2Fz%2FJwNGib1itD7RLLJqzo1LLXAd0L9g1CW%2BxIfoHloF9u59rRUT9R5UPVZOVONVotYQwmsoMIHREFOYoe3&X-Amz-Signature=4345999d7d35f48b7a2cb90d775e554002b5ae8881fcd499bcadb691d72b135b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZ4G5JAA%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDf2zNwmWUwUjFgjhfxC%2FYM%2FtK%2BvPyLmfh9hokLC50IGAIhANGOiXg2jBq3nh9zPjE251P3xW0od061oBIRpGvi8KSFKv8DCAQQABoMNjM3NDIzMTgzODA1IgznELGjKzGD495OwEsq3ANyyzuO92akEZjOLXV4Mkt1fnkl3Fs%2BHBZsI4WNOWUeSYNVJrx3ypxoYVW3La3jEUA2mMi9heSA0lhQLoGMBhJgOY8IdmVRFCmqicUfGVEOR9SjC7UGsmLs1HMGtK4wZ6IR9jQwOjP89%2FNlAZKpFtOy4gM%2BEWfdpH8AuPZJMx4a9YLCKfxBUqxNszjznDwAcTC0q6u8AXJCqr5BX9Mu4%2FbClbqKnFCbGGlV1kF9M7onXz9Tdz8mzBX%2F5a2hy%2BXxsNHQg5anRYPTt8JxSyv2LOL2P96Eehc7QmclnzMknY%2BA0bkBANZW%2F0BWoHe8zRZ7586%2BTuhMIPVF17XGXDPibMFHdseX5T5AlUGUvi6scQfM8ms%2FQ3TbtCj4tKaKoEKa%2BWAum7xEBm9Pux9CcBuX3KWq7IXUJifa0Ba1zfbcrr%2F7RChlv4OozL3%2BqIfAt%2BVCj4R4HihtwYQWPwAVVwG3HF4tTSPeVcgXB0EQk2BpNcTs7QMtOi2lyukP%2F0m9pxDza8g8IwNL%2F4Dtr2Fr86aNAeFLjChuuOZGruMZ3fQT1gKwj%2FuMT9D%2F2ezhMc2Phpaxa1Cx6WHODP%2FDXvfYfgBS%2Fyu5HE8Hvzp2z48SAVSYuXl9gdRb3CX%2BE2a4Bem%2BojDvgerNBjqkAZ%2FhCu7hXlQ0la67pyetXGPrb7iWeVK%2F%2FdH4IRPcxLnQkPsd8rmparbdN%2B6VqDU2Rpo7OMcNOSAU2OG1IiAFzVnQz%2FRw%2FlWQN08dMZAmMdH4V6qz1EBSF%2BqORx5v%2Fiz4SGWG6uM6KoHEnyZyLyw4PXCNcP%2FXtc3EXqQYmtmzy9mIYROcZ7UMWuM4QKs2Azp%2B1q7JgTFjm62ixnBzkqMolWGhRv9y&X-Amz-Signature=0ee896e605b79e11e09585dece85027997867fd95edf5d2a51660f59b95b3c0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663D2QLP4U%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIEj4NMxFMOpSE9ywk2cy1AgmlD7oDTsdigeLiBKN4ISuAiBvaJQaid51QyFZnnIvuiUL21uO9bNodFu63xguQqX%2BCir%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMwtxoAuBDE0p7d2m0KtwDw9xr6uOXP4%2BUDqsHfKOKqFLVXbBL%2BPz8QgCOC%2B2j2JYeRbAx%2BrtOcwfCIZbv%2BmjDk4EVJaECed%2BdQbFIL5XAI4eZsmO%2FsPZGg5mr9JBrTLLdjMTq1Jxlj4AQGrbAjRHARgy4hLvDaSAXUEHNdKe%2FIwXYl%2FHqy7i5idjlo21hMqpGPuH2n6bWNW%2FGBdaZQWvkZxjpAx1lx6BPdoXlXxl5zeAQOK2pgGXJhQF46Q2Vd5M4JxBP4IdvhAdZQo3bKw0KRMjirQ9q2H4d9%2Bhi6CCq7Qp29B4DsLOvQOz5mkmjjPJQq%2BeyaGKA432WWEt%2BhLRrkhdp7zL6pq%2Fh%2BCX8gIDgaftoZyYvrpmWjR5puKBNU3SWMHOdzKVSHFHtIuPf5iG11aLQ9dNb4nRbPWPgwNOXhKqeq85KaTF1rdmySx7fG7gRYhyVL%2BWPQNlAUhOIQ5fqkyjcyc44bpnO%2B5AFB6XaIiEKmAZqsIS7YMgu32U1OR%2FQC2Hw1ZkAFn1DOlYkGF%2FgCdWx50kJWUKPOhGTw%2BFvpOCfYl%2FXHO2l9bIRGZcTjjlgu1zIVrW0azjwEwhEEBFGy8dDKgvr3rCB9uYe8S2EKtEuJ91DF4U7iYHpE37P82%2BkbpAmkwcjFo%2F0AfowgYLqzQY6pgGQORdA0FYKZOCig3BRg2pwzpsnEr31QHlwpFYXcQeTwM%2BwyDSKDKkfIjWsigPlQxZFnvHQn1%2BCe4UyCUH%2FYAPgg8i9ZVGR5anv6ZFDvt1gHJTwYLzBLLPH80Qj30S%2FFw3eWNTDAyLUn5mAHFeWU%2FdW6jPI3%2FZweEmIEhNQ1K5WDZeRV2pfJInX5qwMto%2BT1S4flywjejNQOL3rWzLOUGBCW35v0rAD&X-Amz-Signature=f1caba1e2f5858e8973ab3ec577e303d341bba454893f870690b280649e5679a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663D2QLP4U%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIEj4NMxFMOpSE9ywk2cy1AgmlD7oDTsdigeLiBKN4ISuAiBvaJQaid51QyFZnnIvuiUL21uO9bNodFu63xguQqX%2BCir%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMwtxoAuBDE0p7d2m0KtwDw9xr6uOXP4%2BUDqsHfKOKqFLVXbBL%2BPz8QgCOC%2B2j2JYeRbAx%2BrtOcwfCIZbv%2BmjDk4EVJaECed%2BdQbFIL5XAI4eZsmO%2FsPZGg5mr9JBrTLLdjMTq1Jxlj4AQGrbAjRHARgy4hLvDaSAXUEHNdKe%2FIwXYl%2FHqy7i5idjlo21hMqpGPuH2n6bWNW%2FGBdaZQWvkZxjpAx1lx6BPdoXlXxl5zeAQOK2pgGXJhQF46Q2Vd5M4JxBP4IdvhAdZQo3bKw0KRMjirQ9q2H4d9%2Bhi6CCq7Qp29B4DsLOvQOz5mkmjjPJQq%2BeyaGKA432WWEt%2BhLRrkhdp7zL6pq%2Fh%2BCX8gIDgaftoZyYvrpmWjR5puKBNU3SWMHOdzKVSHFHtIuPf5iG11aLQ9dNb4nRbPWPgwNOXhKqeq85KaTF1rdmySx7fG7gRYhyVL%2BWPQNlAUhOIQ5fqkyjcyc44bpnO%2B5AFB6XaIiEKmAZqsIS7YMgu32U1OR%2FQC2Hw1ZkAFn1DOlYkGF%2FgCdWx50kJWUKPOhGTw%2BFvpOCfYl%2FXHO2l9bIRGZcTjjlgu1zIVrW0azjwEwhEEBFGy8dDKgvr3rCB9uYe8S2EKtEuJ91DF4U7iYHpE37P82%2BkbpAmkwcjFo%2F0AfowgYLqzQY6pgGQORdA0FYKZOCig3BRg2pwzpsnEr31QHlwpFYXcQeTwM%2BwyDSKDKkfIjWsigPlQxZFnvHQn1%2BCe4UyCUH%2FYAPgg8i9ZVGR5anv6ZFDvt1gHJTwYLzBLLPH80Qj30S%2FFw3eWNTDAyLUn5mAHFeWU%2FdW6jPI3%2FZweEmIEhNQ1K5WDZeRV2pfJInX5qwMto%2BT1S4flywjejNQOL3rWzLOUGBCW35v0rAD&X-Amz-Signature=33a022a25bdcc2685d341ab378e2beec2712e3d3e7b2df3a0a1edb58a0268752&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZTQVY5Y%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDp%2BuBBoa6AthddKT7kOyKCP%2BmzBrebFaG0qDx9uFBC6wIgKA1AB%2Bu2Jtv52q3Rvh9LLecrifXqL%2F8fOsIvylbH9FIq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDEgTazR%2FvdL8mon4ryrcA5zJu7kzI5bNjRPUjPng3davB2B58O60S8w8hEz6CiquWEpeD5c9n3tacP1hYVkEeA72tpGmcArh3mRpAKuMeSuao8r3kd41ApinHp2bA6md%2F4iu2z5lwX7dWCY%2F9KSDEjARtVBEGFaqXf5WImkbBluHqDKiCRGzwMDPX1of72A4bu05qDBARIUS7SghWFRNc2XBiftHBHfIhJca6T4OFc5GKEXL7qKD45W0Q3a1%2BL73kGP3BZch0Zt%2FS4KdB67YTFe9CXjIFQQ%2Bk3kQNZh14VMu0g2Z9aGCRnnPVkPPetV6Nyj8d%2F273uq%2BaB4YZ%2FgYKeshXLJvDN%2Fy67VJ%2BdA0py8gzzxyIj%2FNzdWzRUUBwLa%2B5kDYG2xqJjHdlx3%2FF6s36XFMYr%2Biy0cUaxN59bQi3BKZ6a26nl13s60Lxmuz7958fN%2BLDlqtXxEENoDcBTKSoF%2Fn5NbSH5SRDrdCs0H%2BhkFnbR6DyoJUUOC%2FlPZyBVoA6ZwrVTt7Ne1K7%2Fnpa%2FaqzHza5dt6%2FeI6HK16jRvp3k%2FDN%2B96BdnKYH%2BnW2lWYtdfZ02NpmEnTRiRy1XEPi6TBT%2FmpacDfVnQ%2FUFdepBnFX34%2BboHkY12Wy%2BXcGezoUvSDVedvYunQd2Ms8bbMPyB6s0GOqUBDpk7FSv9yUzjhdsvF9Em%2FXDh0fbef4wMSTTQF0XaNL0SBhPKDOVIJuHDRuXWw16RVWjvO6GTKRv6nMaRG7YUB0jFr%2BixyDQME5R8%2Buk2pi2rZri%2BxMWc7jFEemnPau%2F1c07%2FZbu5CUYBMp7ljDX06KrluTdBtBiVsFyIn%2FO2TUGGcdxeMIjc3vzarKbr1G0zmYF2dGxJnSBGunFSf3t3cDhrus7u&X-Amz-Signature=9862bd4a29903bda7aa6f018a4e8c579acc6651c238e8020b9dc2b38ea21e174&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHSF673M%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCICzGHK%2B5ev1havwCfWW18IxckXACnyFN0D9aBaCaApoGAiBuHGDi4LHckh9dgNKuLfrSF%2ByVRTlkf07OUH4k5xi%2FMyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMLlAkasSLYld7OXYUKtwD9qYnPRgj2twj1Z5HElxUdFf3%2BqVYv%2FmEMX45brzUSSctkxYke0pzcROY7EVgwDxT4odGTQUszBVVuEJ8qnRqXFoZPfWLrIsBNg9%2BoknsZAJmxdSp%2BT8C%2BnUwc9Ieobo%2FOK%2B0wIT7nizuRBUwQJp58GBGywAtmTX5RllZPTNhRC31Feo4b6NopGv6xskSNkEgSp9IC4MC3bS1h5ZhaqHfbBxK4Hdoz7Xe6IHVOqLgUKEtyzbM1oWFJ2uI9jjzUUhm3G35ezi3ImdIRtV%2BwxnCvNvnDRqpZYz0rl9UGiHxrtHigD%2B8gOci21vH7UrprVUjrHkjFYJ9CokaIY4LJUZ%2FgbLl%2BNtnJhjzx8H9kjICvO5fR0PLQfrI8HAd7pI0T6HCHH6cA5F9bx6fTxrvRVkseNN5sbOXGRdHiygHyt7ntbBXM1GIar%2FGLqnzAh8oAnNUe%2Fmscyz%2FSBjdBrfgq%2BTNAJIoEi3Q0A16x9gsjcuXAAKa41nr%2BInmV2LKXSyUgIBGlFfeemileqhksewemc0X16TBHfqS7nmNXQQ4wBp7hoRCS%2B7wR4%2BkKVW9WjlBo%2FbY8XqidqlWsJTHvV3qp0pbFaISqf3Eq1SIxTK%2FbBI1oJ0b85BBIs%2Bnvo4myq0w04HqzQY6pgGjW2beGbTgMkNPSw1yWy5ZDklMr4zsLyZ3VKT0Fd%2FE5cRTMCMrk%2B210Z6ZYSmjpaFQEkKR22dMzV5fnRZKs3SNiGPt522Trzk5jpPzyL3haKZZD3oSZk8ke7R7PVdlHRBCF6E1gWHuv%2BQOec%2BOTgm7G2OE%2BzusqOeJBDy8dvsMg3sHcdsR8O1nFM72xEIXagN1vjX2MPwNzpTtNg6xdb%2FhvbAZOrMC&X-Amz-Signature=abc1f61c79b6ca79b2684346897f42d5ac56b9c5c0f5d86df515b4541ad0267b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHSF673M%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCICzGHK%2B5ev1havwCfWW18IxckXACnyFN0D9aBaCaApoGAiBuHGDi4LHckh9dgNKuLfrSF%2ByVRTlkf07OUH4k5xi%2FMyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMLlAkasSLYld7OXYUKtwD9qYnPRgj2twj1Z5HElxUdFf3%2BqVYv%2FmEMX45brzUSSctkxYke0pzcROY7EVgwDxT4odGTQUszBVVuEJ8qnRqXFoZPfWLrIsBNg9%2BoknsZAJmxdSp%2BT8C%2BnUwc9Ieobo%2FOK%2B0wIT7nizuRBUwQJp58GBGywAtmTX5RllZPTNhRC31Feo4b6NopGv6xskSNkEgSp9IC4MC3bS1h5ZhaqHfbBxK4Hdoz7Xe6IHVOqLgUKEtyzbM1oWFJ2uI9jjzUUhm3G35ezi3ImdIRtV%2BwxnCvNvnDRqpZYz0rl9UGiHxrtHigD%2B8gOci21vH7UrprVUjrHkjFYJ9CokaIY4LJUZ%2FgbLl%2BNtnJhjzx8H9kjICvO5fR0PLQfrI8HAd7pI0T6HCHH6cA5F9bx6fTxrvRVkseNN5sbOXGRdHiygHyt7ntbBXM1GIar%2FGLqnzAh8oAnNUe%2Fmscyz%2FSBjdBrfgq%2BTNAJIoEi3Q0A16x9gsjcuXAAKa41nr%2BInmV2LKXSyUgIBGlFfeemileqhksewemc0X16TBHfqS7nmNXQQ4wBp7hoRCS%2B7wR4%2BkKVW9WjlBo%2FbY8XqidqlWsJTHvV3qp0pbFaISqf3Eq1SIxTK%2FbBI1oJ0b85BBIs%2Bnvo4myq0w04HqzQY6pgGjW2beGbTgMkNPSw1yWy5ZDklMr4zsLyZ3VKT0Fd%2FE5cRTMCMrk%2B210Z6ZYSmjpaFQEkKR22dMzV5fnRZKs3SNiGPt522Trzk5jpPzyL3haKZZD3oSZk8ke7R7PVdlHRBCF6E1gWHuv%2BQOec%2BOTgm7G2OE%2BzusqOeJBDy8dvsMg3sHcdsR8O1nFM72xEIXagN1vjX2MPwNzpTtNg6xdb%2FhvbAZOrMC&X-Amz-Signature=abc1f61c79b6ca79b2684346897f42d5ac56b9c5c0f5d86df515b4541ad0267b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRMJ6Q4X%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T113455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQC32%2FqHOMT%2F4t4EgPnvrdmWFWOuKtBFtBm4CuDrFVJcYQIhAOrOPbq9%2FiISe7Epcs08aR2fZcCXW5ky5zHl5lDSI7PtKv8DCAQQABoMNjM3NDIzMTgzODA1IgzQlMaiVBc9YuvaORgq3AOGNQev1qAWoNhTTF5Ox6dMfStAdJ7ZJjQpN0Fbv6L0CvD6gSP1M0jgAhtHvSv5Y45rL1hln%2BOrZpjp9gDixQw6cPRxS4kQJ4d%2FETZsObGY%2Bxer%2BaCYzNfazjMgS7Q4fyVdahtb5q%2Fk6qZizLsWkOlo4BHOe76NI7gzU8IvMI4oBfy8fkatoQgwxiyiw1PgZr%2BMzH19NDckYiPj7qFAzGVnT5MumndZCAlYZ6I%2Bt9YkfTGQamFrb3LUfyR8Qd6FMKj7bFBL4QKuUSSZzovNyAB36NLBsSlAfHzm3nwIrAv%2BqPk7Sokvwyo7z3lfEPuhjX4l%2BDlbqQrWd%2Bd23kCXcETf49zE50lBtvOB94AxyrHYJfvBtP9nF14Y9K5kFda%2FM54iZikDj1B6sBd3qexknm5FvuYGl0GKd7iSJI6rE74YSY%2FlK95qbDhVka3nfPJ%2BkhJl5YECECK5TvkGq6ZsYELSppU%2B0UlWwjxi49X8vwfGIveChi81W56vbk1QbVdvUY1sri4qG4sAYfW7Z4GbEkSdFJ4pRXvRpz8igDl54agzjFDaS5ssxjod38QekJnWYiHvMGtOU5Rpti2Qf6UBIRLEUSdi4BItJJNkg1ZQp7gF2jBFR%2Bmz6sKkyDxX%2BTCugurNBjqkAbNOWn689fROzk6JcJKeuvHy7YxLjUGt92yd3%2F7pbbkFTuq5xvfyGwSI7EjVYJTgLrxc5hG0ALEhWJJa32LNFBBPhMmnfVrSVN3zO3Cjk2SDFT4oFPSTJN8hBe43euE0mr4a2J6QVTd2l9VfTXC9sf9w5a%2BhP4EmWY7S9%2Fmr%2F5rF2zXZgxaWa4NgenwXSy11LAUFzJkeXNO3J5NJA4DpGdd1wZhM&X-Amz-Signature=c6c4ae3f4efb1fec7d8d159e0e684970b66f7afb24bb182eaefa89e5b73ac23c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

