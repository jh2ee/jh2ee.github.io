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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBGOVVD3%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIEyUadDtjHRM7NWiwFoBpH8%2BNMek9coQD9AkhL0Lg7RlAiEAuSh%2B0VyKowGNn4A3yu7LTCHlPTbuENO%2BhrCO9N9XTasq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDGp882L8Q5W%2FMkm5YCrcAwpfgd3usu2AewmCzh38W69A2X%2BmLQvUPJcWsIKTbzqCzXAnzhGOOfY8hTybUzZvgpIP3y%2BgT%2FQqFlmTxKrlfiwl30do9QjciegxplXumlZZNl%2Bf%2Bq3eN6JNo1eXAzeIN4RUEYyWG0BGJF%2F6aRH8ZdB4bDFAcf0TTNal2Qc5%2BFkwaijb4ZB83i77QA8LCLkwGgh9oy09jtQRNZQNWT5WIf%2BpgjDjrPF6rVVc48V1hCnmmzeqLhjNtCJwKhpvHTmuzQWzVehUAfIMGFeBWiFTbi5ymftHs7qtwNB14pamTZhKjOoGZr%2BBF9yZNLFz5hNIHIiCNQshInQuSyyVHLUvumQEpqFSy6jauXCftFO61ZVKlMnr80Ux%2FeKQj4UbDJJiGH5Tofw5Q9c1gGgSNNamlMuoBsxVC%2FeCPboe5h5q19qx4iBH%2BBA%2BLNKCLfvC%2BpIjGwZ4uE5u5mMJVHGkZjGvoxau4Rz7JMjh%2FkVikjqg5LhT%2FDsnME%2BfnYmrDg0cmP%2Fk2P46Txljm6fdvbcYWOEjkD%2BNFV9n%2B%2F9wYNh8q9sCgxdeWPitB6gh6CfZA4hsKEzKus6s5QkWShqfJ1vZoEFPhMFJWqEMcCX5ZN4HqY9guINsE2nxrjfs68QbsMv%2FMOO%2Bnc8GOqUBLBSkbkSol0MeBA%2BRMa4MgSVD0KD4xbhR2XnYRw9QLb9iHCZsJvBz78ycMIqtjrB4rXvMwf1DISWQiMxx3jNeCo1iuCYCKNL9FMqaqpK%2FaCEl7Tt%2F9g1FhrxigiU1cpOHxBv7GB60d6c%2FL8jqWHmNXcS6EuMW5CvvFv%2Fg1VAIukt7%2Bm6G82aJdsNkOYCJo4yUTlhzZ4sU55M9qYbIahaUf9qWBLzD&X-Amz-Signature=e2d32982971c4a5b6373d859e60ee83a88b48da227972874b1130bbc8e284e20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBGOVVD3%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIEyUadDtjHRM7NWiwFoBpH8%2BNMek9coQD9AkhL0Lg7RlAiEAuSh%2B0VyKowGNn4A3yu7LTCHlPTbuENO%2BhrCO9N9XTasq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDGp882L8Q5W%2FMkm5YCrcAwpfgd3usu2AewmCzh38W69A2X%2BmLQvUPJcWsIKTbzqCzXAnzhGOOfY8hTybUzZvgpIP3y%2BgT%2FQqFlmTxKrlfiwl30do9QjciegxplXumlZZNl%2Bf%2Bq3eN6JNo1eXAzeIN4RUEYyWG0BGJF%2F6aRH8ZdB4bDFAcf0TTNal2Qc5%2BFkwaijb4ZB83i77QA8LCLkwGgh9oy09jtQRNZQNWT5WIf%2BpgjDjrPF6rVVc48V1hCnmmzeqLhjNtCJwKhpvHTmuzQWzVehUAfIMGFeBWiFTbi5ymftHs7qtwNB14pamTZhKjOoGZr%2BBF9yZNLFz5hNIHIiCNQshInQuSyyVHLUvumQEpqFSy6jauXCftFO61ZVKlMnr80Ux%2FeKQj4UbDJJiGH5Tofw5Q9c1gGgSNNamlMuoBsxVC%2FeCPboe5h5q19qx4iBH%2BBA%2BLNKCLfvC%2BpIjGwZ4uE5u5mMJVHGkZjGvoxau4Rz7JMjh%2FkVikjqg5LhT%2FDsnME%2BfnYmrDg0cmP%2Fk2P46Txljm6fdvbcYWOEjkD%2BNFV9n%2B%2F9wYNh8q9sCgxdeWPitB6gh6CfZA4hsKEzKus6s5QkWShqfJ1vZoEFPhMFJWqEMcCX5ZN4HqY9guINsE2nxrjfs68QbsMv%2FMOO%2Bnc8GOqUBLBSkbkSol0MeBA%2BRMa4MgSVD0KD4xbhR2XnYRw9QLb9iHCZsJvBz78ycMIqtjrB4rXvMwf1DISWQiMxx3jNeCo1iuCYCKNL9FMqaqpK%2FaCEl7Tt%2F9g1FhrxigiU1cpOHxBv7GB60d6c%2FL8jqWHmNXcS6EuMW5CvvFv%2Fg1VAIukt7%2Bm6G82aJdsNkOYCJo4yUTlhzZ4sU55M9qYbIahaUf9qWBLzD&X-Amz-Signature=e2d32982971c4a5b6373d859e60ee83a88b48da227972874b1130bbc8e284e20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZVA6J4W%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIBe8fR9UWejpD9GbtDooE86cyw5X1rhNtXUGxBosnm3xAiAzkjizh3BPk%2FyYsvLJz9ShZR6qzMwl1v5PHwJ3s2jHIyr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMNplHHM%2BbpP2kV25JKtwDg5LHyFP5%2B7KeThCmFNZQa5cibrmC6GqAsDXff2J4O%2Fw8pQ432GU359p7aw5UyZOekgIyvrODXr3%2Fdf4DvJx7sGJ0Mq5kBWF%2BZDR7eqg6ZJnHAA8oP5PnBQL23sWkBHQTHxH%2F%2FTY3OHl9Lg9%2Bvlo294mMLtUKwkLENQyg%2BLADs3ReVL8x0tjeOelbgTyHFjoAj%2BzzhDQHDiUuxDbyfua1%2B3VTjIwfaBmASR1oUUdeRfP3TwuDlR6SzlE4Eb0TZDv3rlCvGGGwrGX1XW%2BgiKD94dn%2FL3mFcyEFAAIFP7IZLoRsN4Y%2FaWe0ocs7qPfPWnYEO69O1dBUL1rRyydBr%2BK9Odwx%2B5QHWFwPw4gESNAqA00LbFLxMK%2BcLoXozCt%2FcirkxIxHTwYWbovn9hnLvgZHwE%2Fwr%2FQAvKJeysoUwMyI05ETufH2U68wFxPddAoD3OuQmoUdu%2FGDrU64fdS9glBlvc73mfXjztPpRYOVgdXdLkQgpudJ9VniflW2xSysTD5t5zr%2Fg0noxFmAI8lUcfnqnaGnq3t82Madm5okUsfVGtPWGIfAnHxpJds20TCWlmN28kinFNr5Ohy1uQTo5M7rRuM19f8ORk7kg5IyOl9qeOTHzwp6eftELmzXdWAw4r6dzwY6pgFlF8A5hUsn89CXAA%2BRkXdww0eBL6LugstOPMAUEqt9Q277tgPDbDXd208hN0LL%2FWTe6E6%2FWO2sBNy%2FeX%2BKA8J7cVbzZZD%2FAgYA%2B7OVK3WRBUxK8WPzehuSVD9Xxe8WpV5a7CF%2F8B1DujYzC8DFeZJ7aY%2BytDT5ndG2TxWbJ7dcxAW5LepaPZKEKoB1Dxjo6B%2FUg9mlnlIVWkbiV0SOGiUz8sGUQaSQ&X-Amz-Signature=751229a88cfe27a2561cfa92697f93fb4d1f1d50e8001a69566dd2c3c27d7870&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657WMEGQY%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDf6lXrSgi5k4lrxoAIAOwQnKFWsMzMIm80g4W%2BtFELugIgPkVq8ueK6qP82GQjK3S%2F48J1YDwhpYdaxELoix99wx8q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDK562pQR337OmM2M9CrcA6SAlMBXdbUCO%2F%2FmSccnXYEKLMp5%2FrWIZ%2Blx3seOT%2FNWSPYEBQr1h1uj9dbPJLbT%2FMCK4JmoF7TZILet0xsXlcbRpYQj%2BuO%2FNfNFDC5oW63lLUTsYi%2FsBtMvG6A4ndxcbzualdnKEBYmxsLNe9TXR2GzfpvuMvaNhhrqkPOCEeFxtwMUMDRNp9rvH9VoqyzTO2gJtBbESeGyIJsoufIcAszbr8Z%2Fcq7hEWZmeeTANDLoEAbx4CeXohf0%2BKifU62yNgS1vycwcAlEaK8WIVe7FVrtJr1XDXbtQSY2EWN2uusTOfhqyeyY2PmqXEX9YJkfqS074K8iBs3oUjdShGXXSQcQYknDOK26a6%2BCP85bJ7ONPfwPpo00OfxYKHAwey%2BfmW1whf5lar9%2BlgrfkKUsl9SIHdx0oYpv51HKrF0Ta2Uf0%2FV7YMt613b%2Bt8rSW5BLyqOFwwyjg%2Buchc5B8wT5%2BQ1%2BAk4j2u9tg0V7zlxD5PZvYytRbm2btdL6guFvk37d1Z7kYsU5JXeGrhywZaEAnFnaLf2JLDz%2B40bwwBhDupSU0A2AJCCSYNYm8FDFdRdJPHeBy2u0MM%2FmeSNpClxNEkbU59gO53UA7OuZL3Urv6IjVOG9%2BAk8x21ivoEfMKDAnc8GOqUBRvCw8RJDfL6H4CMbVuw4quaMjX2tBb0JDsHbQXhQPLBIClx%2FlpHEYyadbtLtNjJSSjl8eYM26ZXLGebLZdcVJvtee4K%2F8p69FDo1YZI18zxPmglQO3kylZKPXdtKnNuosQvWeqlxLdrcqcGuLzRHxENaREfNOaJBpCEdY%2BbNdOISyYyBPQG%2FY8TWkL1WAJ%2BRSVWBWp7RsujZ8Ms75sorGOsa7VxE&X-Amz-Signature=6eb1cfc5d4dd6104531da2baaafbb0a0d602f38de8acb4ddef10934b5bd11c3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657WMEGQY%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDf6lXrSgi5k4lrxoAIAOwQnKFWsMzMIm80g4W%2BtFELugIgPkVq8ueK6qP82GQjK3S%2F48J1YDwhpYdaxELoix99wx8q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDK562pQR337OmM2M9CrcA6SAlMBXdbUCO%2F%2FmSccnXYEKLMp5%2FrWIZ%2Blx3seOT%2FNWSPYEBQr1h1uj9dbPJLbT%2FMCK4JmoF7TZILet0xsXlcbRpYQj%2BuO%2FNfNFDC5oW63lLUTsYi%2FsBtMvG6A4ndxcbzualdnKEBYmxsLNe9TXR2GzfpvuMvaNhhrqkPOCEeFxtwMUMDRNp9rvH9VoqyzTO2gJtBbESeGyIJsoufIcAszbr8Z%2Fcq7hEWZmeeTANDLoEAbx4CeXohf0%2BKifU62yNgS1vycwcAlEaK8WIVe7FVrtJr1XDXbtQSY2EWN2uusTOfhqyeyY2PmqXEX9YJkfqS074K8iBs3oUjdShGXXSQcQYknDOK26a6%2BCP85bJ7ONPfwPpo00OfxYKHAwey%2BfmW1whf5lar9%2BlgrfkKUsl9SIHdx0oYpv51HKrF0Ta2Uf0%2FV7YMt613b%2Bt8rSW5BLyqOFwwyjg%2Buchc5B8wT5%2BQ1%2BAk4j2u9tg0V7zlxD5PZvYytRbm2btdL6guFvk37d1Z7kYsU5JXeGrhywZaEAnFnaLf2JLDz%2B40bwwBhDupSU0A2AJCCSYNYm8FDFdRdJPHeBy2u0MM%2FmeSNpClxNEkbU59gO53UA7OuZL3Urv6IjVOG9%2BAk8x21ivoEfMKDAnc8GOqUBRvCw8RJDfL6H4CMbVuw4quaMjX2tBb0JDsHbQXhQPLBIClx%2FlpHEYyadbtLtNjJSSjl8eYM26ZXLGebLZdcVJvtee4K%2F8p69FDo1YZI18zxPmglQO3kylZKPXdtKnNuosQvWeqlxLdrcqcGuLzRHxENaREfNOaJBpCEdY%2BbNdOISyYyBPQG%2FY8TWkL1WAJ%2BRSVWBWp7RsujZ8Ms75sorGOsa7VxE&X-Amz-Signature=85c1a83e9206f761054a9a725112cbc8a478912bb6f4daa95ca1ced27328248c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNDKCJB2%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCQzyD%2F3TRdL%2B3267ylhrL0L0emP83exTWYJcYKCysV7gIhAJ6D3gufxZa6sEbAIAMgX20oIiffhtJ8oE30KEVr5x2YKv8DCDUQABoMNjM3NDIzMTgzODA1IgxWsBvOUK5LakoJRecq3APLlwpkVXSWA6IGb8flJJAWWtS7rXwQnoNXDgZDNeNrYEvNKes7nhU7maDO0UEtWqFabbacFUU53vv1vLToLCPKsWfRqPzg3RJxKxxreAYHdde1BBVVHEwVM7yYmsjxqUcaOfb1iun5mbPDz0HAv2gpP05vAP8iUgXmkWa8t1G0ByJ7lZm8XkGzSn5Z62Hx7XSCqW%2Bhb8QZ4PeAiBrQHP6%2B%2FekDF82SqG%2Bb4rJQVVNU3qN74ofHmzeZNTUtaiz0rvoAz6hb1ySZTYwxhMILGgkEI8KJpXG%2B7NJf9tnaGnJjQGYpqP%2FHmaV4mhIroBCNUBlLRaS5gG5tDs1A9%2FkEwjkCL3i9RE1vfQkmz2wcUpVqkvFEqx1ALWkroWG25VlZZFOeFSDsZ0LNp7kIdqA1KpvyCk6z3hZ%2BzgSSInSNN0VQ8C6jTUilkZ2Xudo2e3ULEGULBaBpXp95tcKtz1R1hKGiqgI5wP2O4v7cIYqonb5iiwzOu7rdEsRa%2B3L0tCJZJQ3Vivmc83tpKexIN4hWz%2FVNJjAmqI2T2hR2vXkfK8ZVZ6keKmJuVyncbZl%2B6RA%2FeVB1i4RitL832KrgdFyGT9nye8AtksLd8U7OSOZdLAJiA%2BwUDaAjUkJnFHwcmDD4vp3PBjqkAQQco1feu7voGIR%2FbtYCnmV62ZQgnYSxdaFQEC5kPwslSG%2BypjG4L0Fu0nFyLocFMOBDDoyWJT%2FN89aov0hFWlkvABG3T3RFdFSx2xK9adZmRG0SHu5wynqxC5jRukMRQFXUdsYHfD4wv0ix48a%2BOa0GNyUxUsdYHSkbVqMYBMLeZ61sGCFTghsEpat4CpYP9FJVqJsVOwwo1RllNIaaQwwZB6Ve&X-Amz-Signature=3aa28c8864acd703f95539c1329d5766235b2404c342403adad2c2b20c2ceb38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SH74BMSC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDmG%2FeQae90hb3mMuGMbP0DAqwye%2FTl1pFbWsnRLcI3VAiB6jF%2FEstyTinYhrtdTztX0159Y8INCEQwpBoO2hGO7SSr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIM15NRO8yh83asBaixKtwDFFMgXOB7wUZFpg%2B7XVaw04LbwsFSHJtJWWWt5WAD%2FB%2FNpKvKPyEb4iDOeRJPSLTDF41lBIzFVltr%2FOscvnpfpcd4a85V4X%2BvjrWlJN5GMK5R47SAZiy7mjowYshiHeyrTD54jePtW8zA8iawffrR%2FJiO%2BzS6mQczrGZlKmzGXwUA3hnaCc8POfxwRsX%2B4C%2BpTmrDWcCa%2FfPsVUbUZUNj%2F57DcokvLc1SwIwx02q3zbR5i6LNH5B697f8fvB0Jj2UCuV91rbOb%2BFok87LeSihYUOlrokpoJxDM3Cz0kpGI%2FzluR0VCJmlooJD0Ku5pm6pOyJDA%2B0VflytyR1veGTYA2K2iJvzxa1VMmlSCY%2Fh7mZGjUjBboFUChvFErhzMGN3DZmejV46KzKuJBZc7bpMUCdoIuCzLFedNLqIjobExeIiIHgldQbNauOHCgRWEF1aWtKjoSa4DHAMm7xXAkz7uTsQ3RN%2BzRSmA%2FTbY4o%2Fy2IQqeHWoLwOio6BPzImmt6%2BhQT73Gvy3xGHp55hDdYsHfqL0BOKCOSiPWIctcXT4u2Cj%2BPNuNUR3DY%2By0ZU3wXBu%2FHG0hUO%2BaMIZSwUqrimQ3czjt450bkja%2FDVhlwF%2Bxz8qSNFaz1mP5FVLGkwyr%2BdzwY6pgFDTZDHkQl8u9XhpVj5CG%2FrXR03R2pFGshosKlhCtMYoJ%2BykxZUMlA%2BqdoVuYgRvxdCDJTUPDsTbYql8hznUTcAVVcu5lMAsMLFVih2ZyGoCmfr1rKPDbOEXmr81SEcFGFYC82BTKi2Um%2BtsVpWs%2BocsixR%2BEJqtXPVq2NhjdlL4%2FPPE78yKCRvHsd7rW5OhHf2F5fKlKtd8Eo5sguPbww%2B4cb5KznN&X-Amz-Signature=fb645730c3f6ac6f5c4379adedd31155fb2e05de437c44cd5a770189691fce20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTTLEEC5%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDibCHvP4iu6DZJ8KJugovpgw%2FaRrzQk2FezfkFqAl1eQIgJSEjOU%2BviQBdKPbBM%2FfKEq6VBAv7Z%2F%2FKHGm4N0cSh7Aq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDDZ90xQHX4PNZwgS5SrcA7fZiKjWtJQ9uaV6THQUdR3fRuTct4VSD%2Fui0h0eTEmQVvM%2By3ytAQ8AqWgyo6LaaDZdNLkjZg0FIoSWAYT9NXvnIYieRs3MRi2%2FVsgTBQuW53klqFMnzSEEdGrVFsnEjMU8kUd985ool5kKbjm5EN56wdqv2on9jwS1ttx0lh%2B1FNwuuCXY%2ByrA2UKojsyVDFStLyZN%2BUM62TCO5FaIr4DkngyJbaxKaw9pKyuepGfbq835z%2BhHFr5RgkD1LSFtgEMxty02vtc3ywXwI9pfUbB3boKNEyCtl%2BgwTnWhUqpB%2B6%2BnIS7Hzi2HwouL%2Bn1%2FJjed4UHRXj%2BZHzlkhNyrAl0fpo3KCH%2BlNAGxyfUaPDGapqa27WK6jYDAadagx6zLh7sXEdBiBS%2BmJf5UP7UAS%2FuJ%2BMNSiGxyLwEF8%2FyHfiKIagTF4yzXpWGU0Qb0vukKf%2BRELemgE7fNNoIXeQihn2AC2OY4JIbcnyCklto6azjAvgWiDv7c6u1fKqgz9kGTCSWRtURrxaVrmL%2Fb2R58nYNBxZ4emda6xE7dvO29NgZ1m%2Fv9FfMg6OaosZX1DETxIr7qNXHYXMXXRjSHxhWZSI%2BCfSe%2BEU6nqdFXe%2B9Qp2R6S%2BUAgju2yN0D9OpXMNm%2Bnc8GOqUByGik9lB9PHuMRMmRk2dqjyhF049CC%2Fw8wE7%2BqoME4ki7dTTMvSs2ZlsU9mQ%2BvzvbDyNbg83K8xmBIFIsbJf6jU33Khx1Xup2GrjglQdiJu8C2N2x2st20FSH6rS%2BR0fU1em3Hq2kvQaYnvGrZfe%2B4ZW6ks3fB9HP4H37EyfuNRicnXCyXfU4H1P5PGFaIJ1UWnVyvv13aSoKQ5DoOTSrKFktW8R%2F&X-Amz-Signature=9a70c012f85bd93944c4efa742b29fa03b36998c8553a21259caf28b49c5da03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CVKJVLC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCID5uESIlzXMv%2FCgz3P4XTQsktByWNOlgcAvuK4Tq%2FNVJAiBAZ6XnUJsIh%2Bxi1ZwTRR4bXXcMg%2FRPBBAHIC234SXR4Sr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMwD34la8XCFfmr%2BtkKtwDB9FmU0ejz5vQaudAWXJC2a24U51aOBfeuitSUPCW6cffrY2G8xUzQo6v%2FMIuFrjUao%2FA0dgWVXFAfKFHtUMrH4n5qy0hYc%2BeQ9RF3oqHo%2B17Rgv4uSju8XxWEbcyLkdlPjQHrbX1Z0b54bxcyw0tfurtwBHYnk0kFij8T2FAgjRiHWcEGSIlUeKPytrPK3N%2Fm01yL8LzuN6AUk9YN2XUe5dnmX1Ip4PkN1PehVpG95xCSPeOPZ%2BOfi%2FYL8jtkLv5619ORuEAbXrJmjODpNc7fAm9Ry6dn7yPjI6nm5%2FyL%2FuLMQ6ENgBl6hLAxxOluQSNK6AKKTL91nUk%2FsuTYtd%2FDaxqbbpMGXApgZG%2F1a8o9wUcOjxI%2F2x09rtbvCR3bUpVHDT9WUk%2FrgVcqdjs9Keil2vdcIUhpJUy8jCq42%2FTSGSCjuCNlBovn8GOS4C%2Fvd7a5IRaJC2TENNw9sVdgd4pUg0v5YZjeLTUL7yonFgfVH3whTmJCjs4WRPwO7975J2suMFi%2FDtcCiN71640tLqHg59uuNIryrUQ4nfXI9TFRzKbKU6j5PndLPtPiKCWBVb4Rh9ssLoSvYp%2BBW450VkjLbI5J3Qeoe3%2BB2K9SXr7gCyQbG66a%2FAUra%2BDwbcw7MCdzwY6pgHaAqedK%2BdPTjteak7Lp1p9HFjFBpRigMEqsBMgOqMeFrSpyEENQsh7E8TX0VNLuatSRK3Tpk9%2FHHzG8I9vEVVPyn%2Fx94cJrjilHrIjxCZvO83kmuUmhhKrjfC%2BN%2FSsp5M0yAbbg7m2ZC91OQUEfYiz2BzXG%2F1%2B8KgzWj%2FyeoMP2xob%2FTuZ1gVXdEQ6dyW7UUa%2F9OgRIVpjQbDKw5FanhI0Bd1tAICy&X-Amz-Signature=7fe2b7f980677cd00778d42e16b3ab23116e587b396317efe12c3a32c777db2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CVKJVLC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCID5uESIlzXMv%2FCgz3P4XTQsktByWNOlgcAvuK4Tq%2FNVJAiBAZ6XnUJsIh%2Bxi1ZwTRR4bXXcMg%2FRPBBAHIC234SXR4Sr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMwD34la8XCFfmr%2BtkKtwDB9FmU0ejz5vQaudAWXJC2a24U51aOBfeuitSUPCW6cffrY2G8xUzQo6v%2FMIuFrjUao%2FA0dgWVXFAfKFHtUMrH4n5qy0hYc%2BeQ9RF3oqHo%2B17Rgv4uSju8XxWEbcyLkdlPjQHrbX1Z0b54bxcyw0tfurtwBHYnk0kFij8T2FAgjRiHWcEGSIlUeKPytrPK3N%2Fm01yL8LzuN6AUk9YN2XUe5dnmX1Ip4PkN1PehVpG95xCSPeOPZ%2BOfi%2FYL8jtkLv5619ORuEAbXrJmjODpNc7fAm9Ry6dn7yPjI6nm5%2FyL%2FuLMQ6ENgBl6hLAxxOluQSNK6AKKTL91nUk%2FsuTYtd%2FDaxqbbpMGXApgZG%2F1a8o9wUcOjxI%2F2x09rtbvCR3bUpVHDT9WUk%2FrgVcqdjs9Keil2vdcIUhpJUy8jCq42%2FTSGSCjuCNlBovn8GOS4C%2Fvd7a5IRaJC2TENNw9sVdgd4pUg0v5YZjeLTUL7yonFgfVH3whTmJCjs4WRPwO7975J2suMFi%2FDtcCiN71640tLqHg59uuNIryrUQ4nfXI9TFRzKbKU6j5PndLPtPiKCWBVb4Rh9ssLoSvYp%2BBW450VkjLbI5J3Qeoe3%2BB2K9SXr7gCyQbG66a%2FAUra%2BDwbcw7MCdzwY6pgHaAqedK%2BdPTjteak7Lp1p9HFjFBpRigMEqsBMgOqMeFrSpyEENQsh7E8TX0VNLuatSRK3Tpk9%2FHHzG8I9vEVVPyn%2Fx94cJrjilHrIjxCZvO83kmuUmhhKrjfC%2BN%2FSsp5M0yAbbg7m2ZC91OQUEfYiz2BzXG%2F1%2B8KgzWj%2FyeoMP2xob%2FTuZ1gVXdEQ6dyW7UUa%2F9OgRIVpjQbDKw5FanhI0Bd1tAICy&X-Amz-Signature=4c7b4aa84e0d9c2f135015211b32dc6eb2557ee93363c3bb5c0b9402e61154b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LJKTAXL%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIBGgMPSS7CuWar5UMmGPjXoaAwZ%2Bx4vL1YVhlkcRY2i5AiAo%2FkPqfr0Xxtedj2rYxB4Jp8aOjR8b%2F4DqpBOCuCVPKSr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMCclI3hEYEcokpdrTKtwDw3wGvtYH6Yemgd%2FIsh%2F8jjFUHOIlQVyOzDoPkJZRovAr%2BeeR9sKkZC3LT8MaQklj%2F288mCrUa36lgVjKWB5lw5Z5JlP7sbeV2j1zAxf64RCvxDIrJwr8fv0voBQHFzW0McQVUfgpGJcj7s%2FxcoL3FXuWYOIvNOnVMy8JSBRgf2Pl4%2BW%2F2CxtwA%2FGVDko4nBuB%2BKnElyiK1GAkEuBS43YlKma4MIbQLJqKlN1BqyZTfIwmKYgB5immWpXp45yky1q5NjOx2HVuOiSiU3R6zK0mUg8x1iaHhW98Xq9ug8rBpfEsOsRmxK6PQguvlTKQ1tWBxDO%2F3tGV9e%2BFb%2F6%2B%2BSYh2b9kPtGncxuUsIBuCgsSUSLNBnCOhDi2rzH%2Fx0qlGGumd6jvlDy39b5BRImvoxLXaG1RznTjDS9eU60tBFyELLSWuTWrv1cuD45hUtoyxgEu1jn4mJ3Afe6MnIsOj43dLkFW%2BJX0CC%2Fnc2mCZd7Zb5NMHfWL%2BpZPyukG5U1vTdFfH5s9Mw%2Fp826pUwbJcEL3XSZVwa%2FCc%2Bnm3ky4wM1QGNW8xu89iEjIbFPBATnc4BcyozdX1WjOKVkMFk9DjLGcDYopg0dk31vQPqzV8hgKuX406%2FyfoQKjd5sf2Aw6sCdzwY6pgGyToisKS3lHjmAXOl2rtDPdrsz20t%2F9ixVYtvVV9HP6NJrZtDwYDAuNfQpHdUFRBuJyNHpOuHdfJ0E1Wl48KfcSHbwCLpME%2BIZzALSjWZCJRLQ3Gc2iwMkRrzGPGzyKWWN7SNiY00F6XFvt9Zk4x83ll4quROlQXtOjxLL1oj0qvL2Q%2FVYT12aJG6YZmEh72%2B13HQuc%2BTULgV%2F6zHxXquSsZhAqFFU&X-Amz-Signature=2c99c7c02d8d93e6e01cf7cc79259fd9b79345f7b013931b31225d407edb98c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OR7SI2N%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCID29TPOWBOHH5AwoH7zs8Fy9DSlI04wU%2F5zVmoTTZaR%2BAiB0eAToODeZ%2B8SR6O4qRx527QAWKH1cWXJWSOcmYVbU8Sr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMd9gWnUAl5ARMYwyxKtwDASuO90A32F2L%2FP3xPdF67oV6VNkAVcVkfNS6tOlxWakipU8%2FmSmcayPBX1uzyAT72XDhxwPQjziuD7hrbaVOWGqeRuuRh8TBjKg%2Fv%2BXXViXppZpAvq4vuC87yyVZQ1P3QeckP38MQ64G9wn0%2FgIvji9Nkcv8VC19sME4zAR6L6XZ3DnxY69TsSnTVoCtnogQSQWQNlbrPIyBXAf6zAKC84NfnnOThoFsBdgyOvcmTntvNGPop1wXpOWgFYTjYGcLBG8RMgLoFnyP9n5y2mRE7tq4GqO%2F%2FE7np2Uc5wZy9m5tz1midfZCh7mFwM7zB92Dh5TzuQt4SeMUX6pdAtqzMTBhpA7q8WhtoG0bPAZv%2Bs889fPfJA9ZMBe9HmTipdzrapLyzm6zb4TGQh2oZjYcQUZp0ekR7WtqqX4bcBqOMUWEVLLEe8Pr85XcreFhQmuAVPmbGUQwj0GXjwpjkagv3jyc9fr2wse7Q23fXvXFoBw%2FKeI0CRoJ2mFahXpeohQqrJhIVO33PB7aJXy8cYS0cF311jUHJe3CeUtvb9DfoBUxe9C6dsKykJPtjDEvs%2BxR9o5gv8irZmpLWhcCSnGhE6aUN2oVjtx4nrL3Y1ieNhbFMZIJC%2BNgveFsXAIw8b6dzwY6pgGSsb%2BzBJaTFCnDGn3TDDmkiwYcd01LX%2F4Gr9dlBvIcUttR1advUJGDvbAdOv1E2oh8uNqAe14BdgSz07%2BNjWhjsaGVFk%2FxXbPA8ut9osdbsX7r6XTtuKoJgoXpnCSIvR1jvsw9RRrp99zq18nFFZGb%2BiHGMQajBJ%2FkJzR9wLggl5lvve1OitrII50JsaRJA4PZ7eJBrvaonKbrXO6BDuYJG%2F5Th7wl&X-Amz-Signature=b51365c2b8b0894dacc03d833eb414ffe328c2da4b4a715550e3bffd0ffb4e48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OR7SI2N%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCID29TPOWBOHH5AwoH7zs8Fy9DSlI04wU%2F5zVmoTTZaR%2BAiB0eAToODeZ%2B8SR6O4qRx527QAWKH1cWXJWSOcmYVbU8Sr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMd9gWnUAl5ARMYwyxKtwDASuO90A32F2L%2FP3xPdF67oV6VNkAVcVkfNS6tOlxWakipU8%2FmSmcayPBX1uzyAT72XDhxwPQjziuD7hrbaVOWGqeRuuRh8TBjKg%2Fv%2BXXViXppZpAvq4vuC87yyVZQ1P3QeckP38MQ64G9wn0%2FgIvji9Nkcv8VC19sME4zAR6L6XZ3DnxY69TsSnTVoCtnogQSQWQNlbrPIyBXAf6zAKC84NfnnOThoFsBdgyOvcmTntvNGPop1wXpOWgFYTjYGcLBG8RMgLoFnyP9n5y2mRE7tq4GqO%2F%2FE7np2Uc5wZy9m5tz1midfZCh7mFwM7zB92Dh5TzuQt4SeMUX6pdAtqzMTBhpA7q8WhtoG0bPAZv%2Bs889fPfJA9ZMBe9HmTipdzrapLyzm6zb4TGQh2oZjYcQUZp0ekR7WtqqX4bcBqOMUWEVLLEe8Pr85XcreFhQmuAVPmbGUQwj0GXjwpjkagv3jyc9fr2wse7Q23fXvXFoBw%2FKeI0CRoJ2mFahXpeohQqrJhIVO33PB7aJXy8cYS0cF311jUHJe3CeUtvb9DfoBUxe9C6dsKykJPtjDEvs%2BxR9o5gv8irZmpLWhcCSnGhE6aUN2oVjtx4nrL3Y1ieNhbFMZIJC%2BNgveFsXAIw8b6dzwY6pgGSsb%2BzBJaTFCnDGn3TDDmkiwYcd01LX%2F4Gr9dlBvIcUttR1advUJGDvbAdOv1E2oh8uNqAe14BdgSz07%2BNjWhjsaGVFk%2FxXbPA8ut9osdbsX7r6XTtuKoJgoXpnCSIvR1jvsw9RRrp99zq18nFFZGb%2BiHGMQajBJ%2FkJzR9wLggl5lvve1OitrII50JsaRJA4PZ7eJBrvaonKbrXO6BDuYJG%2F5Th7wl&X-Amz-Signature=b51365c2b8b0894dacc03d833eb414ffe328c2da4b4a715550e3bffd0ffb4e48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7XPNS5S%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T115023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCp7ffdrbF%2F%2FcBZvSHotNpeQAYbjTWMXygT6gvPLPX1KgIhAI%2BHkNUdNi%2BaAntoFKyiej8HIGTfXsvusPXp9GkSEKykKv8DCDUQABoMNjM3NDIzMTgzODA1IgxiV7keGf3EC50vRiIq3ANshMHtXd0Dv47R14xAMEOY0M2OZO078gCyMlabSMQ%2Bn1vVk%2FQ0%2FbJJ0tKvPtt6TsuANPIEWyzqGiznnDkGS61T8wXYFkrWnWjJtHkBmKqmZhnpvoL8wj7xmpeIKg59Bf8%2FkQr%2Fn%2F30BdCZyFSY%2B8JGIMhYe00GscjviwY9kyigCei4g%2BAPmxtwcdaljUzEZkO2AJnLHHmvlzyBvcEvWBJJ7BQLNfSjl3fUiE70vnpW6%2BD%2FVNVJBbrZ6%2FyTS%2Buwv%2BwUSR8Xews4yH8NtF5xn9qdvh%2BeXfiepwxEardDh%2FXc1LKSLHmqLwpO70ycE5f8XahM9QDC08Bp4aVTtPXBESqbYBdqH0KhqSe9EeAG9iXDldHyL5J9Ui13yliBuRHj3F32D%2F2EjBSDxsoFT9yCWSxVeNBpth%2BQXOzk6Y40BZnM4bV8YLDHexjYw4WsfXrqSBcKv6S7KRQ9NVo0KJrMZcIShGJIrBmK8AxNjiVviM1WyHaF0os8IOMp2W2E0zh9stPC%2Fm5QnpEh6N9%2BOx8%2FEjQpp8zwqWKPinHe8YAh61UIhlM9Gzk4MzLz4nP7teL0LrDLFLQ5G%2BD8xmDF%2BGFkCQirIzfgyIAYYy48v6udXECsTCMPYX%2FavNQ%2BNK0VqzCJwJ3PBjqkATU9WkBbB8NyTEYFHk6Vx7TsPoK4mlmvuFtCU7w9cuhLcwlnaqUbV7iPi20i3cpfSzkJr1FnEhpQb4AM58p4QL%2BZYap0m5tXZIZeELJmsvAWhHO96bIl5qBJ6mj%2F0kGFcvyHe%2FRoPbB%2B4uU3qdpTMVo8sTH7Fqh08lJ2DfabsGpk0FbFrodHVFAAhnLsn2DDV4Kw1SMuMMNygUtM8owBWpHbzZO1&X-Amz-Signature=5ebdb51febb66de6e5f99f1586c40b88ee9afd9f319176aa5d64619e37b3dcd2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

