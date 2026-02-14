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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLWTRTSB%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIDxRy85K8xw70QROlo7xXlcssbkAw7N%2B550nC6SVmiL7AiEAtO1lT0vuXNU4zXLeFRUvgiQuD29CCMiYC%2FfzQTEH%2FhQq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDDw03atRH4W8%2FNP8zCrcAxKzdsr9FiZR6orqs%2FiyhzZ7V3g6U%2FPzOFKOXjQwQE%2B%2FBHu8EEMtncHCmA%2BfGx9oks5QJk3XHuF5xW0%2Fp9ylca55evrqqRG%2B6KVP9GMFxIeZ5Emj40Pza2os7DLtd0y6wBfCkE%2BXUcmcUwLE86r8AgSb2XSGU0u5G5zd1dFBEnbAsvncc7%2BfUqzH%2FFCMrxrKMzS04w%2Fy4wZYFCvgiR9b0y0hUfKoX6EjJ3vJ3QkZ2z%2BDmHSV9RFQ9U2dEPf1k1j8GstSlGrsb4M9Yypnbipc3WWQ9EriAEGW%2BXUl27iOYZTa0l6RvZiD7WucXk9rR0CXd1AmyurRwaTQ%2Bm6PiCQL8wWeUZYl3KZhjMgxstl36HxPXaIrZcUMuuIFM%2Fg9jkwvxWGhm6BIDER6WVpVQhEqpUV09iFYTq6fbQskVouE7Lz2hFBYov%2BHnpyl1ks2t96W84I9pC0VTVGA3l34tIBHw1A9mswU1Mj68AjUjKgcKO9rS8EQaleYIY2ggAPjf9YgYcjYqIa%2BsY%2FP5MqtkiKfNSUc9%2B89yuL0weXUI0%2B1oNd49VDZvcQ7R4nbtAsuDvbi5jl0w7oQTshDCBhaGMjKClDZphSu%2B3jWWwC8pPrOi2NywSPv90lIiL8oY1j0MNrOwMwGOqUB3wCaYAvhSdhX%2Bdj4sE43a4mJJ%2F0jfVGqNB%2FU8sAk2Q%2FqzJQFJbpNRVFd08aOXPlboQtCoZN%2FkjMF2G%2BsAy2eiYjkufUl6sEjwZj82L3y9lEqLW6QgcdsdGbTPQgTHXOgH6Uj1q8rml8Gy4WbE0%2BrTeOKCLvNTUidThg40JLL%2B5Y7cu8WoiplFBEIVzlmTPzzt1Y8HtniKdshNlrXclZF5hlXUfcP&X-Amz-Signature=6bd43b5554781247dd676dcac89284a09c5628446142102365e2d56e543dc68e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLWTRTSB%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIDxRy85K8xw70QROlo7xXlcssbkAw7N%2B550nC6SVmiL7AiEAtO1lT0vuXNU4zXLeFRUvgiQuD29CCMiYC%2FfzQTEH%2FhQq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDDw03atRH4W8%2FNP8zCrcAxKzdsr9FiZR6orqs%2FiyhzZ7V3g6U%2FPzOFKOXjQwQE%2B%2FBHu8EEMtncHCmA%2BfGx9oks5QJk3XHuF5xW0%2Fp9ylca55evrqqRG%2B6KVP9GMFxIeZ5Emj40Pza2os7DLtd0y6wBfCkE%2BXUcmcUwLE86r8AgSb2XSGU0u5G5zd1dFBEnbAsvncc7%2BfUqzH%2FFCMrxrKMzS04w%2Fy4wZYFCvgiR9b0y0hUfKoX6EjJ3vJ3QkZ2z%2BDmHSV9RFQ9U2dEPf1k1j8GstSlGrsb4M9Yypnbipc3WWQ9EriAEGW%2BXUl27iOYZTa0l6RvZiD7WucXk9rR0CXd1AmyurRwaTQ%2Bm6PiCQL8wWeUZYl3KZhjMgxstl36HxPXaIrZcUMuuIFM%2Fg9jkwvxWGhm6BIDER6WVpVQhEqpUV09iFYTq6fbQskVouE7Lz2hFBYov%2BHnpyl1ks2t96W84I9pC0VTVGA3l34tIBHw1A9mswU1Mj68AjUjKgcKO9rS8EQaleYIY2ggAPjf9YgYcjYqIa%2BsY%2FP5MqtkiKfNSUc9%2B89yuL0weXUI0%2B1oNd49VDZvcQ7R4nbtAsuDvbi5jl0w7oQTshDCBhaGMjKClDZphSu%2B3jWWwC8pPrOi2NywSPv90lIiL8oY1j0MNrOwMwGOqUB3wCaYAvhSdhX%2Bdj4sE43a4mJJ%2F0jfVGqNB%2FU8sAk2Q%2FqzJQFJbpNRVFd08aOXPlboQtCoZN%2FkjMF2G%2BsAy2eiYjkufUl6sEjwZj82L3y9lEqLW6QgcdsdGbTPQgTHXOgH6Uj1q8rml8Gy4WbE0%2BrTeOKCLvNTUidThg40JLL%2B5Y7cu8WoiplFBEIVzlmTPzzt1Y8HtniKdshNlrXclZF5hlXUfcP&X-Amz-Signature=6bd43b5554781247dd676dcac89284a09c5628446142102365e2d56e543dc68e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YY5J52JO%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIDLaZsmxrT32MpAeE3CgNwGWP8muPPhAtWbEbMg8SHpFAiEA4DB%2FRDUj8vTXg1s14L4hvRxrQkb%2BCEMkGmZm%2FsR11CQq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDJU3PjRua7NkZ6nF1CrcA4uNIJe%2BillzxC4h9SUd8IIJZbwHQnWB0nQqwOJ1bfdZYZULryk0ruffnPA0hdOpgM3UsE5flO2w30pUtN7TFd9dGO3roqLybo7K84uuka4%2FYXxnAPB%2FYifBeRaTx5UGWMSrYyF7ypJXlDqaHZym7i0QCoSfxPNsAc02uqLAIlpJyDmgG1LIi7aEVdRBKsHebiF4dHHQoJTNiBHU%2B6fc%2BC5AOSmOJcGLx1mIurH4BgFele2dTFi%2B80GH1ZDTJ%2B6Kgy1nE5mrvhOTEXN84BAvNuBw02ZIGUeLxWKPGZ8QC9zg47ZTy7y9qarRstQOCSEpbyJLKm%2BR5%2BpdJ%2B2QToysSzoSIdisHTGxuz1eKIiRlcFQ3uJlacLWZ3NzplZlhRyTDZwOElJO5kAinrHcYws68OPhxF9X1idIMKw4mF6R9ZohObRWXSLNTHF22qRyXbRXw4tsHlFGqmLWlR97G4dNIF7U1pl5Vv85iGcXMGOR8Evno30TzobZLpwBC3UEe%2Blu6%2FsWn8IP%2BN6JtthBsGfZfuU%2FR425m8Hn0o3axNPAdYsgbrewFlVkmCOVSbmQVYc343XeZrsxwrAe8i5prH57NJa9ALlv5jvwe3QGPyFj%2FPa2y%2FLkH8Z%2F3ikQcbJwMIHPwMwGOqUBtNVrV2oajliUrh7ux75mAdeQ%2FfORvsavQ4wP%2BN6X4QeI0KlpD2r%2B0jBkoykW0uThSSdn8KVQIPCpGWZpD%2Fl0kgpB0mVSyz%2BGfjVp7wDAJ5rhIJ5bogPSdW%2FsQkqIFEHm8epVAh8OSDtabpt4Kh%2BjXStc2d0I5LCXiKCbvivnapEHM20vHrDRu6tTeKIp1DM0nIlEzx29yEk3PmnfOxHDBtlpIS2R&X-Amz-Signature=c2925b59c86f4e51c157cfab06431c6a40ab621a036d712232ef5329494cd8da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QB2URIN4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCpdBHJ7y090Hw5e9kIS0CiEYKtj2RRiWa2Ix4cdKU0iAIgSJtPaVA6UYGtEuBBqgaOHZZ0FilAn4vQTmapv3ma6BIq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDOcnSL1KcHGiwlPj0yrcAyyT1Hsam0Qsm%2BVvD%2FibtwrH3WKj5CUtRXCNwl8OvpKaPepAxj9SnvinSE7Z1lOCRX507SfN3xy9Sn%2F8o79oZYhWEUXm1KeHpZT5HtNKWV89dG6r8gpzTGDD4PcsKvW%2FzzmLlopgP1JWrSbWFYxf0TGf5qCmBfEDC%2BT%2FACdEU0EkqVh9nq9c6JHPVELU5awieq63rZN%2FlQFhshXRk%2FBY%2F%2FspD6pMSYJpIcv2n2V4YtXxv3cTm458fngxx5LERCs1aHXbbJy9y96cEnGW2O%2BnGV9ljICwsdYdn%2FBqZWqz6XH0grFnxpf7cHEBQg8uh5bUUput3pb8704WshCDNE14poQqUarua0L5CCuOdRRI2stcA7wJNSw5sXW7tqchSceYdOYAUs2%2Bj%2BFCXrrbECWfQcjjW6RNQJdynT7tN6QBEOJzcFo60cMyz43t0EIbpcdU6OvlBqgZSBtyzDHVGOFdwJdzq%2Fbr6Uc3%2FItQf726NQEbTf%2BIe5EplZU%2BG07JXKUP9zCRU5PXPhEfwsDXr0s6jIbAABHY28Q6n6QIK98zR1ZY96jGz4LizuILSoRZQSCW4iMAiM2YPsuqbTjVuC8dCTR8CRbEz0B%2F7bO3yITyDG%2B2qbhFUqspMz36TD5XMPXOwMwGOqUBy%2BtFNqBNIR91kD7No%2FEaOdOhcGxo3VCw%2BZ8Q1U7HlCK6XVYN3rXHnHWcRCgCWRW%2FZp4YPwWAdDCMGwhWLNIHcQz2%2BwMxqc81lOWEPc5SnKfUTd9ov%2F5JSEaEKk3O9DIuTA%2FuMLyjHcM%2BrufTqPAvIhu8jwlxzqp2%2B30keznN7rYmbv5Y6%2Bi9NZr287KN2rLAFjOR3apnRuLOKC0lHJ9g4ccC7QTu&X-Amz-Signature=f1b92d9d5d9c361b7f56d397e289ee15538a8e76bbb202ddc730c54fc6cc9371&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QB2URIN4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCpdBHJ7y090Hw5e9kIS0CiEYKtj2RRiWa2Ix4cdKU0iAIgSJtPaVA6UYGtEuBBqgaOHZZ0FilAn4vQTmapv3ma6BIq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDOcnSL1KcHGiwlPj0yrcAyyT1Hsam0Qsm%2BVvD%2FibtwrH3WKj5CUtRXCNwl8OvpKaPepAxj9SnvinSE7Z1lOCRX507SfN3xy9Sn%2F8o79oZYhWEUXm1KeHpZT5HtNKWV89dG6r8gpzTGDD4PcsKvW%2FzzmLlopgP1JWrSbWFYxf0TGf5qCmBfEDC%2BT%2FACdEU0EkqVh9nq9c6JHPVELU5awieq63rZN%2FlQFhshXRk%2FBY%2F%2FspD6pMSYJpIcv2n2V4YtXxv3cTm458fngxx5LERCs1aHXbbJy9y96cEnGW2O%2BnGV9ljICwsdYdn%2FBqZWqz6XH0grFnxpf7cHEBQg8uh5bUUput3pb8704WshCDNE14poQqUarua0L5CCuOdRRI2stcA7wJNSw5sXW7tqchSceYdOYAUs2%2Bj%2BFCXrrbECWfQcjjW6RNQJdynT7tN6QBEOJzcFo60cMyz43t0EIbpcdU6OvlBqgZSBtyzDHVGOFdwJdzq%2Fbr6Uc3%2FItQf726NQEbTf%2BIe5EplZU%2BG07JXKUP9zCRU5PXPhEfwsDXr0s6jIbAABHY28Q6n6QIK98zR1ZY96jGz4LizuILSoRZQSCW4iMAiM2YPsuqbTjVuC8dCTR8CRbEz0B%2F7bO3yITyDG%2B2qbhFUqspMz36TD5XMPXOwMwGOqUBy%2BtFNqBNIR91kD7No%2FEaOdOhcGxo3VCw%2BZ8Q1U7HlCK6XVYN3rXHnHWcRCgCWRW%2FZp4YPwWAdDCMGwhWLNIHcQz2%2BwMxqc81lOWEPc5SnKfUTd9ov%2F5JSEaEKk3O9DIuTA%2FuMLyjHcM%2BrufTqPAvIhu8jwlxzqp2%2B30keznN7rYmbv5Y6%2Bi9NZr287KN2rLAFjOR3apnRuLOKC0lHJ9g4ccC7QTu&X-Amz-Signature=f84a08b042f112eaf7d1e9b7d4e896f3a93a3b7a425ac92bb4c75a9104e2b9af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBHUT7B4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDo3CWibOItId3dT0Pk%2FaXF2s1AVi6W2J3H0DzawU9DdAIhAOZeCer9OaKUauvaHZtVwOEsEEbjKLQpVLUs5GG6iXWVKv8DCAEQABoMNjM3NDIzMTgzODA1Igw%2BaoLe%2BDTOz6b5eYgq3AOyURjtWSzqSBW8PVgD%2FxJh2yy%2BCVhmC5arZCHSYnDDVG0%2F0WUjADK%2BRioG5w6y7mjgrwFsfmuc6uO7B2PO%2FNnbeaGBw%2FdpV6f1qnRnJwFEammwaPS%2BlC19%2FgDKewuuZ2YIsRAytEpGeHZG2VwLYDjqlem779GrYKiBQo%2F%2BXoZn%2FaU6mQnOxMHqNH7fiYCDhMXIJx4imbO4Wbkg4BlmNev2G%2BLooUBIvQvA5nnBIw9GGX7OpeTyRDreJ7FI2a3DTtfoILb0z5x53AXJlv01AE0p5yy20ohC32tuSFDvAhwLMJYc%2FixMySsqDhf6uMHrD0C2fSRe6Sr1QCvTZ9zQ9k75sqG3BU9Z6vp8MFHSxVgrRQJytF92eZQ49toRXElEGAkAcx%2FZM5F3Bz0NUcPCJx5KpGi%2BQXhlWIgRuDXZ2UQFwekj0pADOLNpDwKwkzbtQmsPf4YoeSMkCwfwWv6os1%2B9RPeGRXud3AEvft%2FrvwGakA8SwqwPpWXcpFWU4ISssmap39erWiDKR9MUja4ow%2FEYbwT7%2BMn4oyamHy5hqNoVLUmtfhJIB%2BJkcWe3AX3jP2cUugXoUuH%2BOmq9PSDw2BNPYVTNVPTJmsBpZ12T4G2besNaowslaaQs8ESR%2FjC4z8DMBjqkAZUaFFv0KUUfwC8xSSgmVpKKQwGpDyC7ENiTf%2BcFYSVaF81JByAaakR%2BwFyf5MZUfIYRECwds6AmmxoPFS5laoE92YmdvEcvbHDhxRnkRQsWSKeKTuEQ7XSwmH87LyR%2Fsw4NAzdA3LgRXdv3Mh3KUbG84gHZmPA5Fsha0a5PDyPrNR%2B7yhCvjCzEsaSeAIrPkUHl9FwFOK54CQhopNtPytYbzUWg&X-Amz-Signature=7768357ee35c66f909811a38c769ce7d5924112b34e34a5d6966a16670c7577f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q63HLTSN%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIErcOeT0wepDE%2BU7DHXb5PvmX3dhT0cP64r3AsFez0TIAiEAiuBTYPMsAJW3TwS8lKDwH3Uu5dq8CiQMcVRsYBg7u9Mq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDO%2Fv3JA7vE%2FFGOM1oircA%2Bx2QpfMqa%2BGBt7nYziaJnemZxg74nKCIqz820FJFKg3M0uy7QXZzvFwx9P%2Fl5hvj0zNlacd%2BdYPFwwAfj5ExCKRHjvbqBEB%2Fhoq8DxnEoL7%2FFDsr18cLcqmtOIRIF3JAv%2F7eWFdRm7vHARjIz%2FqTXAcEPruhqpurXvOVxQNsZHnHJmWutZIRwk%2FggnJxaigYyVy4zppmil8Q305kBu%2BCAh86LAZN0tBjcy2ZhxeIo7xITrknJAcXE64Cmm7%2BG8jcH0bSizqRSIzp4GYAdF05vusdiHpQ9MxSjXSqAtuOGvEAtLyrL%2BYsMR0j9u9%2BU7Cx0KhICYdUzx2tkdP3BjwC5xQpa0g%2B9bO0v1GvAjfhIJEGjioL%2FomBTnCmO1iH%2B%2FjuwBTuvGSR2KlUQw4X0dj379htLMyDFfXcgdET4HYroQL7cibQgnR3yBQ1BWPr5GB%2BliNQvG4lea9ArMQpWE71I9FpgR%2FrhKK8hYAce0nyRhFaV%2BT3nQAyHwdQtHvK6aEvzwQX633B037EbDiaNQsIdvuTmfxf9%2BaN6WrO7XciTkRMcvYlL2cUX3HvYAnkLm6Arh%2FV9SAknO7NESa%2B8o8hLRw2gsu3a320eiNd4HdKy4pLB7x%2BDZy4pr0wNg3MKPPwMwGOqUB%2Bg5AqbmfqvyxUEpxo8U310IwGFaeoL7kJKGPDHt7DihnFsyG7ZsKdqne%2B7EikNfvMVNNRvxgodN14AXxSn%2BPZYm3HuTgT%2BEpAoJd1oJMnFyL0zapUUu2SUmHP3aZFlMYy%2BH4WIbt%2FTxOT7%2B5H9ruR79%2BWWigNhX3uLWsHJmPOJ%2F1FN8VhDPK%2F%2BMc5TaWoz%2Bb2uB1WzZTg4Bc0G8NYmNfSK0lEdRJ&X-Amz-Signature=be65a510ea96c83613b198f8cd4e5d311f30df7168a5be3513ec114ccff27186&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXDKT5ZY%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQD1Y7TG%2B2qhHu9sJJ9GprbG%2FVVagoSLHyz%2FcYzAsivdLwIgFw7TpIvMXfYGNQWHxQhcJl1t4jz6UEFY8ibUBpd%2F074q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDMa2GlsBOslloMK1xircA6hQAtDnMZz12eItreoz0JxWRb8sjm1%2BwPgjT21GqAOHkgAmXZkmTnEMwiNRYjQGKL88cNSaglUVqj6Jhhs3bgDenO1v1jEM4%2B%2B%2FWUvsBZLdcilET0jepf3DCEAZCZOXiDZ%2BhTXdw5Su9vI2orcvvUmLzs9mM2rJLmw7NJ5i7c%2FFAz6PSDnSd4vc5zclxbnfbrOrPa2ghbTJuZF7jLJMSapwJETgBi7wbd30uypdyiA0xSYcQwsHeIHCVfOLr4noSTPMuueApYPrFKW6ZENRpFXMjX5CVCdzvAzjvNNspySaV1vEOYONYFCaPMDpAfZfkb%2BbIz9RR5R9TKEtZ7Ly1S0QjFRMAH3HJ%2FEsCmcgrDknO13gAvuYyL%2BUqq4JU6F6EMYSw7OafPbpTYTO8hJiFEgL57Zfa17%2FMWEukitWrfpVrKvxEV3PRiszuLpboB56IE2ijDVtU0c1uaX2XBKqH0aQdlIklUf%2FjjB00i%2B5K0wny52LLRDAr5Bc%2BiM0O04N6uNJWXxoTdNqXiLCc6yncym5FHMBaM%2FogrKJayVKQEjwx2r5vXdjYkdY3RhtCQM5rIOYKcy3lElri373uHeqEJIamP%2F6TDGgmoAJXzxFvg3j%2Bdc6%2F0FRT08yH%2FQoMJ3PwMwGOqUBX1kVLd%2FysWkSA1VTn6QcCnsjS1DP1R%2BigU5u%2FN9C25%2BcMOPr1dhizKIjQXOuXMQuk9JxQZD%2BxLO%2F70TvygCS4lKfqCbh2P%2F84qsZE%2FAwZyen%2FU3tJfzQhLwFa%2Fy82mWkUIYQxGQVw3CStVFAdWBMh4Pxt3VXUJrodH7nbpbhmZJaix0hYubkpoyC2yuEhCX5rzjbcEOjo5TsRZ3ayX7jZSGZVAV0&X-Amz-Signature=207e00576425833d978dd0e9c409c0894ec19a83a6b2720fda43c1bf21a77050&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NRDBUWD%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQCHTfjXI6odE1wKK8j3iKXxQCKm4sPiktBCCh9BK2LWpQIhAJZWwUJCQ5tz4l2lkPDOFDgw7Oz3i69Q3q6R5RuM6kE2Kv8DCAEQABoMNjM3NDIzMTgzODA1Igwi7t7evDUkPmXwSmMq3AM95E3%2FWq%2BhPMQ1qilKIZok8oGlz9ovMliRlMNHGy1%2B9RNrFlcOnInE%2BeW9BihRsMdNJ604sWENsE9P5bZncjnonbRAxYUcMIStbW8SplUEVV2QlcJrQRjRRxmt8RFZWdyV%2BVyNXuzYsQxM%2BXjZduP10XfX97litr5D%2BMoT6QOrJxobHTLKhD2k07ThWR%2BjpA2BfqiYO%2Fm4qLYeINy4FahYQA%2FYua7yAkS5QeKltIxi5zsNsh5COJl7sQ%2FRGm9WRd19zlmaQnL74A0ly9c6hLYPlK53SMm%2F%2Bt4dB6NijWw4U5vztYVbAHtHE%2FoIZiwauq7sSnpreYPJaY%2FeHC1dC0zQnBIXs6UgeXHmgFP56O8ZJrKUWcZK9KSih%2B5AXwyJWViYxlIx9MUJ5AqBy4p19YImxF9VKYtr14Va6jHqE4N62yXufmnMrDaqq1RDK3x03H%2BQZLpdUPXFoR2dk92DXTlDn7nHR4tRHFRbjuvOHDGVrGDuRqDpH%2BgfZz6jvnEgdDAXRb08N1OxMBLq3g9YWNIXTMCAxLOACVUS3179w6mX8KWm%2FeHRospx%2Fv0JUiH%2FVLd4bjujF8mXeUJFQ736I07IYkjpfQ6%2BIAG4Za8vDpbwKfQQGQab2nQlHf%2FCvjDtzsDMBjqkAexeAsABtaBE%2BCZ%2F8dlFm9IcPeFWUXCSq05h4TxBeMzK1P4195Q3v1FJxGjYjhD6Ls0Bne0fnpyjqhbmKdH%2BrkC%2FCmon8IrHcur6HK7zqT59xWcYHqDnQ7merjRLYFh1hXfzIqh87ng8zm5N2xl5yb9z1V9TDV9ZiMIY61%2BDNEFaZC%2Brfwos4%2FAFZclefctCo6zQL7eEPfMG67keeqUpr7kbFhGS&X-Amz-Signature=ec921086b2366172da355d98bcaddc6b8dbd7ddc24d73f32e44f47ac4bb4f123&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NRDBUWD%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQCHTfjXI6odE1wKK8j3iKXxQCKm4sPiktBCCh9BK2LWpQIhAJZWwUJCQ5tz4l2lkPDOFDgw7Oz3i69Q3q6R5RuM6kE2Kv8DCAEQABoMNjM3NDIzMTgzODA1Igwi7t7evDUkPmXwSmMq3AM95E3%2FWq%2BhPMQ1qilKIZok8oGlz9ovMliRlMNHGy1%2B9RNrFlcOnInE%2BeW9BihRsMdNJ604sWENsE9P5bZncjnonbRAxYUcMIStbW8SplUEVV2QlcJrQRjRRxmt8RFZWdyV%2BVyNXuzYsQxM%2BXjZduP10XfX97litr5D%2BMoT6QOrJxobHTLKhD2k07ThWR%2BjpA2BfqiYO%2Fm4qLYeINy4FahYQA%2FYua7yAkS5QeKltIxi5zsNsh5COJl7sQ%2FRGm9WRd19zlmaQnL74A0ly9c6hLYPlK53SMm%2F%2Bt4dB6NijWw4U5vztYVbAHtHE%2FoIZiwauq7sSnpreYPJaY%2FeHC1dC0zQnBIXs6UgeXHmgFP56O8ZJrKUWcZK9KSih%2B5AXwyJWViYxlIx9MUJ5AqBy4p19YImxF9VKYtr14Va6jHqE4N62yXufmnMrDaqq1RDK3x03H%2BQZLpdUPXFoR2dk92DXTlDn7nHR4tRHFRbjuvOHDGVrGDuRqDpH%2BgfZz6jvnEgdDAXRb08N1OxMBLq3g9YWNIXTMCAxLOACVUS3179w6mX8KWm%2FeHRospx%2Fv0JUiH%2FVLd4bjujF8mXeUJFQ736I07IYkjpfQ6%2BIAG4Za8vDpbwKfQQGQab2nQlHf%2FCvjDtzsDMBjqkAexeAsABtaBE%2BCZ%2F8dlFm9IcPeFWUXCSq05h4TxBeMzK1P4195Q3v1FJxGjYjhD6Ls0Bne0fnpyjqhbmKdH%2BrkC%2FCmon8IrHcur6HK7zqT59xWcYHqDnQ7merjRLYFh1hXfzIqh87ng8zm5N2xl5yb9z1V9TDV9ZiMIY61%2BDNEFaZC%2Brfwos4%2FAFZclefctCo6zQL7eEPfMG67keeqUpr7kbFhGS&X-Amz-Signature=92e4c194fceeba7da3e9a2d972d420224dd4871661206e58dbfabbb2c6fae8af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KVJ53JA%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIGmJJIP6HbVVUbBAciJ7161yHg9wg2bZYXAs%2FCAnG%2BntAiBdAiMV8CFi9NjjKBeNlDv3FBtUIkUkxwX%2FHMqzWHO4aCr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMc2rPRyK%2BiRu%2B4NE5KtwDxMy3p%2FrTc%2BaetRMgApTnecEGJev31TYMyPWFjx7qh1Xnx1h13pQ%2FAqwTHVskVAEddXU1nlpSW3rkUFcCrsPitrJDL3f%2BnuiS5SHI%2BXgtMb6cucDMP5Cduqn2d1gSlK4wHu54UO9DWSV%2BkF%2F9ptVenSuzaaJnVoV4pQIRoKB6O0bB9JRRLDrBh0lhmwFR8l28asNOb5xAT4AmVmFCiwdQd4BR58fahMz6py2P3rSAnWrq8ROJYlN9iNcA2%2Fo9S4G93ZzrV4iizvqpYS4%2BdBlqSMtervSj2UgH1FIcNooW3UBGCfGgAJ4RRZ%2FJQ5SSoQGBEbpuCnNjez7qpd1PZOGJTdny%2BQRVxRDSCxPUH7M8Dx1Y4Hxws7agcIVNk%2F4vH8yUjGkfF2Uqc7ywod13YQeeRX7aj6QR5OmwASSlaObNNAdEMJ7ddwDZUiY7OUCQusqoeEOHlxQf6IK5fFOjIW2axg8wFIho5T25gDdo8eHdULgNdZ1fWhe6ReKs%2BBya8k1oH0SnJCWHAYj18xrnexxB4qoHv7XKKKR09ssz0rXaaLA9GCYwodM9klc7gLUNO75EbyuTqz473UMl1%2B3LRoy5FbgkLWRjPIoh3A6%2F6xgXzjnHpiaeE6BD%2BRtHwykwgc%2FAzAY6pgGuW6Np61p7X0xIkEy%2Bnl3koO4JQ40RRKS3P2ndgesYAIaqc6BVwOQoHrKlR0maiOme%2ByiwHq6zuj51GpAg8e35V008sVsFeSXIUhJ8zzGAFqDyI49ntcN5Hbj79%2FMx1xSGAAWmL3oDQ23%2BsZHIPW2p9qE5kzyyKLEkfweNm%2Be4boAkXCGgovv38%2B3Z7DwFOvr2q%2FOVUE%2B5l%2FBlMS5ntYpPmWkniO5Z&X-Amz-Signature=37c248d974e64c2a1244a47825b988643544636f63aeab7723d301abe3651d27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDTBO6IF%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDOsUK95RQwCPZ1%2B6Tfs88TlWbmwcDBc9aTS1EGQW36gwIhANEuJ5si8I0nSKpwblhViQ2I28rEJb5hOUIRv20QSyEpKv8DCAEQABoMNjM3NDIzMTgzODA1Igxcgbmt5D4LpD%2BUtnIq3AOqsEBcqkyNq4fQC7%2Fqa84KpvPmUONbDv5Jcq3mr23NCPHoCw%2Bd1kv3dAEiISayYWay67oZFSx%2Fmp7xjyVN05DETru5G68Ej0grwssjsxQblAtJQz5nluSh6onkhOISxxZ%2F%2FJtAC2bi5kAP8pXm8vagisqColWgOTOzqABZgfLvuNn9DptYcLd0JDa2hZWvo8MCm0jo%2FsgDr7N4Gn3UKE%2BWVRvSWUQLNJ3duLw8kV%2Ba%2FoekK80DNaZ91XD834%2FjN46Gmo8PD7hi2ys%2Bi%2BA9naouwwrvXKLSYPxOvXSCAWTo52VZLceCWkFL3ZzmTDboQE0l0%2BzySIFlTm9tLMKjjYja%2FND838%2BzdcdGEVsy2spnV5Yovglikxa3%2FCJ39Q3779OrBnqYxFs2aqdLSkPTa6KGxXoNeZNQ6kwIrjAlEA5qX%2FWpH5vw2bzCWinj21pYv%2BH%2FLKX0DUKg41%2FQ3kVWl6KJZZMnSrK2QOeVtYBt4oV3J6shJqb8u390XEWjg693HfI0XcSOFjBRnKLNalQDn4wQrlKJJTDS4Fux8frs4REXm1rzkr5tVTeRM%2FMu%2FxjiRRj2gx1gQFV22EabthyFuiz2ZCMC74rISQAFSIfo2ymtYuCJkHDF38ctpjfxxzC5z8DMBjqkAS9FumshO4tOyE1ulKwrnI0HOGMLk%2FAX7Iu%2FqVpKGMNTA7FFeaCarwLS1F1qbRt1RfQMewbykwiozfe6dpyFfvM1J8HXx1tGxCLNux%2BeYBOe7Yzptu7WOo2Ze0B9A1s2IVaWTpiFz6yFv5WzVI3huPYxFXHiiJql%2BF2dcA5N2yE9jARL5mAm2%2F9tilxF%2F9QQDL8UyeIW7URg%2F%2FC%2FxdEgcMEzXAkM&X-Amz-Signature=6430a13584724894767928a3cb708b170e1ae4c77c294884ff632ba40843b23b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDTBO6IF%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDOsUK95RQwCPZ1%2B6Tfs88TlWbmwcDBc9aTS1EGQW36gwIhANEuJ5si8I0nSKpwblhViQ2I28rEJb5hOUIRv20QSyEpKv8DCAEQABoMNjM3NDIzMTgzODA1Igxcgbmt5D4LpD%2BUtnIq3AOqsEBcqkyNq4fQC7%2Fqa84KpvPmUONbDv5Jcq3mr23NCPHoCw%2Bd1kv3dAEiISayYWay67oZFSx%2Fmp7xjyVN05DETru5G68Ej0grwssjsxQblAtJQz5nluSh6onkhOISxxZ%2F%2FJtAC2bi5kAP8pXm8vagisqColWgOTOzqABZgfLvuNn9DptYcLd0JDa2hZWvo8MCm0jo%2FsgDr7N4Gn3UKE%2BWVRvSWUQLNJ3duLw8kV%2Ba%2FoekK80DNaZ91XD834%2FjN46Gmo8PD7hi2ys%2Bi%2BA9naouwwrvXKLSYPxOvXSCAWTo52VZLceCWkFL3ZzmTDboQE0l0%2BzySIFlTm9tLMKjjYja%2FND838%2BzdcdGEVsy2spnV5Yovglikxa3%2FCJ39Q3779OrBnqYxFs2aqdLSkPTa6KGxXoNeZNQ6kwIrjAlEA5qX%2FWpH5vw2bzCWinj21pYv%2BH%2FLKX0DUKg41%2FQ3kVWl6KJZZMnSrK2QOeVtYBt4oV3J6shJqb8u390XEWjg693HfI0XcSOFjBRnKLNalQDn4wQrlKJJTDS4Fux8frs4REXm1rzkr5tVTeRM%2FMu%2FxjiRRj2gx1gQFV22EabthyFuiz2ZCMC74rISQAFSIfo2ymtYuCJkHDF38ctpjfxxzC5z8DMBjqkAS9FumshO4tOyE1ulKwrnI0HOGMLk%2FAX7Iu%2FqVpKGMNTA7FFeaCarwLS1F1qbRt1RfQMewbykwiozfe6dpyFfvM1J8HXx1tGxCLNux%2BeYBOe7Yzptu7WOo2Ze0B9A1s2IVaWTpiFz6yFv5WzVI3huPYxFXHiiJql%2BF2dcA5N2yE9jARL5mAm2%2F9tilxF%2F9QQDL8UyeIW7URg%2F%2FC%2FxdEgcMEzXAkM&X-Amz-Signature=6430a13584724894767928a3cb708b170e1ae4c77c294884ff632ba40843b23b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USBLXNBX%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T081556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQCp31L4UPmQ8q1g5DgKoNV7DAwhjxsfGpEuLj%2BZBg5TPQIhANddpjvX3U%2FCMxIDY3W6hd4R7Gt6oTJaJ%2FPe%2FbCorT5GKv8DCAEQABoMNjM3NDIzMTgzODA1IgxkM3JPZ21xQsm7clsq3AOPMPoAQ9O9AEYw%2Fp%2FaQGV0pL4BZymnyUTtpFP2S5vp9zT5VPez3FZb4YvWCWGhlDki3m4WYE4YH2C1XeUaSjGTORUfTbpRB2UnTiWRIxsVZago4ol6yh7FiW8NFLs2W%2F%2FWd65fduPblrxtcclvGG42M28mwkV1jccnbB0JY%2FhmK0onPhnlWDx4DWqgOSeOqykMLwBbxa5%2FW3lWQXAw%2Fxzzfegg%2BmamBlFx%2FrDAfrmsIyVuy7%2FE%2BJ44LFHbilfgLaeEVNfLdym1lxCxGewewSfFV2cAQOMRCBhFkEscNpH%2F5cz4aF1VcY%2Biq%2BbxrvkLBq8dwkgqlXHe9XIvgewRdsZnaO%2BPRx%2FsM2Si2Q75VekBmZ%2FNahvP%2Bm316FlccORt4gln4p4EwqfD76n5A2wuAQVelihAhLil1jbqTuxiorzw7TVXr8hFOptoYj4CciL9F3g6OYrWP0rD3MfgsGeFvN7dLdOtS1lKJT3RWOpmI0JbYq70phLC67l8aLkkT%2F8rOXni0XD0dwCbxpbfwjUJUZ5wJRCSDnhuk0BwIyIXnMh4STFXzePOvQkbZFyvgj%2FeQw2vTuvDAry%2FWICEDwDDeX%2BUPc3BKWGtSrQ33lApAZqTOTIIRq78JYkEjveh0DCDz8DMBjqkARa2i2cC0ainNmDCW7YzgZHDV78Pq%2BxaRVlea3EaNrxIaSCSk7eeKfLLmb9Rd%2BkKdcp%2Fl7y33wtC2kZTVn9AL3%2FI6SONDMv1414ipmu2XMv%2Ff8RwLIO65ADuSis45Ndh6xiHQDIBfFFEOxxvAjvFgq9N%2FeFVWCZ%2Bne2yiTcgPeasWxlQ04hnwmdUmS6juSjOPQxq7vmOVtdXa1Rq1GvV1gemTvNr&X-Amz-Signature=c43e8a3f56b70e72d1c868c21df40117b3ae47e1d57e253d682f9997eebed031&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

