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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VA4ZFVLE%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQD1Ae7tQgQ4dZo4UpEqgoozm29U1vD7ND3TZ%2FwUDY9hQwIgNQOXUZuuRG5UEnCNne%2BvfRwbZb0QN8jHSR1AQUAjO%2Fcq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDK9%2BAyTCuNg99Wo4PircAxUVyAo0SRCBnnmByxNACsstIhyAmkysVyQnPJoCoIhRJvKroFdnJoNvTRTnwsweOBNcnD%2BEvVhtYqnqoxwPibIVBGQaXcNXi8qjr0MbrzY1aKIjxOvekH%2FwYb8i3RyEYjRXdma221F3%2Fhl9djRUbiupT4LSRg2O7PfWQqaVDAD%2Fq2fnNP%2FNS5KYVcgXdJBrkTc8xsLyHZ8rgMZWZueLK79ATpJuGiXFe%2FsP%2BGiYybiLSQHNu1Yewxb1b8aLwfrJF2lBrLJJMiz9MQtGlN63BqlKwj4dbZ6DN5%2B9qFJI9dYmL9cAWeLo1d8nWFF2T0vKptC%2F8yw9LAYupqFdh6lIijL1VvshH9MZBDL3PHd8HhQwWYlRyWB%2BVgyZsZjRZF3y8oOxtBFiDkWflv4TjwRD1P3BnuMhna9riW3zi5zZh1B5mWpgpwdMxTt6efZ1gfTkuWh0Xp%2Fkk9%2FYoWf09a1TO7ylgKJDA4n%2FhGeTMWMuSMBPzvXfOV3FpROsaeONf%2F6vjvMxMxgiicsTLb%2FkFRS0MJCFvJ8Ga2snRRCN4hZjVtC%2B3WhSP%2BJ3vu4ppwqmzTGP3KQeimye0fE2zmWUojRx3lU0VQPJ24ddcGcDgRpifBRIXD76rxHVNyToU4n2MPWDicwGOqUBvlfdLfwWrymD%2Bg4GMXQ%2Fq9j6gdCbBb64BKo0rrf1XXrz8dLf%2B%2FLNgg6ZNfSb1pCUQaOK7SC4SyuNamIffImNAGMuvvR8TmeXPOQ5L4gK90EITlLXDK38oY%2FqWXxiDhFCsRTFbtEogTfvJ2r0wMAbJqHucZRxLCRJRIW8Yxbd6v46y9eUiA8ZYdGQNHpE0B3NMssXqUtVBK%2F1ZggHeVIPjiHIko9W&X-Amz-Signature=8fdeaddc456af1443209f2ee7397c491f11ce8bcb3a3f1f87977bc89c8a216c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VA4ZFVLE%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQD1Ae7tQgQ4dZo4UpEqgoozm29U1vD7ND3TZ%2FwUDY9hQwIgNQOXUZuuRG5UEnCNne%2BvfRwbZb0QN8jHSR1AQUAjO%2Fcq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDK9%2BAyTCuNg99Wo4PircAxUVyAo0SRCBnnmByxNACsstIhyAmkysVyQnPJoCoIhRJvKroFdnJoNvTRTnwsweOBNcnD%2BEvVhtYqnqoxwPibIVBGQaXcNXi8qjr0MbrzY1aKIjxOvekH%2FwYb8i3RyEYjRXdma221F3%2Fhl9djRUbiupT4LSRg2O7PfWQqaVDAD%2Fq2fnNP%2FNS5KYVcgXdJBrkTc8xsLyHZ8rgMZWZueLK79ATpJuGiXFe%2FsP%2BGiYybiLSQHNu1Yewxb1b8aLwfrJF2lBrLJJMiz9MQtGlN63BqlKwj4dbZ6DN5%2B9qFJI9dYmL9cAWeLo1d8nWFF2T0vKptC%2F8yw9LAYupqFdh6lIijL1VvshH9MZBDL3PHd8HhQwWYlRyWB%2BVgyZsZjRZF3y8oOxtBFiDkWflv4TjwRD1P3BnuMhna9riW3zi5zZh1B5mWpgpwdMxTt6efZ1gfTkuWh0Xp%2Fkk9%2FYoWf09a1TO7ylgKJDA4n%2FhGeTMWMuSMBPzvXfOV3FpROsaeONf%2F6vjvMxMxgiicsTLb%2FkFRS0MJCFvJ8Ga2snRRCN4hZjVtC%2B3WhSP%2BJ3vu4ppwqmzTGP3KQeimye0fE2zmWUojRx3lU0VQPJ24ddcGcDgRpifBRIXD76rxHVNyToU4n2MPWDicwGOqUBvlfdLfwWrymD%2Bg4GMXQ%2Fq9j6gdCbBb64BKo0rrf1XXrz8dLf%2B%2FLNgg6ZNfSb1pCUQaOK7SC4SyuNamIffImNAGMuvvR8TmeXPOQ5L4gK90EITlLXDK38oY%2FqWXxiDhFCsRTFbtEogTfvJ2r0wMAbJqHucZRxLCRJRIW8Yxbd6v46y9eUiA8ZYdGQNHpE0B3NMssXqUtVBK%2F1ZggHeVIPjiHIko9W&X-Amz-Signature=8fdeaddc456af1443209f2ee7397c491f11ce8bcb3a3f1f87977bc89c8a216c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TS7WNHG%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDjlv3Sa47Ee6DhhHlz%2FCgQTghWJjBeNY3nKPq5RgVKFAIhALihgPdsLHYTrVkZmfaURrbx1cvBHnO%2F0xvOajQ50Be9Kv8DCAQQABoMNjM3NDIzMTgzODA1IgynR6jBoyD3FRCao5gq3APxaakMHivFwL6Am5DmWgOWrCKM0JonbbEwSWThFpL%2FFCnjXkwTFGmxILS%2F0ZUEP3e6Addv3JvqcebmFP8jEhmPinIovUusOcn9dxWtO7YojJCOvkRjyujJJSNzUOxf9ukdgsA7WlB1wOYjFp%2BC1lnXLkfwkDbTNn8wZmAXmIGL0v4cNkc4LL%2FuY7Ou5CSXw0sgy9zHW6l2oS26Fby8EsOjbByYoy4BkctHYb77gq%2F4qEVQg%2BK15L2HROgyGuaWhS6QsmDWsbCGh7E1L6E0TIcoklXHlzEwA6hknDZ646UYqyfLHk4BwyhLDNbsaNZjT6AloWHxyAsPfgsYHgRSz%2FaKES0TlIVxzjs2ZkXgsGsj%2BgxD1tcFfpPDivzsOFlBIgMmLPYHHhlKnrJssQFOHsl4oMYNs%2FtKRQQ%2Fuk21eRzYiTIGaF8InmbM2b0OA6JSeGXpwVxb5%2F6cDb14ngN3sFRUuW%2FJhtuDiz8gOag2ZAyfK5a8EAqPLBKVgURbEk7nAn61XG3J6fQ56jsFHerr8wIdRec5eH3BiHj9CEzqah25xCKXNp7h2%2Bbp167gLWdyYN8if8Kjrhj3VInZMEufQObin5qFfLwApCpJ0%2FuPW8kcNdybL0ZaIbp3z9LSAjC8hInMBjqkASyNp1BtY7rPyQ3Akp4J0CCO5sOxPn6GDJV88WGJ0zdTEVNczM62VwpWXPkDOo6hj0RjkYrI%2BL%2Bohk7I1REsoeMhLNorQvEb07sBN4JKVy5Nn2q0hQN7%2FxrvGGnwLw6TGwFrGD3PQy%2Bc0S%2BhRBM3lt9NRMxtF8v%2BMh1LDVbGyjeord%2BL0gISu0XIfDjXQHDXlx72cH5GBqt7o%2BbsPMTAYZNmUSHM&X-Amz-Signature=65f598e12aeba4f2f63cdafbec1d2ebb322da36a313fb34fcf7e9dca5cad0fc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TXD7ATE%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIC2WYE7toNFeGZIbn4XyMwoq9bE3x7DNHgZf33wp6ArqAiEAmTrSb%2FiTfrs8q8nhULiYv4R69rpY86vEfpHdD%2Bni%2BPQq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDF4JpyEnB5oI%2FjDSxircA8Bbo%2B1MelRlUCGrTfMHOThOhfizzfZZ0lbEUHhFJt7LJe9iZ2OC8SgsZJogxegS9HfhADzAVmzXXKvdh1EwQLuC%2BemUh6kBj1TeNXCBCQCDn4TU5SYjHJUPoACQGE%2B9ACFxrA7GlSCOzMosXP%2B3w3PYEADeea2DHWOzFDTzeFW1mlCdP6YHojfdiHoRO7tlyAqT86%2FwkWpimkptwvBkV4wnMZD4J7SPVm5ZH5chDEck3fpRHrEbrbDUAmbnlf4OruHuvEte6lAanaKcP6jjocjqbBBpAhxQm8vFfeRXrI2plgE2JKSZj5L6YBynXmAzhk96cTxYg6KuG1uVpAfSukCTFefWdEKFQdiYWDQrAh5Wx452c%2FK8fpeIo0oLpCmF0r99ATDkFRxO04vH5Lck4DmZpQ1KK7pqaICZw2AxFnYye5kehsHqqZFOMcJiF%2BWokbMYX%2B1EuWIMRRHS9yWF7JJzAcCGaWL8hXV8Ux2NnCHLiC30PaY%2F6HHK2n19ubnObRjPgOlZkjre4i0xET5ZTLV2Z1nkiILHZUZq1ZiSAo37aOUhMNvPZfj5wM%2BPSHtTyatDkngOZBeICIjCiszhvS2ephbrsMkb594Djv9OSbcbOgIDsDco8Ki2FPNUMPeDicwGOqUB%2BKpA7CcW15huNPxmOtnW99NyUclaN%2B7QVg3%2Fv5bkefUH8%2Fh8npdZOdqTWJzhbUMWJ7S8UWLnIJv3BT2qeKYz%2BiVZoAXgEYRHTv23ykBJzSsmN7i9Cl8%2B%2B7dqpF6B7%2FO46qOymSBRr%2B%2FgkDx2fbMM6XaPOlNNerW2RkNsTojnyiyRVj0Rx2FfypuwA7kKh7fNgw8%2FCuweRXntAYJJoH0nUi%2BSVNRz&X-Amz-Signature=917035f45caa842dad7e9028ef1aeda1d4c7128933f9c9178e5ce0d8573cd63f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TXD7ATE%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIC2WYE7toNFeGZIbn4XyMwoq9bE3x7DNHgZf33wp6ArqAiEAmTrSb%2FiTfrs8q8nhULiYv4R69rpY86vEfpHdD%2Bni%2BPQq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDF4JpyEnB5oI%2FjDSxircA8Bbo%2B1MelRlUCGrTfMHOThOhfizzfZZ0lbEUHhFJt7LJe9iZ2OC8SgsZJogxegS9HfhADzAVmzXXKvdh1EwQLuC%2BemUh6kBj1TeNXCBCQCDn4TU5SYjHJUPoACQGE%2B9ACFxrA7GlSCOzMosXP%2B3w3PYEADeea2DHWOzFDTzeFW1mlCdP6YHojfdiHoRO7tlyAqT86%2FwkWpimkptwvBkV4wnMZD4J7SPVm5ZH5chDEck3fpRHrEbrbDUAmbnlf4OruHuvEte6lAanaKcP6jjocjqbBBpAhxQm8vFfeRXrI2plgE2JKSZj5L6YBynXmAzhk96cTxYg6KuG1uVpAfSukCTFefWdEKFQdiYWDQrAh5Wx452c%2FK8fpeIo0oLpCmF0r99ATDkFRxO04vH5Lck4DmZpQ1KK7pqaICZw2AxFnYye5kehsHqqZFOMcJiF%2BWokbMYX%2B1EuWIMRRHS9yWF7JJzAcCGaWL8hXV8Ux2NnCHLiC30PaY%2F6HHK2n19ubnObRjPgOlZkjre4i0xET5ZTLV2Z1nkiILHZUZq1ZiSAo37aOUhMNvPZfj5wM%2BPSHtTyatDkngOZBeICIjCiszhvS2ephbrsMkb594Djv9OSbcbOgIDsDco8Ki2FPNUMPeDicwGOqUB%2BKpA7CcW15huNPxmOtnW99NyUclaN%2B7QVg3%2Fv5bkefUH8%2Fh8npdZOdqTWJzhbUMWJ7S8UWLnIJv3BT2qeKYz%2BiVZoAXgEYRHTv23ykBJzSsmN7i9Cl8%2B%2B7dqpF6B7%2FO46qOymSBRr%2B%2FgkDx2fbMM6XaPOlNNerW2RkNsTojnyiyRVj0Rx2FfypuwA7kKh7fNgw8%2FCuweRXntAYJJoH0nUi%2BSVNRz&X-Amz-Signature=da3f10acee00ae7268b11a6740d30d0b11337c2ddcdf9e2f2fb793134efaebe7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZDERMYJ%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIG3yimw9hx9TBuAqyj5fMCCfsXvvFSX4kRFzdp%2F45B7iAiAls1SB7IjiQgimnOX1QBGDmjxkP6W9tyWIBu%2Bper%2BSnSr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMSuTBz5E5X8Yr5vJvKtwD67ECEaRV3bEaZTQDUf%2Bwswez5ePzwViTSv8VqeY8MhPWq%2BznuPMTyEcupuUTU0G%2FrAwzDDcLRsY3zDBB9960LWSIEZX3M3eWg3VznEGaKVbP1JxOhVb%2F528Iig6zqxVkmP%2BFUABCATZ2V0Dnd%2FKkGDiyC0KH9bimlwFiDnradyZc%2FN3elQz2%2FwwrEJM0nL2RwkP4OYTHKN%2BhEykTVCmxTNBATv5ViiX7VrDMjkAN0O2Gj8UlIiMMVTnVxNRQoyFVhaLNiG4nELJTiYaeGQ3WEPT894mhl4j4ILwPk6QW6LoM1qG5Fxv1SVbVkn2I8IkvpzLHsdjN1Lnhgg1ww%2B8QOveoAd%2FT21RwnLXfOwPxWu7ad00ZuThbYB%2Fs0KbpQjnW8I9g4iZVtyKsL5YlLzA7Ms050%2BfYjddawFKcPfSaKD5G6kRPIFJ6c8jk8QpCzZgLh%2FCdXao19EQlPe%2BWNDCl2Zqxy%2F2q0tlhQDOtuohPtRl72%2FzRw%2BnVoPWNszW4IRQRFR3lJitQCPxpXcXEAzPR%2BjQjXHApK2%2BpOr3HbAkPimb6XWq9fyQPRohwm5ueNQP7ieOFRAG0%2BqKCFKfn0vzHQGRTFeclpP7k37Vyr6jPt8cYfpBs7bupV4E7Ofsw6IOJzAY6pgECnezEmazXY70%2Bk62ldvw6ubnzYXu5HdxYDKXqlypaP8dadazCeGjuJt7x%2BgwNvSebMh8KiUpA5zRQCGUjlLIcmVj9%2F2C6h%2B6gv10X34juEXWF3QPXjtJO6o3XD19Q5MsBGEA7QVQ9tENPQXVIuMrMohgILyfp%2FcAcSdHkRDU0wv9Y0HkQXB5gZy7uKA6z41rz9h8vbZfoDtX21sh5UtKaSln1r3wI&X-Amz-Signature=00ed0bf63262411303b290cf9a4ae195c0ea2c4edfd73c41880b083072a90289&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UEBA6WW%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIHnEDwPCaQGCppXh7D9FpvNR1T%2Ba6Ziok9UKDi%2F%2B1UbUAiAtuFCLpZ2n5Rjw6Q3VQ8x3k7n3mLeGQb09JB2ENhy%2B0Cr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIM%2BWeXVwkXtRjHXyI8KtwD73VziwSUqlVVnPNnQkavxPLwUcMh6vcXgRgGLA0XoE%2FsV7AlF3tqdqmGFj4ntGUDotZGYYGXhSORwVfQ1xT9uVjKEDow0WQvDOSmbnMzz1BKeo9BRjnxlT0tWQm%2B5RNqeK3BdL8AJ6EOyF%2BcB%2FesUDtnOsNQLpPaTEVrdYl%2FpkCGwjjW2mMUQ3fnXOkt7EcgciXX4Jhl5Tme%2FY4kU2vk72PmNNwTdLP4w0hwzjKK0ATNoZDZe38%2F9ldzayPlHri2dCvevTJNVgI0fZaDm3fR6dFaohaHa64LSdYFs1uUhjXPgDJPyd0n9B89XDlD75hDHRQpHg7vQo%2B7Mom2Ez3j%2Fqa0x3jslEX0Q2Y%2FqUcvo3gSPvzUWjPTYcD%2Bwib1MhNkGmEZsmHFcJTkwrpUZRQ7anexJJ%2BK6dZt%2BpDlcfDIS0Vc2deSeMwmvsLF%2BDUNtrahfMrKt4gsDP1wI6BvpLJmwYRJAB%2BFjGxNgf0iUK36KHeV05sBEuEY%2BJYw3Am7qX4zHdbS2yNTu5EnyZuMxRMXe629fehHMM4Hlx%2Bks8nJET%2B6ifSYz%2BtoHAff%2Fpqw%2FSDuxJaYQKn%2F1NAI8CjOIVGBC60PcFjWY5DTpHYuh%2FLixrjIO95IQ2uXi54kGAUw%2B4OJzAY6pgHnbewSCnyUMGAbB0RmLCNbeYiTif2vQh4sccheqgnFLgQJEvBHaZMepoCgFfKM3TEXR0z2nBfnKUHXEkeylgxi%2B88HQt4QfJd4XyVECnqSDJervE9AnSGnvWDWYJK9Lw%2B6OYISuM6rlHuWFUpR0qLecJzpK42JHkmO7VAOCPtxmlWU5j6CL3xLjqFqspsKk7Wi4Vbozqq5GS3Nu06xXF6VW1CPExVR&X-Amz-Signature=5a2a2598fbd4fe60c685cd7938114cf545f464015f0ca5ee31df11bc0b7f753e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PTEZGXE%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIDOCk2QLxnY%2FBJlw5VN1T3OSDh3mD01OiWbgxv7P43mEAiEAtEz6EpBkJMAJ3o2qEsXbA4aZtC9NL5mneHGfjqJfkm4q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDMwIWYPrpuLxn6oi7ircAxAW8i91aoprY9RoXdtfSuTcFIN8Xj2uyrYrlNU%2BZlwvfbNRWrxDV5Z7lkYXhp0UT%2Foa8h40%2BysFZUwzlWYswYYRFiHHyRVig%2BAwMyHr3yJ9VDh2Ll7z2SWa1SqrtnvR9ZqAAgouxHAL8wePU35eaVz8aHh9iHQoaoiTOhquqYhwYwPLIHMl7EabRjQb6bHIMAhChYP5QHx7ba5gMfbJHJ88hkswkN4xz%2BPhtpF4LD2wy2znxZtlW8qXwTA3LAOUZ%2F706e2q4r7mN%2B34Q6kuoFLcV7ptYm0%2FEeF8fgb6Tg5sKukd%2B4BOMxltRv2i%2BRw5lqFVhE8eQkhjpRotQHYLfw0JqaYsvzJOK%2BuFHBNHWfbvZqaslY891HS%2FNwjHIVzZRPzC2SYkxtdcBPK%2FwwcuyT2i31XeyVqejdSO%2BRHDBljQTjrU4m5heN8BMY9tXNXIVxoLi1a7qHTZUMnE8ZShY3uAtW%2BvRuQakF9oviJ5XNp5ERyX7sDqdFFBbUIJc5xxQoLxsPYvMDAYzOb6FoiNrkesfIpKTb5BH62md82xVVIEZOVEIXYa3QTLf%2FQzuenzdQ5Rg7k5tTRfzEtEucCp72iBZMAP1aT%2BKWCtUpO5uzqcbdZP6w7Ppa%2FQIgdwMNiDicwGOqUBffHKMx0LTm%2Fka5fzQdlGzODfJXpWttZBl9hGXkd70%2Fkuc8w6vyxZqxz%2BuvdBJAqUO5jKUj5kq1RV46UlRa%2FCf5ynIxscNIENDPx3O%2FTMU6OOMHul8bTQxjn5Ja%2FUNOZeodUqozkJmLHOzZ2AMxFs7206YMmA%2FYWTqcwBPxhN%2BmkW8NiUF1VLB9tSDOnzBeQuDK1W7BvWeSc%2BiXU%2FOw6wDkAjubMv&X-Amz-Signature=08ecd73770b492ac26367ab7add63749c479f7e9013262872f1724eeceed3c46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5L43DBE%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIG3TlStIH7wyXULRyJWHQ9Iy1RQlT809gfJC0UWs%2Fc9kAiEAzS1wROuzp9kO%2B05DL%2Fc%2BIQXE6bR8wV%2FcJjpI8JdyYqAq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNWJRehwSVvAwxpq%2FCrcA3VF4GlDHZtrwM1%2F24bRVFLQ3HuLlKjwTJzBybAtcgUAk0uDNrwb8rfzOa9bzqqfe0%2FfFRO54Sqs4KIDbMehxLGI4d7pMsCzbr6SKXiBoY8dNwRT6WNuhh8%2B3ZJbjnDC%2Bgzo%2Fbks31YRTJ5OrK7KkxUQmh2XIl%2F9WJaOECaG9aCHFIatQZmuRQ%2FWYKiTzKUXQ5wLsYpWY9oQ9ZgE0CJ2BsgZ6EexTyPHQ%2FQd0Vyuwc1HEClSmAadlI9liELOzVWgyRW8%2FKtjrNvKYA5FkuRtkDMzdhutSP4ZfCQT%2Bai4nfGVHUpjBVDKu0mSAfHgntDAGOO0rwRTw1rOY8UjE3QjDB1XdKuFM3dRjI%2BPy3ec4PpExIRqVOZm%2FawFkUODIYmLat9wa0cVBF1kWG%2BcpssG5zDQ9qMYpngsvni6SdW2Z4aXIVX6GPFxosxIFtQxIca2y%2B7prjtjH2E1OsNVbIXihqzHL5b3AZpgH2e%2Bi7oq01VcNIqxNcPt5HXfkBoeHrXmiaJ4RqSFI9%2FWL08DPP9YY9lr2pDufP7irdBNwkHyy0w5urefDQU3hh6Wq%2FyCg%2FMIR1SKczihoFaGDVIrISMSLrT0t251paJ9MPgLoRvzmZIQuhnCJWaFn0Z0e9yAMNWDicwGOqUBDIy6cZiZhetqyNbrUsdrWxyqCyUdf3YMpyg912TwVxofcSCDmZmJeyWuiqqhPlg5VAMuLRccfv9QX%2Bz3svKxnpCYGfIYdS0XqHtrwOm2iB3MEKAEa8EmVEEus60%2FBkKmyIr0HCrlZhkcPPYmNrCKaRQO%2BFrhrG2G3FF%2BS%2FN2m89wi9IoMG%2BlRHGXMqR8SQUO3Jp9sfr9LvetvVkjlBkbsmJ7AG%2BS&X-Amz-Signature=bc1fd778cb3a1f8ac35de4b0cea33eb3a6ee82d2e8b855d448958b278befbe22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5L43DBE%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIG3TlStIH7wyXULRyJWHQ9Iy1RQlT809gfJC0UWs%2Fc9kAiEAzS1wROuzp9kO%2B05DL%2Fc%2BIQXE6bR8wV%2FcJjpI8JdyYqAq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNWJRehwSVvAwxpq%2FCrcA3VF4GlDHZtrwM1%2F24bRVFLQ3HuLlKjwTJzBybAtcgUAk0uDNrwb8rfzOa9bzqqfe0%2FfFRO54Sqs4KIDbMehxLGI4d7pMsCzbr6SKXiBoY8dNwRT6WNuhh8%2B3ZJbjnDC%2Bgzo%2Fbks31YRTJ5OrK7KkxUQmh2XIl%2F9WJaOECaG9aCHFIatQZmuRQ%2FWYKiTzKUXQ5wLsYpWY9oQ9ZgE0CJ2BsgZ6EexTyPHQ%2FQd0Vyuwc1HEClSmAadlI9liELOzVWgyRW8%2FKtjrNvKYA5FkuRtkDMzdhutSP4ZfCQT%2Bai4nfGVHUpjBVDKu0mSAfHgntDAGOO0rwRTw1rOY8UjE3QjDB1XdKuFM3dRjI%2BPy3ec4PpExIRqVOZm%2FawFkUODIYmLat9wa0cVBF1kWG%2BcpssG5zDQ9qMYpngsvni6SdW2Z4aXIVX6GPFxosxIFtQxIca2y%2B7prjtjH2E1OsNVbIXihqzHL5b3AZpgH2e%2Bi7oq01VcNIqxNcPt5HXfkBoeHrXmiaJ4RqSFI9%2FWL08DPP9YY9lr2pDufP7irdBNwkHyy0w5urefDQU3hh6Wq%2FyCg%2FMIR1SKczihoFaGDVIrISMSLrT0t251paJ9MPgLoRvzmZIQuhnCJWaFn0Z0e9yAMNWDicwGOqUBDIy6cZiZhetqyNbrUsdrWxyqCyUdf3YMpyg912TwVxofcSCDmZmJeyWuiqqhPlg5VAMuLRccfv9QX%2Bz3svKxnpCYGfIYdS0XqHtrwOm2iB3MEKAEa8EmVEEus60%2FBkKmyIr0HCrlZhkcPPYmNrCKaRQO%2BFrhrG2G3FF%2BS%2FN2m89wi9IoMG%2BlRHGXMqR8SQUO3Jp9sfr9LvetvVkjlBkbsmJ7AG%2BS&X-Amz-Signature=26393f8b9dcec23c10ae081865b49aed308ab71d77e00b522bee9d068adf58fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTHAM3JQ%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIHvJX3Wf9lfZ5RPftNKo7UTzidb7id8WCr%2B4q1ZASF6LAiBLAEfvm6%2FF3%2Bk%2BcET1YmwAg6Duoae20EGic0cPCB2cgyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMcPRP3Qd9sM5MBpgUKtwDIaPFUJQwUDoVgADGN7YZEfLdYRnwtNXz8djpG8HNMB4aRz7nVbJjq0Z4FPC%2BwlpWpkLHXszrgX4rBuCGccVXK1kK7mk3uaYbDzvFrSkqFT1cc5oWEQLj0wXFcOHefvED4O%2B8i4mNkavffnFDoXp4S7GtHd5HuHd%2FJvcUTQ4n%2FkF0joAa%2BX6C64ORHLU22W1vD34tw%2FVRQmB%2BsFMUFCLJG6r2s4WlL5RX1jVh2aGA0Bj0%2FtHGcPf05OSyrYBwKsawHBB5XMtInaSnKPoaIXeArA2rDFkIU8Ab3bRip5CLV3%2BAftnyDnm5D%2FTd5W8z6HqFoa3ajry3oczgwFFq%2FRi0YK2d06s9QYGnd8msd%2FJD%2FMWK3M0w5ZVzweUJ2jukkJxnNDG%2F7TiMYtbJsNgIQU3x5ZXpaOSPBFi4pFmV6i0%2Bh5ttXm9xiEQiuZHOqZhd%2FUBMEZwgI1z22NZrRx%2BwGhJ6jJUAl13rSXC3PbDC6ny9g2RoOPKHD6Qy2QZW4Jmt7efSFaMzpcJ8IMuYkF6NZDw5qHkkn5sfMicDaVYE5l%2BKCbpvPwo9FVK%2FZhCw5ozaqC8J51JUf5Tn1q0yZO8HCbDuEa4CAGL5sJ5sjaX%2F9vayH4xZ7KBZY9MUwcYCozkwhISJzAY6pgEthbnYZih5ynKeqgxabmeGnACbKwmoWbSIeilmzaIx9djDN4CWYIlyrYBiEyWh0fjKvdPl31MUM6p1qYSbiFcxBGu0hMuzg0Wg5xWO7xEPdHMrouKaWyvaqIbzpUx2j72NuIWkQZFD7YkZGYETBr4COA4ZclpnAVptsjrTJ7Q2WAkDq04ZG3T%2FoevzL7spWvWx%2BbgzLcneKMxzMlgq6viMBBzMeYFk&X-Amz-Signature=c3e9b4c1021aef1d29be8ba639f35e8eeb998e3d3dea2551aa7f23fee3d5b61d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAOAXTUY%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCwMCbwJLhmwwMOCJQon4I4Yr2Q0Ya%2FB0SA3fcdzCWRlQIhAN5Px4Lq%2B3TpDXwcoQrXUMW4j3PYzM67fX5%2BCkxoeoAsKv8DCAQQABoMNjM3NDIzMTgzODA1Igyd4tnw%2BjR47erszBoq3AOMzRV8ygdZmn4DURez%2Bm02%2B12Ctd29RhaE8K%2FIJjzInJSSc1VpZ2dHI3St4Ti9M0aodGviREWyIj7r7ZHAcxswy%2Foq%2BWEgYdwpi%2FKr3CLB4%2FzfciFKpJSwTRTL60k0hkIR2U20kMS83NRzbqEjHOdLm9%2Bx837BleCjGWUd6yPe05xyZkCE6HV6qbLQwNRynMRdEnC84PFGFMJ%2BFEOLyNfzVQLTsiSMzeq2JMQew7ONm6F%2BysD1Cu8%2BUc%2FfrOOJKedOd4oMBK8bxIgwHfsKHQ3QBGdaTFOpf7QOfvstJ2MFteUO8W2%2FZ4BaY0S0wv%2B4RCKMLW6wzsCLHecgcza1uq5bB7ERG6E9LwwJ5k1nvE40fqqkt58qXjUB9m6uanMLtzLg5DuptXlEUUrQKFjecL5RZhyAN3PSlAXyWjVGwcFUDVUeN4ObJZP1jQrCOeanyGbx4zHGYJ4EadUvOjxlYzqVXtltEOXHtbfKZNScptlGAFL96KMFi%2BAKjPjPqKXIho5KHXSC9d2sseUIQffny5THsFsYc4rte%2FWFTOVdZLr%2FhskfGPenLvhgRByFJ62luynY99lvJW1RRHRKqouPSf%2FWkz0xVGYSs6voW7OZeoWIO4uvZE4YDkJeqen8SzDVg4nMBjqkASIHlrLs1VbAdaIHfzs4TyPN09OtZMaRRmvxj7w4welOrd4f%2FcsSXeGaxeZmqtW2okMu0HXTK7D8mFpsveCMq9NvkAsRJFv9E715G9cl1tn8%2FsX5M3BdqW%2F3L7hAY73aqiGhmTSj2VXGu8s5yoVzwlIG1QlbBAosmorp7Ah1cGFcmIit2yStqHONC2iyVOKZ927hep6F5m%2FVD%2BdouB6MRYTIAFWH&X-Amz-Signature=01683caf067aa68784bc684e018cb8127292b29bb317d5e7925104ec6feabb62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAOAXTUY%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCwMCbwJLhmwwMOCJQon4I4Yr2Q0Ya%2FB0SA3fcdzCWRlQIhAN5Px4Lq%2B3TpDXwcoQrXUMW4j3PYzM67fX5%2BCkxoeoAsKv8DCAQQABoMNjM3NDIzMTgzODA1Igyd4tnw%2BjR47erszBoq3AOMzRV8ygdZmn4DURez%2Bm02%2B12Ctd29RhaE8K%2FIJjzInJSSc1VpZ2dHI3St4Ti9M0aodGviREWyIj7r7ZHAcxswy%2Foq%2BWEgYdwpi%2FKr3CLB4%2FzfciFKpJSwTRTL60k0hkIR2U20kMS83NRzbqEjHOdLm9%2Bx837BleCjGWUd6yPe05xyZkCE6HV6qbLQwNRynMRdEnC84PFGFMJ%2BFEOLyNfzVQLTsiSMzeq2JMQew7ONm6F%2BysD1Cu8%2BUc%2FfrOOJKedOd4oMBK8bxIgwHfsKHQ3QBGdaTFOpf7QOfvstJ2MFteUO8W2%2FZ4BaY0S0wv%2B4RCKMLW6wzsCLHecgcza1uq5bB7ERG6E9LwwJ5k1nvE40fqqkt58qXjUB9m6uanMLtzLg5DuptXlEUUrQKFjecL5RZhyAN3PSlAXyWjVGwcFUDVUeN4ObJZP1jQrCOeanyGbx4zHGYJ4EadUvOjxlYzqVXtltEOXHtbfKZNScptlGAFL96KMFi%2BAKjPjPqKXIho5KHXSC9d2sseUIQffny5THsFsYc4rte%2FWFTOVdZLr%2FhskfGPenLvhgRByFJ62luynY99lvJW1RRHRKqouPSf%2FWkz0xVGYSs6voW7OZeoWIO4uvZE4YDkJeqen8SzDVg4nMBjqkASIHlrLs1VbAdaIHfzs4TyPN09OtZMaRRmvxj7w4welOrd4f%2FcsSXeGaxeZmqtW2okMu0HXTK7D8mFpsveCMq9NvkAsRJFv9E715G9cl1tn8%2FsX5M3BdqW%2F3L7hAY73aqiGhmTSj2VXGu8s5yoVzwlIG1QlbBAosmorp7Ah1cGFcmIit2yStqHONC2iyVOKZ927hep6F5m%2FVD%2BdouB6MRYTIAFWH&X-Amz-Signature=01683caf067aa68784bc684e018cb8127292b29bb317d5e7925104ec6feabb62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636EG4YUM%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T221651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDbnbVDw0Fa6m1gfOkw9Pyk5skYl8rSIuA6yS6yv0jDSgIhANphshW0sDFcmZKHKdaRMdKWvJKfiVVrCevl8UtPeHo%2BKv8DCAQQABoMNjM3NDIzMTgzODA1IgxiHHA38c9wc8uwvC4q3APHcNa%2BdMFI43h%2BtscN%2BdDjbVNRR%2B9w80kIqkkCZxcTfJfsUzb2wXv5GPNhw8pn5W7ePxAt%2BemIej5Aqxtt1ppXpmJ3W%2F29U3kBCfjqt55DmMupCbgCFtPOff5TVw7GYKdzns8f4Xo6nBiHMQe4nt1B7XqEHUvfvGl0%2F1MEifdqRtqidWAampmim4YwIc0E5uOZHe%2B4W3bl4Un7q7qVo%2FmE9GYA9U0rJXi8HRNZnZGhgh8h%2BzM0%2FZkOxa5pkPhAFAPqcbzmT8SwAI9DxHC7YQxLUIHq6h4Tp6hXGozscXvoVk9roTwhYEyxSkLyEIRMCbOnKrkXffvvLVjg%2F%2FIg%2BASTY2uzlNFlMroW2NEbjbP9pZNNvRNbQwKC%2Bvz3P9%2BGBVkYjoYK97JCo4QTQNaPB7G4IIAX7XnZNwd8v4IkWhspIEhWWEdvTDLxNcaj3s3DfSyg5DzPSXnM16tlIGjZCjnBSEZ6B7Y%2Fz%2Bjhw5aERfLonTO%2BbLRRKJdvPiWOUeSD2L%2F%2Fnldkr5BQyt6X2Sq0wISpPVx466i3nnCiEUzOMNJ4xpt0qlNcDR6JhzwnWYUAGo7hId6O7QAiuzBH3shghrBWQmbGb5CtOxyb5pL2mPXIMxwfjpzrIgHhr%2BQAMTD%2Bg4nMBjqkAcfPaA9If4Z6QTgX9FthTKJ24D3ql%2B7naUwGZVVuu%2Bci4%2BNPeyr5UUJOH21b2LuYyBVJjm7a3gRMB1dihmNaIAOLgE53Bc%2B8c9ky4k%2FdAR%2FSrwtsxDATS74htolIUXR12D77jly%2F0sTBLAbeHWalyhnvJtubpVqqtOX59YX7N4fh4Qfie6ImD3lowV9htK%2BM9ZuNdkwh%2F5pl9PXW3CDWCwfrV4JB&X-Amz-Signature=e4d432509e05b938cdd370a564af7191c017fc12bbc7f1d0c0f4466770353fe0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

