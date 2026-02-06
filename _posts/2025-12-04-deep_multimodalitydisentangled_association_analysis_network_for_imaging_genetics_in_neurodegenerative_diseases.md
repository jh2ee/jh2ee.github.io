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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FQUN42M%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQC2H76U%2Btu5%2F8h3PVe12wjErdNfftv4T7YQNd4Vj66GfgIgNzbPh2abwa5BcaTkn4NNcVeoFVATfCo1%2BaNzOJgQnTkq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDI78Q6VUsd8p7ipUgCrcA0O1qR%2FSI1LQrrbj2Y9KDn%2B58G8gRVsOFIB1C3cnI8DEYMZmzezaZIXnc2ACdGJMui9CyuhDtttoz9i%2Bg2oJmdoRgM3Hlc02CTYk9j4pSSyBcQtmr4Ae8gQxqN1WDwy%2F1AppIuTHHAF3Av5Qa8NCaoBisSGTCWgPjZYLv5O1cXh86k7ostOayeQIw9%2Fpt3xgsQdUF68rEd5cQ3mWfPRBIVt7zbESV9%2FFQ%2ByE3Z8Yua28Q1dSlvqXKgtuolPGpN8a1KbOVN7k9Q1cL1MnBCHF%2BDynXelVd%2FmGMgLaLw2dawJNVuH1gxDwIPyMsK9AFu0fx%2BXKS4Gyf3bq2hmQ%2BGgkWmhS1oVKYlN3bsWtkvSWkeedOD%2FxfDVM%2BUYoWRJQSJGmQ7glByTrIj2mokuXaA%2B9mPqo7I%2F9bCt5hJkP7Svn3NHnDllOC%2BjPOHcS%2B8aPjgFJNMiXdqbEyJaVz3r1P3ja1AGWB7q2nkW4SE3jAKHNlcW49Z6fEjm8fid%2FBwPqDvIHiFBZU4dc%2B0i6luLrtlYXXYOXAgu%2BYPp6AdZRRrHvKu%2Bkv9LBvZSWnCYPfK5eEhJXkc77CUi25R5ThNN5wsGuaZofiMgjTxsFY5YXWxENZQgneS9IeKCkNo%2BqxSKMMO3Fl8wGOqUB8UTQEkezDsYOpPDRWxePb4CjpcOkmCINKeIKlqjw8sQSmd53KAugh90g1FMce2pQU3xLBhfRD3hjga97VpZmQlPfj5punaCYNjWSjBikDLSxP1rBFt2ZdI592XPv09H1yR7CPYLVdKrS%2B1oN7dqlwqafW2sjjvinHYMVWM9jK28NG8Th1gwrrykdTgZklWCiJvuNQWnHnZv6gxhi6uYz1L2wVUcy&X-Amz-Signature=ce0641b0e6e7480cefb3c542ba0639d0257ae81243aeb764c7d916bd3f4600ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FQUN42M%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQC2H76U%2Btu5%2F8h3PVe12wjErdNfftv4T7YQNd4Vj66GfgIgNzbPh2abwa5BcaTkn4NNcVeoFVATfCo1%2BaNzOJgQnTkq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDI78Q6VUsd8p7ipUgCrcA0O1qR%2FSI1LQrrbj2Y9KDn%2B58G8gRVsOFIB1C3cnI8DEYMZmzezaZIXnc2ACdGJMui9CyuhDtttoz9i%2Bg2oJmdoRgM3Hlc02CTYk9j4pSSyBcQtmr4Ae8gQxqN1WDwy%2F1AppIuTHHAF3Av5Qa8NCaoBisSGTCWgPjZYLv5O1cXh86k7ostOayeQIw9%2Fpt3xgsQdUF68rEd5cQ3mWfPRBIVt7zbESV9%2FFQ%2ByE3Z8Yua28Q1dSlvqXKgtuolPGpN8a1KbOVN7k9Q1cL1MnBCHF%2BDynXelVd%2FmGMgLaLw2dawJNVuH1gxDwIPyMsK9AFu0fx%2BXKS4Gyf3bq2hmQ%2BGgkWmhS1oVKYlN3bsWtkvSWkeedOD%2FxfDVM%2BUYoWRJQSJGmQ7glByTrIj2mokuXaA%2B9mPqo7I%2F9bCt5hJkP7Svn3NHnDllOC%2BjPOHcS%2B8aPjgFJNMiXdqbEyJaVz3r1P3ja1AGWB7q2nkW4SE3jAKHNlcW49Z6fEjm8fid%2FBwPqDvIHiFBZU4dc%2B0i6luLrtlYXXYOXAgu%2BYPp6AdZRRrHvKu%2Bkv9LBvZSWnCYPfK5eEhJXkc77CUi25R5ThNN5wsGuaZofiMgjTxsFY5YXWxENZQgneS9IeKCkNo%2BqxSKMMO3Fl8wGOqUB8UTQEkezDsYOpPDRWxePb4CjpcOkmCINKeIKlqjw8sQSmd53KAugh90g1FMce2pQU3xLBhfRD3hjga97VpZmQlPfj5punaCYNjWSjBikDLSxP1rBFt2ZdI592XPv09H1yR7CPYLVdKrS%2B1oN7dqlwqafW2sjjvinHYMVWM9jK28NG8Th1gwrrykdTgZklWCiJvuNQWnHnZv6gxhi6uYz1L2wVUcy&X-Amz-Signature=ce0641b0e6e7480cefb3c542ba0639d0257ae81243aeb764c7d916bd3f4600ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQEG7LNO%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDhvmtbaDQu%2BcqJLYqW3MLDdajv0%2BWFQu8%2FJv5flvWYmQIgQ82EoPtoInRM7V0998UqKxIRWvRbePOSj8LU65ZAUvgq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDNC2y2mRTDsamcVAbCrcA9SFAJ8Rxlh7gPOcYDtnP28VyFLJNEP48UaPp6TY48EM4fqdO1rK7dGG2y%2B%2F3SSHYCISMgK68ueopftIbxvOHeUz4y4WQceLnxfnQSYLnCo4Y2xctqz%2FlbG7o7WhOCzAWkybrPdrz5qktK%2FMZqu0N%2BgoZPEzP3ZXMRrApZiI%2Fwn3U7fDrI3RtoYDIT0wc6bJB7JQjL9U7V4kA4UuPkuigvJRlakkG1yCDZxODcc1dP9%2B%2BNCu%2B1NDJYdYKdApqnagG3D6bv7OlMpB81DaJ2pDgyGLdvNT2AYI3%2FAVoXpsEAWFU8%2FBPF0NaLvdhnFsHACKBPOtmo6wcfuC2KPNYKhjf1ENG4xnUFaOstkEp0iroBJjP6pqP8w1PkgD2mpfTEAERtO9AXT7xGISQ6gK2G%2BdFweKIFw6lCWSQwZaAPWaibGPrgAYKYS%2FOYUZPD1j84y3%2B0ndbQhLx1KZFFO6IRjEQc%2F%2FdZGqXQ8rU6CksDMOIapSTo1ghklaX%2BzqDu2iW18Gt13k7cDq4G7vTAjMgrnZ8jmK0det460ovZsdFi5Hufs%2FrhR18WZtu69AhRD%2Fw%2BcnBi4%2F6%2F60vzJ43aQigzK7zEg3dzobN6CcTIqWuVC3hwPJ3ZeMl8TxoP47xY0OMOvHl8wGOqUB1B6u92fY6pklees1G0w9qrdGiEnDt3XHWABIJWoiWfPCS%2FkPI6%2FojkA%2B%2Bbbvm7hM66kVE7RmZHqCRqTr3HwahyapMLIR1rxJLbL7za47VcuTIIve4Qzi3DRj5P8uve8k42v5d7AVNXBqWFM8Hqd1aC9BDG%2BoaL60IWi%2FUWpIjMRaL%2B3HGwLlpeHSOTydJCH3SIDxCzhGSezI6Yz75c1L%2Bv426JeL&X-Amz-Signature=9807a52c2f55126f1bc5c673b109107b9b6b3cb3b492f272d753814f23adcad5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRHLCKTV%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIHy4GBwO0fKoLZ4ppkT17jrn7kR8ls5iGnZCZ00doWEKAiEArjfUe4zMEt4NjEv6xq599Kdv0n%2FlSc3VojUl%2FQMO2FAq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDIllNFRTRU5%2FM3lzgircAwtXkyg220pJLoCUQCvEsE7iC3sogeGeFQUEYueJhy6unlZMz%2Fn0NFX9kHV86CR4y63LMLXA6xQkz8X2E8BkPOQ0mQye5wT0nxmTNX9Zrvsc9hat14QwFqNLkVW9maqUatcbNgCcOdesQLroOzfTk8hKkn1ckHJCnPvEYWwy46xsT29v6a%2FlJCbnMYmXyY3bEponPRmYSkvjzVqOmxSd1d2gD64Gmo1gcDY5bozhc0ecL8Frv7OlCWY%2Fxr3WaLpzcUJ9rvN76W5Y8SbW9t7o5zEt5rEbsFzORmX0pYvcFaBYhqKC97eZQR6i3Pb9%2ByZPUsjNidDlrH6%2BZQ4ZUpvCg8pOtRPoP9rzmSInfO9PgTxi24oPNfisdCSD00QqH73KDX0gf9OPBTxYE9FfkyON%2F%2FJAoXZ8XTCVht7PPuylbsMLKAnHtszFgacykiJaBFjbQtkFv8xR92oEsJ2yAlQkuRXsqbCCrw%2FKxU%2B66m5skGZwsHSzdRBBc2WLn7psVx7vfAUqnFfDlR%2FsjhejG5Xgp3kS2Popv6MgrnrFl%2B9qz3nbjY958m5vKeNtsCjF0vegMfyEDGyqCh1C4Ck9n1ktAAXa70YRkA%2BS54OoHOdvWTJUUgezWXhOid%2FF7Q6yMNbGl8wGOqUB9ImrjWSZpA6ko%2FCselLTzHlbjVHt0KnAeeOHL%2BBRymyOxkB%2Bh20NOVl3%2FqtxJlBkn5UPiqcdOrvkMmGfF7lSudCwqXg8XzlYttXliQOBsXXB5PEVqQ0DW5KxckAHuqsjxNVur%2FilOh1jSxWh3TgV3Y8w1QHrwBE8Z%2Bm2idN1oleSxZJfuuJ4xYbeeW2b1tQ3eSY06Fpn7umLs8KZ4wdRHdyLnAAD&X-Amz-Signature=7f30c171b01d82dc7c511454d7a5ae31bbb75fa0bcbb43de5d8f6c3f73d23d25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRHLCKTV%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIHy4GBwO0fKoLZ4ppkT17jrn7kR8ls5iGnZCZ00doWEKAiEArjfUe4zMEt4NjEv6xq599Kdv0n%2FlSc3VojUl%2FQMO2FAq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDIllNFRTRU5%2FM3lzgircAwtXkyg220pJLoCUQCvEsE7iC3sogeGeFQUEYueJhy6unlZMz%2Fn0NFX9kHV86CR4y63LMLXA6xQkz8X2E8BkPOQ0mQye5wT0nxmTNX9Zrvsc9hat14QwFqNLkVW9maqUatcbNgCcOdesQLroOzfTk8hKkn1ckHJCnPvEYWwy46xsT29v6a%2FlJCbnMYmXyY3bEponPRmYSkvjzVqOmxSd1d2gD64Gmo1gcDY5bozhc0ecL8Frv7OlCWY%2Fxr3WaLpzcUJ9rvN76W5Y8SbW9t7o5zEt5rEbsFzORmX0pYvcFaBYhqKC97eZQR6i3Pb9%2ByZPUsjNidDlrH6%2BZQ4ZUpvCg8pOtRPoP9rzmSInfO9PgTxi24oPNfisdCSD00QqH73KDX0gf9OPBTxYE9FfkyON%2F%2FJAoXZ8XTCVht7PPuylbsMLKAnHtszFgacykiJaBFjbQtkFv8xR92oEsJ2yAlQkuRXsqbCCrw%2FKxU%2B66m5skGZwsHSzdRBBc2WLn7psVx7vfAUqnFfDlR%2FsjhejG5Xgp3kS2Popv6MgrnrFl%2B9qz3nbjY958m5vKeNtsCjF0vegMfyEDGyqCh1C4Ck9n1ktAAXa70YRkA%2BS54OoHOdvWTJUUgezWXhOid%2FF7Q6yMNbGl8wGOqUB9ImrjWSZpA6ko%2FCselLTzHlbjVHt0KnAeeOHL%2BBRymyOxkB%2Bh20NOVl3%2FqtxJlBkn5UPiqcdOrvkMmGfF7lSudCwqXg8XzlYttXliQOBsXXB5PEVqQ0DW5KxckAHuqsjxNVur%2FilOh1jSxWh3TgV3Y8w1QHrwBE8Z%2Bm2idN1oleSxZJfuuJ4xYbeeW2b1tQ3eSY06Fpn7umLs8KZ4wdRHdyLnAAD&X-Amz-Signature=aa68ccfb99b8a89c90c251deac42a490de19af21669c1bd2043eede5a32c2bda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHOSKRQ5%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDy%2FFv9UEIqFNpIXPX%2FuuW8pwgoEQ8MfCOAGRxuj6MgegIgIAAcYQ9CVStiuj5GMOhcoaDXtqYgjiPr1rGmALnnW0Yq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDGseNsReI6c6eI0fSCrcA4piBR1iwvKMxeGmj4FLsbSPm%2BmmsC8JIJvXMB6Xwbxov1WG3rpXBfptEt8caWLJ5YFfAHh5dFXoTk1M2L%2BDIrfI%2BIstOaVXcNHkh98twCUE%2FTW6pIkuwly3wSHtYWhv%2F8EPpXnHtmaGS%2BsLkfJqsdSVyw8wGY6lLODawCr3x7IJvNWscFJ8LS0fc4kHy81NqvhGYCgR7sN4eCKc1KVK3j%2BNh6GhQu7v%2F1nacz8DScjZG%2FJ9j98g58WIjIyFwqc4TyIQgCwFHooJfALMH0tZ4tjPRO2v9CYIdMBJlEC2kPFyfoh7aAvUo7WCA9caUFOzaR4bb0lxmEER4ju%2BOwd8xJHmUg%2BJVPtTcIXAtBH17HM2O5LCHTQI7IhWqOONuyKS02wkyzB4OqXpnBHFbVihsuVTJ7akZSuOuCTaKCSygvDIICExnw9qxQvMSiKkw8TgyBC4UY0HjIz87%2BEzFWrjuYud%2F6PEmOVXnIXR42NoDbtHI6NIkS4psBWD15p84%2FpbKHpwOaMVH3G1FvdVtdU9%2B5MtYQof107V%2Bfh1fyVHpDaH3QS94AYxTin7RszxOCVvsY8kJi9%2FLnCgP9ipWA43G5nslwDWnPtYMFVQ33hfeJH0KKYynSPACmS8alRFMIDHl8wGOqUBdX89s0xhdLEgNzvg00Zp5krQuioZG8RCW8uzH6qCf2KKbWjOdzq%2BlER%2BwLNoJ6hPTnjvViP8ruPbVADqV42fROzEVUueZ2rX5MAkvYrFEihQcOqJvzu1KKcxubHDttqE8SjTCbAncymPfv3lT6MhCItwa%2FzYpryPDrOM0%2FZ6WBSRFS89f2PLE8ItYd%2BtQkCmJqnZ0edu1C0%2BWzujn3qDLXrKhDUx&X-Amz-Signature=4a573f9595edf87cd66b232c31dae0a9ce0c4783ecd9be814e70f6eaa83041de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMOFAFEF%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIH7WIU4RRsQvHxifervhIZaGdVfMBvOTXLYe7SmW9mwkAiBkI1CfSukwy5jr8RYBm7oHgOePe03jz%2BImit4zVgsIYyr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMIawcIjiblkrNx%2FJRKtwDaT%2BtoxoEbbwdB9zqY2oH4h1isXOHs9NaNT%2BNfuTn%2Fg5rnxj1vh5nnsnsmFif3q1nBT6DR2aqNu5SNcTasMHB32iqLZfVTzX75K%2FCZM%2BuxGL9%2Bx8qcsF6L21svsob9d8j5ZIOF8r6WAQdrcx6Z0zc3FvbEmxb7Itzxvmk8%2F9ZFCGhYvQi6Cd7dlYc1p8v6U1N74jTJ2UmTyJqTEKKPfF9lGzM5eR6UWHdDnPNrhVOs4k6rJ9M1Gh32ho7SsYSs5agAnSys%2F%2FgHSdSM4%2FBuVDGX6%2BzbNIKI05woEzEhfF1pOI6RQYbmPU%2BEUPTPCIV6pu0JsBuTap2EiKGlY1ADN2loPiMlLLkXPuIgHo%2BN7r8wnhPv5OX4JD0CyhEq9z7G6emQn6mSSitN6p7AExt8DQl0bbT8%2BuCECXICZNOUTs9q2UxgPpc0dStgSBSmYI8dqSaEJXvAa7yaJtcub%2BBWc2NipNusDLE9LKaitloGK9dTtdsN7QhuE3UigfiH8FARBV8IC1NvrdQMXXKss0PNTFPIj4J1TxD6W3Cc%2BAM1G2VMjJd%2F0j4yBKj9UZYZI1N25fEHW8BLzGNlz%2FP%2BEDakF%2B3j2vGYRXf8zidKZFOZK5Pjo9ywbpZxI3MSn8RQjUw08WXzAY6pgHod6aDtKGrWeaSdEjgxxmhAHIszfqaPvArUM8SWMcuK%2F31sLIn5q%2BMsbHugLM5sKpTwkkiKrcX53EZFlXzA1%2BiRycG2v2ZDjY3PqMiMy4cpcKtKdWUV9fTTsncNoDp5rTbA52Pnzq%2BdwsTtwTm0Q0YAQPG03Qt3ulLMMb5mzzjYyuE5XSCNOsByfI7tWSVzvG8ipcNydanEocbvjvo9KmzX%2BnpdrnP&X-Amz-Signature=82a5972c0988b31873a8c4d6f884d63f5f32180a178ba2db2f468653c8423591&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3PVY4ON%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDDUEegTVPANNBhfiKTuQ9pw2KFYnrm13s%2B%2F9yKQJd4SwIgGdpqQHRQGqUpDtpNTN5l32qzJCFoCgAoZhjc4BZlCTsq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDHXKWZPG3TbXBoz5ACrcA16ULbSdopeQTL6skEdNnQb44%2FGVub6BnpnZ5orCGW2IyzNxxC%2FH%2B2lgpedTNz8PXrarYTjZfPWzmqe4v02lN7CxvjfwPFKK4A5GZTHMQZ8nVZxIt5PhSMYFq%2BM66gcym5cbqzlj%2BRkaQCpTCyjHc4tV4d669RqFPsqeuqFqdUKw16RjbceheNYivqqEysICVBJ0vFqUxdhgSjOUTgiNfB3oNxsgNQpITO5A8actNmmAkbfJ%2FpNeX96Az%2BPBaaljmNtTGFu50rWRNZi4BXbjeCjLYHTbPv9LnZ%2F4wHJhFwvPCvj1C7VdrrCJZCrALIG4lAN3RPzmNkMcftNOncVV4j1JHa72nzvtIR9MggbxLkUIFooYB%2BCqIDWPcbPMQMONmAmvhYDM2t6gn5Kt1utW0Jks3shSq%2BNcM7mbDW1hzNUnXknu58PTdNyqS1fwrTOQlgmap8hBBJldMiHZGN2F3DIBKy7hTA0m1VmYXbnAScWLArAZE0OnUepGnvBEPNWu%2Fv3ktVM0mDPV4Gy8qkeO8bQVq1JWeSEL641%2BLsD%2BkMbTOCVZuh5lqyfpn3E%2BhZl9oh6431%2BcuGJx%2FNae3xsGln31iaiZMuVZMB2PNe4klzDOFWab9cAxePBzEyPyMNfGl8wGOqUBCZpeNLzfE5msRIB9ryy1E%2BzxjjzpbVG24WnGt6lI33ItYZou7ErFB6tzuN2%2FGC40m7myDt13OuunNGSo4%2BmZkK1M%2F7YYkXyl%2B2u%2FA51vvaDS3CUJgmCe5mSkeWMIMF%2FeZCVaotYg%2F2I%2BQnjAdyOLCpEhLpDSIsAM90BQy1V31YUFmzzyI21KC0gb2%2B%2FM3pTKQCRwgH%2BqONv%2Fyn0XCQdSVGVXVqbM&X-Amz-Signature=3073d61b47d7888c2dec1372521dfc5ca757df237379184f264cc1a8c7f11f8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6LH2AW6%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIBwV4Bl%2BSzZphaU4pyyqX5%2FGeLsPyd2KhaBSvHQDkA%2FSAiAvXF%2F65tzgmPbi0DtNA8ecwXJzlvmHCBG1kg3WLcNQTSr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMOCBRnyQvVMI2Fi3IKtwDd9qlZXQvLjASbzyte%2BY4YZO4u92xl7TUXn2YuCu1mMVanqMQsuf8pi1LYKSbBVZ7vu4JN%2BW%2BQQBN6znpQFOfMRHXxBZoRWxtZNMKwOQ02xMlftnGgVChEsWsOwWNmrZ61GPPxn8aMKFCNcxSm6dIOl7IPmfJkoUZoPuKD409Pga%2BDxr1LP4qNAIxEhk2EqX8aFUTOavzqtHYOIC2oCsbw9yQ%2FDAlGvVwSAXgnNspSZKnCoA00bZQKtUYR8RY6VUCX79jtNZLNvTmYAVE%2B0Je1X95qW43w6UOMS8sWQaifTvNGv87SUATC%2FY5sQU6e%2F1VkakgDmvRLzTrIVvVeYE%2BIpoOazDPkn8x8mkSGN8UT7cEQ5iCAkoL1NAEDl8%2FQLicI8eCQFF6CpypFefFKCMFORiwixbNAEqGZrpP%2FZFacRvFrvNVN0B2zFr%2FuInR5tFGtGljyVu%2FnuxE2UYPYBsszhGrfaCxwVXiL3WPY5%2FUEJ3QfPd8odd7CuvQ2S2PeZSpmki7LUdJV75kA%2FwwE33nVv%2F820H0TaGmiJDBy3F8G0%2BG1x81twfE51f%2Fh5YP8aYg6x%2Be3v8YOp7RtqxUhFX6YLArrHkc8vaTAm2lFK5W16Y2VZCPXpIdzsJOXoQwhsaXzAY6pgErFrrnqfcU7nMIExNVBa8u1z6vrR%2BhUyFuCIVpSHiK%2FrLsRwHkH8ApO9pZLid7M3NJ25z3wfRZ%2FcXupV7Rsqey3CsiFDryuUfxmlwQ2kDeAK6NPs%2Fl9C51y2Ok0oE9wzsnUZ%2BlpHOYEgsKc6KpuTLklte56Bgtn6SdmUuRyMA4Jjd%2BkKKQkiaaSfEIZ4SANmdcoDehLXbKV%2BRR943dSJO1fSClL6jj&X-Amz-Signature=cd415451e42a2157299254fb71541e7b455797dd643ef571172dc1cf5eddf2e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6LH2AW6%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIBwV4Bl%2BSzZphaU4pyyqX5%2FGeLsPyd2KhaBSvHQDkA%2FSAiAvXF%2F65tzgmPbi0DtNA8ecwXJzlvmHCBG1kg3WLcNQTSr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMOCBRnyQvVMI2Fi3IKtwDd9qlZXQvLjASbzyte%2BY4YZO4u92xl7TUXn2YuCu1mMVanqMQsuf8pi1LYKSbBVZ7vu4JN%2BW%2BQQBN6znpQFOfMRHXxBZoRWxtZNMKwOQ02xMlftnGgVChEsWsOwWNmrZ61GPPxn8aMKFCNcxSm6dIOl7IPmfJkoUZoPuKD409Pga%2BDxr1LP4qNAIxEhk2EqX8aFUTOavzqtHYOIC2oCsbw9yQ%2FDAlGvVwSAXgnNspSZKnCoA00bZQKtUYR8RY6VUCX79jtNZLNvTmYAVE%2B0Je1X95qW43w6UOMS8sWQaifTvNGv87SUATC%2FY5sQU6e%2F1VkakgDmvRLzTrIVvVeYE%2BIpoOazDPkn8x8mkSGN8UT7cEQ5iCAkoL1NAEDl8%2FQLicI8eCQFF6CpypFefFKCMFORiwixbNAEqGZrpP%2FZFacRvFrvNVN0B2zFr%2FuInR5tFGtGljyVu%2FnuxE2UYPYBsszhGrfaCxwVXiL3WPY5%2FUEJ3QfPd8odd7CuvQ2S2PeZSpmki7LUdJV75kA%2FwwE33nVv%2F820H0TaGmiJDBy3F8G0%2BG1x81twfE51f%2Fh5YP8aYg6x%2Be3v8YOp7RtqxUhFX6YLArrHkc8vaTAm2lFK5W16Y2VZCPXpIdzsJOXoQwhsaXzAY6pgErFrrnqfcU7nMIExNVBa8u1z6vrR%2BhUyFuCIVpSHiK%2FrLsRwHkH8ApO9pZLid7M3NJ25z3wfRZ%2FcXupV7Rsqey3CsiFDryuUfxmlwQ2kDeAK6NPs%2Fl9C51y2Ok0oE9wzsnUZ%2BlpHOYEgsKc6KpuTLklte56Bgtn6SdmUuRyMA4Jjd%2BkKKQkiaaSfEIZ4SANmdcoDehLXbKV%2BRR943dSJO1fSClL6jj&X-Amz-Signature=7db5016981640b6423274b2ba937e7d917cfc128e2481526779be8caf91835ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5X5BWEN%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCHw4%2BW5vLUpdsBh9FLSjQXmhnlo5DuQlGrKEJtWbbOxwIge%2BH%2FMuzSinvNbomsjvlMD8R4L0nCPCBS8KDznjvo1DEq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDH6usVxklcb46M8xpyrcA5H9FbA7gCg%2FN6kT5v1WCSggF0zd461IGRLbSN%2BVzf2Y3fSew7gdZyeg7VOvBZNPyfRChs23BM8vjr529NQVaZK5RM4UEt%2FeDeyhddbM1X3Bhav6X20W87dyOTaa3kP%2BmU%2FDheVcqHq6rG0%2BkKTpvg2lnJF7szKjS6snIo0uVEYXcU5wm4pQGU4zwVoqTwhPHYqPMNsYVO4ss68xBiNCC8rWsq%2Bo8hE%2F19JUHlrDso2Jbnc%2FYPuYSXzKYC7HytFXh1azXqIJG12qUDs5pH02DsIH4mFnMfhsxj6QhxmOh5YuuMuqmeXnkee2TlwWFHgXRU06%2F2v6IrPTvdSUT1Xgp%2BDpXdwR%2BFsalJppzLvdXkrWwTT3p%2BUF1QPIQU%2F7Wn%2BkPKEoGC1kORwbciSEpWGd66GPPwexFyYhk9e%2F4LewDQOP%2F308WbA58H6YU5ZqGrCW0wCgc01Mb1Z3fANFtv6dSeNqyLm5Mqbw5X%2BHWadnESw1gmY0V9apWjdkHDkpH2x9pRmN7dt9BiLZId%2F4It2JNVvyR0T1X%2FvvGw4VOm5rSBiNLzTr0Mu82r0s%2Fv9UngWIHZiVC9T0MA%2BPvEdWAJkKNf32emnzUge0LFVuNoqIFI0kdfbOOx3XaYEDojj8MOHGl8wGOqUBst6EvPpjPSlLBCDNruFrIuynKKG7LJOhH3rVtFzAIaUxuzMVk9oaScMobedbWFpW%2FA8i4Mi9TbI31n2RnjMaGHcLtiaL5HfzHjmp3JASvzHMD530OqfP4FMEmjni9XmG%2BMqz96h%2BbcZWPvHVoXzjTg8taljwyWPlnLlQk2oCxs0qV2m%2FhJifQgHNF6rW5mp%2FucGC6Is4lDwlWdPCi7iFi0nXSPaP&X-Amz-Signature=42565082a4a4a67c92446cb742fd2ca528e985b0348bf61d54d4eaec49cf66f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKK4SD42%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQDi%2FsrY7rb8%2BrtGjocirXZBczAWKVSV%2FXnlmXhxiOF1IgIhAOTZ5pCX12qoeQbB%2Fr97PRZYAIkQXPG2D666H%2FOgscwwKv8DCEYQABoMNjM3NDIzMTgzODA1Igzekk8mmLjSmadSDEgq3ANFJkopoUBwLmEEc9eBSNSBebQdD0f3fXaPuqYgtLj94XdjvLuLdOlCcXWaHw2RS6ukfylDMWbaDx%2F%2F2HnqpzYN%2Bul6hhFrcUufRsbRCXPcEs7l%2B05lM3ZiRqHhpG6F2zKtSu1HvwszgXAsy%2F2okc%2FFMP9yjHWTX%2Bb4jz25BIK%2B1Ix5LuKahw0T562n9p%2BLJGz%2BXiMEzdJx6%2BQIDdizEgvfRSQlWcFkGlM1fu10L6MppvvzmESxFXbHEqzYYKtX8fyT%2BCOjnNYoNF0qKjUE4mvJ93nemktOhF3nVFH%2BS0B1S8ARBvJkd2FKf89cbrEEfeXuyRquM2GrvFaFHEOhs0Ba0gFUIutd3EpKymL6wEqzRt%2B7mfGIXGzVpil%2Btahi0hfeYqXmhcYnGf2uyIUR8FsRxS3hOrWN6mJaQDK07%2FB%2BmMhrlWhD1%2B7e1k61SzpueYnE2E6C2BkSwPLGqNanON7GXh%2F%2FrvS%2FV6oJ9B%2BHwz5ruPjekfFWCwn8F1Iq%2FEUsidrCEwn90sZZ89rAoiqbQxNK1YQl2YyGI62jxJjkKHz2NJ4tCmVQ85hSBdmn64LpUffIOQJHY1C%2BSFQIhG7%2BoVgLNsUAhqPL7fyvxdKOOMBipWa9exTq74pl4yvZxzCexpfMBjqkAULnVAELmFzVPMsTeZTYaUjdmbOgl9ZyRBXnzIEyYTJqqnKMDmFKBBAsEcseaCn1JTGdH56mbHeSbfMxzalnKytkG%2FFOBaiJLm%2FgKQtMA9j0j%2B62ANWohF63QwQq3wYAhkdJUaO%2Fvgdjh5WyqpkUk95oUnTLi25MzRbfxJloNCvH34m2l2uVC0NWFyxPq%2Fu3vBO7IY1YkqZ%2B2M884%2BlMc9UTV%2F4T&X-Amz-Signature=ec6f7978f471b5b579465298b4311e28c10a0b85cf1bad78149fb6eb180f0f79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKK4SD42%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQDi%2FsrY7rb8%2BrtGjocirXZBczAWKVSV%2FXnlmXhxiOF1IgIhAOTZ5pCX12qoeQbB%2Fr97PRZYAIkQXPG2D666H%2FOgscwwKv8DCEYQABoMNjM3NDIzMTgzODA1Igzekk8mmLjSmadSDEgq3ANFJkopoUBwLmEEc9eBSNSBebQdD0f3fXaPuqYgtLj94XdjvLuLdOlCcXWaHw2RS6ukfylDMWbaDx%2F%2F2HnqpzYN%2Bul6hhFrcUufRsbRCXPcEs7l%2B05lM3ZiRqHhpG6F2zKtSu1HvwszgXAsy%2F2okc%2FFMP9yjHWTX%2Bb4jz25BIK%2B1Ix5LuKahw0T562n9p%2BLJGz%2BXiMEzdJx6%2BQIDdizEgvfRSQlWcFkGlM1fu10L6MppvvzmESxFXbHEqzYYKtX8fyT%2BCOjnNYoNF0qKjUE4mvJ93nemktOhF3nVFH%2BS0B1S8ARBvJkd2FKf89cbrEEfeXuyRquM2GrvFaFHEOhs0Ba0gFUIutd3EpKymL6wEqzRt%2B7mfGIXGzVpil%2Btahi0hfeYqXmhcYnGf2uyIUR8FsRxS3hOrWN6mJaQDK07%2FB%2BmMhrlWhD1%2B7e1k61SzpueYnE2E6C2BkSwPLGqNanON7GXh%2F%2FrvS%2FV6oJ9B%2BHwz5ruPjekfFWCwn8F1Iq%2FEUsidrCEwn90sZZ89rAoiqbQxNK1YQl2YyGI62jxJjkKHz2NJ4tCmVQ85hSBdmn64LpUffIOQJHY1C%2BSFQIhG7%2BoVgLNsUAhqPL7fyvxdKOOMBipWa9exTq74pl4yvZxzCexpfMBjqkAULnVAELmFzVPMsTeZTYaUjdmbOgl9ZyRBXnzIEyYTJqqnKMDmFKBBAsEcseaCn1JTGdH56mbHeSbfMxzalnKytkG%2FFOBaiJLm%2FgKQtMA9j0j%2B62ANWohF63QwQq3wYAhkdJUaO%2Fvgdjh5WyqpkUk95oUnTLi25MzRbfxJloNCvH34m2l2uVC0NWFyxPq%2Fu3vBO7IY1YkqZ%2B2M884%2BlMc9UTV%2F4T&X-Amz-Signature=ec6f7978f471b5b579465298b4311e28c10a0b85cf1bad78149fb6eb180f0f79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RKQX3KO%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T135150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDl0UM4GRMqc8wlAcGae3%2BJlF2PwDQpg3r%2Fcy0InVsR1gIgaImYRnxzAKKasb2DXvc0ASMpAqvRhk1pm9Xw%2BmbYnjIq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDEuzgY4oFjsfXOCroSrcA2GsX220e%2Bx7FalZBptMb9dOw76UnvfEarlnow4yDsAMj2RGQT98xR9648DTa6NTpRuFLBaeEIvSGYTTlH4c09VI8ff9uh%2FZJLegraqB1gt3TKJvr2078dxs4cfkzS%2Fcuyv3FMUf2MljRm%2BNTfnHaTMoo52dtB%2BWtzURzX8X4qxs2QJP41tWdXg5tFEKjl4mXbDGC9AOeeMxwmn1QonBJMImVkkF9f%2Ffx4d7ybFIIyMAXG6vETajmgcnmSZJuqIR3XXeiuNh0%2BWdMjiMRJJx8k5a7V6ejGj9RGVeTyBWEemlhXlRhCUW7Sb9Qhuqb7LMOsJQcaT5q3kqSVeb6X0FWDhMsed5jn7D%2Ffr08900c71REKFeeQI0nvtABTRVmp3C5j%2BOmgzUoLbCxaS1mKoldBHf9DpFBg8h5Nnotnj%2BykBUv%2FzbgA9MU9k5FWRm6MT68PDGbpt7g8CNRHJxW8NfVvNidHm%2BuLAq93DSCAmEAI%2BC9mkG5O%2BL8SOoHNgNn7vdfcl28dx%2BWSZ2ZBvHwYw%2BieYKf7taZ2RZOdXiwnjiebWpkvcThsUtOPMPauD8Rr1uicVChUdCQm%2BqHo05OtwUPutA5aeX%2FpoNFND%2FvO3HHn1ItKztu5n6KojMfSpHMITGl8wGOqUBCw8C6KLplp0oEm0YibOfr%2FrMxisPu7dwI4SAdMLHiFsXgtAtk6kXMZ0SbHr9CpL8ocUbC9BS%2FenXolkLLKLait7ODmLopapo7YsFufd%2B%2B0TtRjvmcc72HpU%2F%2FDa4YEAXUSfDptMpXj9naaSk6tqOQl7MgR6KocEkYCNCneP9vx3zfEGkmbyqb3lDhhee6UmLv0jrW%2Bul933tID1vPmxF0%2BjnWio2&X-Amz-Signature=ec4d430fe0e5de48bf25156bad4a67d38ab6a8a273854289ec340c775cb874d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

