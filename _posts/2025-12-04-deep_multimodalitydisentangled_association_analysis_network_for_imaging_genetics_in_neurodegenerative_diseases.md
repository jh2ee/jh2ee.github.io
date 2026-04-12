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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PPQXQ5G%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCga%2Fl0dk2ZiRibCCcVE4ctkr76HtP9xsdFutSNiQ8b1gIhAP9od3100pIDsKabrTXRnp00%2B8bTt8DzMGui8aNZR10vKv8DCFcQABoMNjM3NDIzMTgzODA1IgxTqpOkzuFclgXaUL4q3APWNQAko6OfUPPDmWm%2FnxR3qGGIRPL7MOtdfoqeuOJ3gweUPieNIauo4zEU2t6fvQosuXKaq5BCcknFosDyOG7yBrHRxIkZlrzsvIOsew86ZkV2K32IXZ8ohgfV90Aw4iSVAPw45wLIv1Oo6qUjG%2Bx2AxFW7m1nBcQvaRw%2FsgqHfHq6gjKs3HLxDgT6r%2BXnhr6jtJwR5NqwGOa4P7NLDmAfgSMYbhcKF2VQJyR5W9dUvmWKR6bCUSuubFsQynseB4ymkAdkM6Y%2Fp0lzyXbWWL2%2FhfaAC8G%2FXJ%2FY9gegazlXKEPCscjcgpXZ4PNFZhtzPHKkO%2Bhxxx0I%2B81PDkfGY%2F9KekEJl73dokyudAph9zKFUSjnQtn6aYLobVj%2BhZV6FJrVjRhhbsYC7TEpUqvJfxKDcuEjYupQz436MOJiKQTJe1CNV8Fdll4OJAD%2Bxmg3Ud74JIDCrigWFx%2BtARH5Kqo3%2B8oDR%2FbyV%2BskP%2BVrrdcyHrsWS7leNVZbfjHIcI9BKK2w8aUv9LEV2n0A3F3UVmOLQqw8W7UXt7m3PzTzsPHimCKzJB93tJz5WpWXy32isTNamb6w7j%2Frm7YVoYdhOVp%2B2mKhqW3GfQ4LXfTVHqDRP7DoKFoe3HplQnRZzTDL2%2BzOBjqkASAur9T1fOLygYRHDM03hQj1S87VqpUCsPNmEgN%2BvlFkiEqKDWAje8h3XD907vatGUMNB%2FgtOq0LrIzuvsScLMoNSAbFjlmdG3hwLPmIZm023wVG2XGR%2FoKnyul23EKTHAGz%2Fnf6InkKiKLROq3tMfP96NyuvQlAtfkEG%2Bv5jywIFGNq0xsi2H%2BeNxcudS6KM6icIzdVl7tUjYP3EN9unuk3ls27&X-Amz-Signature=5b83b83c89b4ae2b8d2e8b8b849d4144c4136b51c363ac2d4b8415cd9c1248dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PPQXQ5G%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCga%2Fl0dk2ZiRibCCcVE4ctkr76HtP9xsdFutSNiQ8b1gIhAP9od3100pIDsKabrTXRnp00%2B8bTt8DzMGui8aNZR10vKv8DCFcQABoMNjM3NDIzMTgzODA1IgxTqpOkzuFclgXaUL4q3APWNQAko6OfUPPDmWm%2FnxR3qGGIRPL7MOtdfoqeuOJ3gweUPieNIauo4zEU2t6fvQosuXKaq5BCcknFosDyOG7yBrHRxIkZlrzsvIOsew86ZkV2K32IXZ8ohgfV90Aw4iSVAPw45wLIv1Oo6qUjG%2Bx2AxFW7m1nBcQvaRw%2FsgqHfHq6gjKs3HLxDgT6r%2BXnhr6jtJwR5NqwGOa4P7NLDmAfgSMYbhcKF2VQJyR5W9dUvmWKR6bCUSuubFsQynseB4ymkAdkM6Y%2Fp0lzyXbWWL2%2FhfaAC8G%2FXJ%2FY9gegazlXKEPCscjcgpXZ4PNFZhtzPHKkO%2Bhxxx0I%2B81PDkfGY%2F9KekEJl73dokyudAph9zKFUSjnQtn6aYLobVj%2BhZV6FJrVjRhhbsYC7TEpUqvJfxKDcuEjYupQz436MOJiKQTJe1CNV8Fdll4OJAD%2Bxmg3Ud74JIDCrigWFx%2BtARH5Kqo3%2B8oDR%2FbyV%2BskP%2BVrrdcyHrsWS7leNVZbfjHIcI9BKK2w8aUv9LEV2n0A3F3UVmOLQqw8W7UXt7m3PzTzsPHimCKzJB93tJz5WpWXy32isTNamb6w7j%2Frm7YVoYdhOVp%2B2mKhqW3GfQ4LXfTVHqDRP7DoKFoe3HplQnRZzTDL2%2BzOBjqkASAur9T1fOLygYRHDM03hQj1S87VqpUCsPNmEgN%2BvlFkiEqKDWAje8h3XD907vatGUMNB%2FgtOq0LrIzuvsScLMoNSAbFjlmdG3hwLPmIZm023wVG2XGR%2FoKnyul23EKTHAGz%2Fnf6InkKiKLROq3tMfP96NyuvQlAtfkEG%2Bv5jywIFGNq0xsi2H%2BeNxcudS6KM6icIzdVl7tUjYP3EN9unuk3ls27&X-Amz-Signature=5b83b83c89b4ae2b8d2e8b8b849d4144c4136b51c363ac2d4b8415cd9c1248dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4IBVYLQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA1irbOjXF7jTuYd8%2F7lvo8Ndw3abpXA59YnQ%2FGj33NGAiBEsV8dD8Ff1eP4b%2BAplQ1OQc2MDZya4Q%2ByWAUVvyhp%2BSr%2FAwhXEAAaDDYzNzQyMzE4MzgwNSIMYLFXZ1nS2VNlc4lWKtwD6vsg%2B7s0fbQrOcCxIJbNDRs1%2BWAUmmWOwJDfuykTG7NDjUvQq%2FkNDQn46NpdNLDee0WYwAH26On4nUAbSQ0UU1j1Q0S8sK0mI1rxENFlMPfO0HhksvJMxVfJ4CSwUGLaqCVHWB%2BVOn0yAah2ofmrSqExCULTTMokju7diR3N4ZQI%2BfB7zmrIHSp55IpZOocNjizBViJV6M3n1BsK%2BAMNngh6K6dDdeBsomzuSTC0o7v1eH01db80nu8VqB8QqvHIIiOfFe62uMalEwG5%2B%2BfbxEIbwKqZWKuwfhjM5qlDtHnfV5G691QXcT2NwntXb79Uy5WPiOSaaOrbA3LUF9kCWyJtWhGsrmzw7QVGuajSE7%2FuNPaFeX%2FigQjPKgKhxl%2BhZY%2FFeTaqmyhlOWwKLu4m8qlXCV8eHs9lvjdu3sASRt%2BgaTLhG%2BUo63SNJAMubagVsEVj3t5zAyb925HNDdvp9a%2B3funzcUqQsLDV8BV%2F1glvnxXljLIQ2ro81XHyq4zUvSNeb6ZWc9AkK%2BF8FKNgKlgFmmZAR7AaUvmcksQwcD0y2zmwUz9rgL6GyvWnjSoI5%2FQHg8n9G7SDihDBCWYNJ7mOzT6PRW2KWByjE92OJ5vshi4iSYYcSFFlmk8wzNvszgY6pgEvlhhYRCKbYJnbdMvqs9p9991c%2Bc5gGAAyBuwTWJqJ59t44ONg%2BbgI4llKtmotksJsYNaRsYE2G9U389tb16obBMpeQrRZUuLB1Vd3f6KPioUIzCMdlZczpSSHDf4xjEbUlffoaZgp4JxjeBidGXfT6oPxK4CKZmDTWC4GpgzEzUfEVELnXPwv2JNrOipm%2FsLgFUf4GzRJNauQGmxMGDosMCIghl7%2B&X-Amz-Signature=c868dc19a03afa6154317eb05fa58f278196cced42836c00abeeef0296157d94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW5S6VHO%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICe8QPEorUhx9fMPHCMxbRaTVyLG67UamRqDxAXJ04ZdAiEAyURyx5rPEisoGZF4qqAWbKoPVnNHq41gC%2B1abz9VlWwq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDMHAzyWbtme1HZTXhyrcAw%2B8ElIiimWCs4nrkNcJyyeMjVhex7vD4AmSpY4OEPMKlvpPNrSHmgeelvm3kNFBpAQCXfRNk1sQ6PtQdqoWpTNyEZ9QoAxvsZHYvomnW0rngns%2FcthZbT2ow1H2Bds3tbpLZRwiUkq38rJid%2FIAXamG4lORLsgF%2FWVfUueKCcNvztRRZ%2F64YLWjRIpGxrj2yxWXPtLePDjXZha791FyVHM0PJWs3j8RnnjOWh9KXde0Gm9JcrmW90T4Cdgkl0TTipnKCM2q9T34ss%2Bmt3KvhISUQGJ866L3uKl1uU0%2FcDa8hf%2FpZFUwl1WI1wAqBLMXqyrlf0ZJB9yQOMUmLJBiAEZxWaA2Y6xaiOYjyKbjbkBYrcc2kgIz%2FwFKmTbw1v2oW3ojjUvqmjB6buIglDsTnSZxsVQ0rd0Z4DhstmGQPUpy4rTbc67BsoiVbksNIMOuHLi5L9cW%2Fe7suruDt%2BZIKjbcaXYAq975JVfC34n9fwlkPpFtRLh1R7J6P67ImgpM1zslizxiXA3jFkbA1w3RIBngPbk1iAz5iZ0B3q0Ix18YTyNuwzEUvgFj%2BHCdcPe57%2B2OijMq9dEBETm6Dz%2Brd1mOcgT56hJqpmoWsaXQ8NQ%2FV19FkpFG7DrsW4M4MPD77c4GOqUB59RxVcrLsbiIAl5kzOf32Tlw1z8U7%2F6reNiWNNnoVK65vnnUbMCrKZ7vKDp9zts10BdDwXD3SOH9wEhGtdEYTF0hlQIao9d0wpg759ZTg2RG7VK%2FDPK76V5U9NIw3jtaajKEvS5X5KOSM35HGvIJxqoe%2BM79ySz6OQDHfF5AODi1cq0QB67bdwoCWyfHjfWTl5phbXaOv5XQJHPwXYU1U92bVpoq&X-Amz-Signature=7ce36147156acb1a56be7b9acd58fa7bf9c0c754abad5b3b0428cbe75295e90c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW5S6VHO%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICe8QPEorUhx9fMPHCMxbRaTVyLG67UamRqDxAXJ04ZdAiEAyURyx5rPEisoGZF4qqAWbKoPVnNHq41gC%2B1abz9VlWwq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDMHAzyWbtme1HZTXhyrcAw%2B8ElIiimWCs4nrkNcJyyeMjVhex7vD4AmSpY4OEPMKlvpPNrSHmgeelvm3kNFBpAQCXfRNk1sQ6PtQdqoWpTNyEZ9QoAxvsZHYvomnW0rngns%2FcthZbT2ow1H2Bds3tbpLZRwiUkq38rJid%2FIAXamG4lORLsgF%2FWVfUueKCcNvztRRZ%2F64YLWjRIpGxrj2yxWXPtLePDjXZha791FyVHM0PJWs3j8RnnjOWh9KXde0Gm9JcrmW90T4Cdgkl0TTipnKCM2q9T34ss%2Bmt3KvhISUQGJ866L3uKl1uU0%2FcDa8hf%2FpZFUwl1WI1wAqBLMXqyrlf0ZJB9yQOMUmLJBiAEZxWaA2Y6xaiOYjyKbjbkBYrcc2kgIz%2FwFKmTbw1v2oW3ojjUvqmjB6buIglDsTnSZxsVQ0rd0Z4DhstmGQPUpy4rTbc67BsoiVbksNIMOuHLi5L9cW%2Fe7suruDt%2BZIKjbcaXYAq975JVfC34n9fwlkPpFtRLh1R7J6P67ImgpM1zslizxiXA3jFkbA1w3RIBngPbk1iAz5iZ0B3q0Ix18YTyNuwzEUvgFj%2BHCdcPe57%2B2OijMq9dEBETm6Dz%2Brd1mOcgT56hJqpmoWsaXQ8NQ%2FV19FkpFG7DrsW4M4MPD77c4GOqUB59RxVcrLsbiIAl5kzOf32Tlw1z8U7%2F6reNiWNNnoVK65vnnUbMCrKZ7vKDp9zts10BdDwXD3SOH9wEhGtdEYTF0hlQIao9d0wpg759ZTg2RG7VK%2FDPK76V5U9NIw3jtaajKEvS5X5KOSM35HGvIJxqoe%2BM79ySz6OQDHfF5AODi1cq0QB67bdwoCWyfHjfWTl5phbXaOv5XQJHPwXYU1U92bVpoq&X-Amz-Signature=7d54435a81f5f79d1f04b94403e7cc3e9db1fa25b71b23e9bc2ecb6f22a6f852&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5BNGFWP%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFDCe7g%2FgvQcOsLJMyAv%2BDSeJySceEmoG72SDqCilmAQAiEA%2FaFafzkAiKW5sreROfH1%2F7uRLmg9rEyCuYFsnouKAF4q%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDA7LJO1PIu73LZg4UircAyt2iNTFyqJxrDKQUGfgAV0SOGyVLlF0CDNPp9XtjkI6fjEa0UyWQjftd2jsjy%2BAehC5FC%2F3AcQHAnyw7zR4PDFQI01guI6lnRwZIGKv576YNTQNw4k6pZkOdT42X%2BqvCP3WDSElk6jX5aadW0PUDCeegq2t32B513G358yU7O3mRKTaW3cgiQEIJwpRIAaU0HmiyUG8%2B7yF%2BZXFqxyOmB5ADotuQQ5JQcXEcZc6RK9HNLI3YyDh%2B%2FvruzIvW%2FuEeGS%2FsA82027CHbdjyKjLS6dkfHRLh6NywqbvUvfSv6OuxneGx%2B6SCImYxaeHV%2BCDu0Rl1FQsH7VDJ54AAs25MojuHn8iAuGShGyrYo64HZY9CMmArXwNkSL7%2FHx96YMXKB2b55%2FaL3GlyfX6o4yV6zHWXhmpeF8ufnoLzSbK2yLMwgYOdfEo54eoUprjdBMdOJbLsRbkZR%2Bvpg2W0SxVeovmkubDv4s%2BHMQ5ycm37w%2BkWeDqeXcgBwRPI%2BGD%2BkV8aUH7nLZrMZ1k%2FLiNYv8YYyAY3KKTQgLXqUdSyp%2B54UQdcPnvLGJqOy6L2ewR4dar7bQ7fvDRMXV399zQkRlKLE6LLSmqCZ2cHnI3DGEHxkrUvyXEZXlWWcn%2B3Ao4MIXb7M4GOqUBAafgv9GlZWzpTLDIySJ37Jk4k2UXaw2%2FcbkLpUGE8V2T%2BlcDa1v0la9DLFoCPk5EbbUGKElLFfHNV9ycabG4%2B%2F9gXuo98xnEM30Fcwk6NjOxsQ6dTnAlLnx10tmoVkzbrWuyP1P6Qd30Nax9zg%2BinARg%2BIO6P%2Bi41mWQFgYEHyUAxrIBiyHxvvnvbO15XfIknQhhQ%2BizD%2Bk7s1QqDRLoarbw5aR8&X-Amz-Signature=b9a5239f13af9f6b1fe14a49152f84c481579ee442544d0678426873bee8c16b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667HWWPZZ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCuKooIcAYN%2BMPkNCNmsFa%2BK9DJtMryWvxAzGNS1G8%2F8QIgK8RvFQ6f61EekgpNeV7CktfKXOFfK0C0kVAkoR5cvL0q%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDCOzc1R6VhJAttcO9ircA7vC3Fe6I2mEnq1LgeoJECsFULIt9XDb5MyAwu%2FGWRpQl1F2yTMF2%2BD6smKgwKYzBV%2FJngORlcCNpbVWRvw%2Flx6nd0JgQ0%2Bcs%2BbP99ke8qXr%2FGmpteU7eYcXpqE50ESqYWkOoO198BQ3mDRAbEkLIjtpqKRC9M1Vyg9UDj4fek0VU4%2FcrYhwwy2cOBG6ktUdmQrA%2BWCPW2Y1i8RQKbgI0aoMuYxddVkispxvn79A%2B08zbeIE7Ojq%2B%2FqxdJL0s36qr%2FRIj4JwSaV41i8fscNM2o0RB8Lq8dCk1H7yvSbgOTtM5Y3mlnIVYRFe6hOUUIeR8YW17b3MF3gyvOq8YD6ZzYIJGVzekYjnhj0lsfU%2BDtPHNFVdRoPOKCGk4U9llo4ZBv3wkhLfmZQUq9jim7jOfgj1sBBES0egupB4lGKokxB%2Bz4O8p3ELxuSKm%2F6ZFuHFpdE%2Fhy3%2F86MB1g7XCwMwIU8zj6dV0prjFRSqmnotNCnZ%2BJmYuNy1L9dSptPw6tt6hoOSTtWidpEVQczc2AkgcRZBvwQKtfmd5Bx99q%2BtUE2rOqrc2dEBnodHbqBL8KR8prUyQjQRERNGu9ioC%2Bw10lwG2Z7BPvOKvtu14goIZqpBGmgC3G89JEDnkpaCMOb97c4GOqUBszVsJ1Ncjn20EKzIsexHg1sC2ZaGw4NNPNyyTCySE2HWeGx6ifkTuif%2Fag%2FkIdiuRXbiF9XrpNLNP8LbsXAfPohyaCY2YfeY2sQzHK5pEywwaJ%2F8U5Kc3srwrCc2RAYXgwSc%2F%2Fqj2%2BZ39raHjbmwR%2Ft0sBxXbbaB%2Bd5goVgKqU12Y0IychHDFVmApc%2BNECiQBaslWcYQ9BalJ9oWNeHGR0d6OmbV&X-Amz-Signature=cff48ba0e3054f630c4f4553629b293a4b0809b02573b0ddb7609732386105ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V34UOE54%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBfpFbVG77izIpselTkfrvK%2BuT1ZPerdJihp3dtWr5xFAiAzF7nXn%2Fr4sUHkI2eAos3eTCuiO5psL2gD%2BcyEcloc0ir%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMYdNkDn%2BGEb74JZkVKtwDmk7oQS9mDOT%2FpMFpMewNDWk8zf4BJPzaCZn0OgyLbENKapeEl9lemEZSUlJ4iSUSt1WEIcFmf1LVL%2FBPjpTDKZa%2BmaaiH7VC3l4uobyfUpyE68ENKzBa1wOXiSjldNvdKzDYi5UKDAAfsmdzysc5AaMO8Qs8IpxOeyH2JFGcVJraM5qJfv5Ust850WNHOCtXZ7%2BY8BK2Z9qU%2B65vOUWaY7uxwhvZoUIn%2FxjnrjgPHqmkcg5PjsomPQQ3OmpASjnTeR0yZKNV7PxB1bIK7FJ%2FXYEVjk0EweVeBTgNNUaILwIBHCti9K36lhRfj8QRMV%2BtQGv7wDZ%2BWsSboCDqQassyS6r%2FKWkMISj24B5iHq%2BfjbiiCYfHWlcEMzeewJw4WuVqTs9cEkX7tSpIU0itUuKlDCfNomST5TDtW31FgrF2OxNFQQFXa3pcRCztPEiM8Cppin82CEZKwprMlHgeK%2BSOHgtY%2FM0EJcUQ2gWdD2NINwqNr9FxIh2iUNTTxzTNwqlHNWaSy9%2Bo2wi5vxe2fTx1FTFMLd%2FmdElJeCK%2BCII15%2FxVPHNVEcxVo3c7ux2bu7ZtT5JEMwGkuY1WpHihY7XI8Bij%2F8xZsIHJ239plMBOgFINpqj8CWGMoFCD5ow1drtzgY6pgGxuRnJEj%2F0cfGzC18z%2BPkX5QOfswsI9g8FVQAyrTzGmbblpklz%2FETJ80pDjyP1eCMyxrbC38TWXnkPMVSwe6aeonHEK5IzFPcWDbT2sEGCf8uG8dzP79QnFQLXrH6JErM1uSxjwIt5QDeTe%2Ftf%2F0GHVGCF32NtvOsdt%2Ba5IW%2BmGiIscudxLo3uC5jIAWpQt66hrt4WQAsuAprDWGOIA7OyX2d1AIOu&X-Amz-Signature=50f6f64b66c8bd92bc7217b14504725af2bc07a8c832f9bc0c5bd54e64dc3f9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662F5QHKK7%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCefRNn%2BcCApk7gZDOKRT7L49kpZlfcxgIjEqS%2FlsO0iQIhAIUugdr3qwp2FxY69EXsyKORNcpyFMtKmD0KVY%2FHNfaCKv8DCFwQABoMNjM3NDIzMTgzODA1IgwBuQlaaP7cFGr%2FGG0q3AN2Ih5klS08ejJXUdyl7oUsfmTErllS5ZlYGnLexN3JntJAKYt8132I4wVleAWZ26TreFNtNsCwMvYg6G7H%2BGA2RYgOIGwuTNR0Uh1RrXMYt%2Fnup9dqT%2BP%2F%2F8m%2B6drde8uixjeOR%2BwZgR%2FZymjp7wwyQ%2FOSx7d9OPw9y1UT00ixym8p9z0RK3aCT%2BNUnd%2FfNUVbljPQhm2kb06Y3I8ryY%2BiFzaQVB7cD%2FCZBh9SnQpmJsoHTMhFFUoOgQPE5fe1Fc02PLJuGTUUNFzLwTdS95rS2qHK%2FrYo2DDP4l7qTRdpiE4acA8kg0oqFgxuw%2BBwSCkWGSfyRYtXoZtXTykN9HdZA01QifQwZUwJteTUo%2FfkqirC1R2VG33%2Fhg2%2B3mr3aXHox9Us9vf3GGj3XjWeh72HokWi7BXV6B2jOLl1v%2F5GzXVYJ3m9TW1rSaaSt3WPp8Y46sBGAuQLzwrqSqCW9qcW4%2Ft2We%2FX%2F9Q8x4sMlIqBkYlxLiyoIq64kIleMGebiBDgb8OhHdKppZ5ah02w1zmYaxGb5KQvOfmIMjV6NhO6KKhzaGkSPnDPNWs6vRcJdvKyy1HdEAcMpmxGzsckGbRoX%2BrBN9DqKUlelVFjvLcY2ayAzCrtm2RS55wCqzDp9%2B3OBjqkAW9AQx7%2FcRsCuYE2Pc2fDpcHPtfeqD%2BEqBWRZKDVTt7QB5vktlpdoeGGelBQDBJxITZvroCo5zjjDntXMEMT56ffwT4rCKpOjcOubgbjhWQ0dkY0w2lnTueZQeJSe%2B5WI0ZsJ9oCj7%2FZt1D%2Bul%2FDgHLQBstN4JQ8lhENr%2FjfSOcDO4ur58tnX6XGOyccpYRM8%2FZz3Y%2FqI4faOnxP%2FX7y4KPVp9lP&X-Amz-Signature=6624a60f813c69a811e37a4941fb7774c1c29625a762fe41f86c508abfe8e529&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662F5QHKK7%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCefRNn%2BcCApk7gZDOKRT7L49kpZlfcxgIjEqS%2FlsO0iQIhAIUugdr3qwp2FxY69EXsyKORNcpyFMtKmD0KVY%2FHNfaCKv8DCFwQABoMNjM3NDIzMTgzODA1IgwBuQlaaP7cFGr%2FGG0q3AN2Ih5klS08ejJXUdyl7oUsfmTErllS5ZlYGnLexN3JntJAKYt8132I4wVleAWZ26TreFNtNsCwMvYg6G7H%2BGA2RYgOIGwuTNR0Uh1RrXMYt%2Fnup9dqT%2BP%2F%2F8m%2B6drde8uixjeOR%2BwZgR%2FZymjp7wwyQ%2FOSx7d9OPw9y1UT00ixym8p9z0RK3aCT%2BNUnd%2FfNUVbljPQhm2kb06Y3I8ryY%2BiFzaQVB7cD%2FCZBh9SnQpmJsoHTMhFFUoOgQPE5fe1Fc02PLJuGTUUNFzLwTdS95rS2qHK%2FrYo2DDP4l7qTRdpiE4acA8kg0oqFgxuw%2BBwSCkWGSfyRYtXoZtXTykN9HdZA01QifQwZUwJteTUo%2FfkqirC1R2VG33%2Fhg2%2B3mr3aXHox9Us9vf3GGj3XjWeh72HokWi7BXV6B2jOLl1v%2F5GzXVYJ3m9TW1rSaaSt3WPp8Y46sBGAuQLzwrqSqCW9qcW4%2Ft2We%2FX%2F9Q8x4sMlIqBkYlxLiyoIq64kIleMGebiBDgb8OhHdKppZ5ah02w1zmYaxGb5KQvOfmIMjV6NhO6KKhzaGkSPnDPNWs6vRcJdvKyy1HdEAcMpmxGzsckGbRoX%2BrBN9DqKUlelVFjvLcY2ayAzCrtm2RS55wCqzDp9%2B3OBjqkAW9AQx7%2FcRsCuYE2Pc2fDpcHPtfeqD%2BEqBWRZKDVTt7QB5vktlpdoeGGelBQDBJxITZvroCo5zjjDntXMEMT56ffwT4rCKpOjcOubgbjhWQ0dkY0w2lnTueZQeJSe%2B5WI0ZsJ9oCj7%2FZt1D%2Bul%2FDgHLQBstN4JQ8lhENr%2FjfSOcDO4ur58tnX6XGOyccpYRM8%2FZz3Y%2FqI4faOnxP%2FX7y4KPVp9lP&X-Amz-Signature=d0b586f484e1da0459a982f132d6d5eb623818226bf19096d4c3479e75a142dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466733RUIFH%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBCIrjB5qd0xs%2B3y7j6ilWCHx9o8%2FENfTgs2nIXilASYAiBbHTRuYHKYu1OdsIEmyOUiVPGpyObJ6u0Zt3ZfTpfp2Cr%2FAwhXEAAaDDYzNzQyMzE4MzgwNSIMG9MS%2Flhnl%2BWSr6fuKtwDWIruB5DT2fXIt%2BZZ1eStJFrzawnWL9mb3e%2Fkes4KHgjrQgrvw1zFz4a2ZlTPhgWP0JdhvkwPVkiCrxqoMWOnNMH%2BjhpFIndkoxImQ%2BKAZwHskQWiIsB1dhZkSSr%2BBkMBrKum5zkJs3phLctbTW7JKkZW90xPM3AVG8avDc69fl3Lmb4OVkJOgAjf1hMuxcP7uhRWUi%2BV3P3nS6jFNr9OkxGY82q75o9B%2FzIPMJnXJoctKNXdQAgib3v6EwpCzmH1%2BW%2FAsXHGrI6fHlcKYB7RxNMsZXuRdTuiY2NGyytMKDwzVI%2BeuNQnDiPZf61yhG8NmXzZyRmsyK5brppwhzugzC%2FR3HP6N56eg3mRCNy2j2W1wRbBvcN3tJh93KnETVf1XDgh7qm9sqQZcp8ZFqxtZheGUOM2fc7hT%2BE%2FSKemCN3x07XChvgoV8dncxxoV57c482u8lwsUitwQKnKzGSI8FHMKt2eZ0daMUTlGP0wYQpqGN0KVb3ORmyotrRrOLBcdraz46TzdVCWdgWBBcBh%2F5SvKTZclPJtClWwy2bYFKbhoUbhp7c1rOIvbOedXAYz%2FnYX3arwBVX%2Bm7PfQYCO%2FeZ3jd4dvQkJiRJVM3Wl%2FjoxvIVckny4pRyhkNowstvszgY6pgFCMlZGXeRIsAJbX1e30JJRykIdsHxTfKLwS0%2Fd7Y42fpPda9f4mhc%2BYNxFznlrFlaBpEY3N0kNLCTs23k5gh3LmjFwn2OtLPMMUeDRcD4MqR%2BxBUu%2FZ3xbBupi356uDacikJfnFYNQtn11AQzuM%2BxQmBmt4zveCVWEJlxzbELvJ04beNZ68IjNS0Z7NHC1r2fCi3yFi13Q5%2Fi2Yzk3qp9QCct3Mbvj&X-Amz-Signature=fedc0b95322043936f66601efbf6eb81e42d2ea53e6b0924ec1fd7c62f06736e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665L2YGA7N%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDeZjYtwO8u62kveTdBvrp9bQfbQz4%2BCGYJpDyiABVhiwIhAL36RxtEUL0gGMQjwJpABT1wabmiuubxcZnP7%2FwApx3wKv8DCFwQABoMNjM3NDIzMTgzODA1IgydQX4eMMGvXqx2BAgq3AM6NF%2BdnblTfUKf0oYrCkZMBd9yoQB2LQV5Tyg6cENwIsrOkOqJoLVLs2U2xYX%2Fhan3OAhL3TEBPREY3Arbj50owZEEXY8uC3VZeSs8ilvrf9h4QZFm8QcKYHqqz6N1gw93tr9LfA2mwnysKLOfB1wiqmLCSfdsCzRR8HzxlSvD9Q0LdkxVtGWZfqg6GWq5bmTJp7vTSveaXg2YZg3za%2F7YssEHiTHemKjFuPVUSc78MsmIPzMAidKmlXDhROoh9lFsZpkzSA%2ByVqlKtbMCR6E8GROp7%2F3k6P%2F9tFF7OeGH04LgT8V75lTtaIrGjXjNKWQWIQigpZgtuH689FA4ipYVRSmLWDxDRvXOAAxkxua9ZNbHnbssP57jdx1MmZX4Gl3Wx%2BaPXAT0OOU2zZLFqbO9jptGAH0gYXhrP7GIUZXSjQT1kZjrcQn5TLhdYTqY49K%2BXwJrggVal0NhqENsxAmqA6YdRZ7IlW5uioY4PR1xDeZvkHZVwmU%2BPVTpODuNfiZxOE%2F%2BgGA4Kk14ah%2FuD8DxoiO7BJh6CL7RUbWxV0Pfg4TvRiQs%2F9pzJ0O3A5Me%2BF5DOsfBxik75%2FSiRjRz%2FLqKN3pNlgi%2FuZ%2F8GiVItDz7cnDOKlGg41ilABzTdDDO%2BO3OBjqkAdFqGWD2IOTPBadV95ZxXm7BcaPDi5FGm8FKFuJ%2B2TeEUE5QDOhJKabcmaRhO5FQ%2BahZkpYmhkaQimZPk0BHFyuqt9FzsEdPNuzuwAtapIsoRJsrwtpkARTkG0BZXqpV6MKrY%2FOMYwUbxdaVX0FJx%2Frc%2BFBS67XVDSv5siRhi0IhuBtqN9MI%2BfgT1hGs8km4nhKgODAHewO507NR1b4wtXtjd3k2&X-Amz-Signature=7f2c30f442055f1c6f40c7e7f8b5ca0a119c96ccccf91935e57dcd42d92752ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665L2YGA7N%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDeZjYtwO8u62kveTdBvrp9bQfbQz4%2BCGYJpDyiABVhiwIhAL36RxtEUL0gGMQjwJpABT1wabmiuubxcZnP7%2FwApx3wKv8DCFwQABoMNjM3NDIzMTgzODA1IgydQX4eMMGvXqx2BAgq3AM6NF%2BdnblTfUKf0oYrCkZMBd9yoQB2LQV5Tyg6cENwIsrOkOqJoLVLs2U2xYX%2Fhan3OAhL3TEBPREY3Arbj50owZEEXY8uC3VZeSs8ilvrf9h4QZFm8QcKYHqqz6N1gw93tr9LfA2mwnysKLOfB1wiqmLCSfdsCzRR8HzxlSvD9Q0LdkxVtGWZfqg6GWq5bmTJp7vTSveaXg2YZg3za%2F7YssEHiTHemKjFuPVUSc78MsmIPzMAidKmlXDhROoh9lFsZpkzSA%2ByVqlKtbMCR6E8GROp7%2F3k6P%2F9tFF7OeGH04LgT8V75lTtaIrGjXjNKWQWIQigpZgtuH689FA4ipYVRSmLWDxDRvXOAAxkxua9ZNbHnbssP57jdx1MmZX4Gl3Wx%2BaPXAT0OOU2zZLFqbO9jptGAH0gYXhrP7GIUZXSjQT1kZjrcQn5TLhdYTqY49K%2BXwJrggVal0NhqENsxAmqA6YdRZ7IlW5uioY4PR1xDeZvkHZVwmU%2BPVTpODuNfiZxOE%2F%2BgGA4Kk14ah%2FuD8DxoiO7BJh6CL7RUbWxV0Pfg4TvRiQs%2F9pzJ0O3A5Me%2BF5DOsfBxik75%2FSiRjRz%2FLqKN3pNlgi%2FuZ%2F8GiVItDz7cnDOKlGg41ilABzTdDDO%2BO3OBjqkAdFqGWD2IOTPBadV95ZxXm7BcaPDi5FGm8FKFuJ%2B2TeEUE5QDOhJKabcmaRhO5FQ%2BahZkpYmhkaQimZPk0BHFyuqt9FzsEdPNuzuwAtapIsoRJsrwtpkARTkG0BZXqpV6MKrY%2FOMYwUbxdaVX0FJx%2Frc%2BFBS67XVDSv5siRhi0IhuBtqN9MI%2BfgT1hGs8km4nhKgODAHewO507NR1b4wtXtjd3k2&X-Amz-Signature=7f2c30f442055f1c6f40c7e7f8b5ca0a119c96ccccf91935e57dcd42d92752ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NYJHPCR%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T112331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAX8iFYg0CegEboMPJyL0BczWfb2Po98v5JTIfaR4v4HAiEAizfg6a%2FuwPFWw5SNM8f0cPC3W3UNj9EYaHuFzugBIHUq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDDHic6ha3bzWGJ%2BBEyrcA5a3QSERs%2FQxMYsJawmDlKwXnbLkN%2BP2ntgOAygq6mEv%2BwP2kVf6QYpvQKvE57NJnuX2NCtwC5vZHyseNNW5x5Rn4ejSXUwBU9MBi8vaWyM%2Bovc%2F1Kb53a0glhfLMSYAGhCoYM17hCliuLz4tK8vtoRTNy2lqm6yIjf7SYh1ZJF7%2F4vkgE%2F5DY5%2FbnMao1LUQoH9XWAb4KPdTNm4VG5pu3f0f9Hhzeok2jIzPWZLLas1JynrrD6m8WhX5dLYDMiiri4odz%2Bfm4ND8VdiHNBJ4fFgzE8XiW%2Bw6ZumFnMM69iooHhtG2PB11g3LM3PISfd4olEO%2Fsf87dgELGolqnCPT00%2FNV%2B2h%2BAXZeRVJTqHjb6018nhsA7ZR6aCXcE9H0N7eB8fqbl5b4dq0mOgRqf4pXc%2B%2FmUAoxSE5TJ3lsA0PyAZE%2Fo8TlWDco1FLYKwvpvPxyvQNCIpAa5xkAHMvvHwtSfRkkeF2Un0hNUsLhSGx45HhtZ5qGC%2FH9pcW3siOnRBkOR2qrk9bWDHk5W8RVIpEYchqB5n%2F1%2F%2BNlqzqGg2klVzU5IvhgxWSDuBxb5N0sChG1ZYSWwlhHxfnegJFS0cHap4Yf3bX%2B1x0gbbENEZJbIoBBVn19dWgYQRihJMK%2F77c4GOqUBX6TKTAosUB9EXXk8JDb%2BFDtZ0Sd63IHi5qzKYF5sXJpfPrBkOfleNKInK2mhdBOb0BoIqvwOPVzENyGRUpr2u%2Ftv77LHZKjvgYjZjZf88YogBYY3xAzYRXKbzKw%2BR7CBuMTVuJxoY0xG71HK3UTrSapmWUEGKFqUr%2BAVFvSTNFoZ7vqgt2IfsIur8RY42NIQHKsjKXGjj1OTxlRAz5Ta5uXYzRbr&X-Amz-Signature=659b7aded6119752bfa0c46a5cb377eb5984c0fa65ce987d025b90d41cc265b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

