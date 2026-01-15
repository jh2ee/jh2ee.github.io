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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBJRVYQH%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQDBNzTLGja3YrimeXmZhDnBf9NuKxVXK2Kh32jTe9Q2wQIhAMAd2Td61mC%2FRSVY7AKTbEpoaS2PEqi%2FRJAwKJefoD%2B0Kv8DCEAQABoMNjM3NDIzMTgzODA1IgwH%2Br%2Bdwmcj3nbOIdEq3ANiOpa%2FoXhe9Ql9bKlxKjPH%2BRewV7YhLOUrVZ32iAM5rC5YZJezsEyoeJVuNPiuETPbtEBW3o%2FG3RMv%2BPHcc87cDuXvA2GvdSkNN40RAO0S8DweeE0mcKg4JLwXJToGlq7qCll%2F%2FEIQqppCP5gqMQ%2BmykfjOQS2le6eNCcWzzQym7qFAeDpRsOO8crgVVmMZ3lhPhQbuHd%2FHuMUaY%2FMzBjthcoegEU%2BqyDJkkt7rfFmPf1zkWVb2ExpbsLntW49aOkWnxPbSW%2BkLeoED2mjQf1GjOr0i%2BDMLm8ezdptP%2FprVVe%2Bf2Qds80Gw%2Bg1rKfTp6%2FM2JoZwhpGeVdBPWIndOSiPrjdjHG3RBG5rxFCP9AOi%2Bxpe5mHumwXP%2BfsJDU3p5uh3sCiKPj3jZVoO9%2Fjr5ue2VvooArmVBYapkEDHx75YTa%2FQMhdO%2FCo%2BJ2oWWdPLKGIWq0B0BILR1cHAwjtWy40ow%2By%2BkPtd5VtVZaljwh93VlypLl267SpkXX20Wt%2FT0UiAb9CDFJFz79XqokJQOoxYRV3HqPqXt7AN0qUFuKKZwxo7zFgG%2BV7HiGNz7x1ytjK64M1yOmyMzddIRRxvTBANic%2F1g3kko6oingMQCa3dW80y4G6BZo1JBE0fTCN1qXLBjqkAbHtfApYWBmqgRE2yRXBQnNRleL%2FD2CTDS0dddf%2BS9fMK6HUT9xjgyd8U8%2FTbtaBlQFjd2K3oMN3f3KvmGpF%2BECScl%2BGdJnDRJ1fKCS2Sj8fjqiuYzYLvuhMnu%2FEBby%2F8vTqZ%2FgU19nt4ePZcj1uHHUqv4wjztrFEAns55PtXG4DhvdMQkVGS72piq3Li9UvlrEafwNtWi%2F4GQ8fcS%2F5nGkpSMnm&X-Amz-Signature=c2d7084eaf635445b59698911a99e1ac855f9bc917c4d8201e726eb04d61fc9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBJRVYQH%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQDBNzTLGja3YrimeXmZhDnBf9NuKxVXK2Kh32jTe9Q2wQIhAMAd2Td61mC%2FRSVY7AKTbEpoaS2PEqi%2FRJAwKJefoD%2B0Kv8DCEAQABoMNjM3NDIzMTgzODA1IgwH%2Br%2Bdwmcj3nbOIdEq3ANiOpa%2FoXhe9Ql9bKlxKjPH%2BRewV7YhLOUrVZ32iAM5rC5YZJezsEyoeJVuNPiuETPbtEBW3o%2FG3RMv%2BPHcc87cDuXvA2GvdSkNN40RAO0S8DweeE0mcKg4JLwXJToGlq7qCll%2F%2FEIQqppCP5gqMQ%2BmykfjOQS2le6eNCcWzzQym7qFAeDpRsOO8crgVVmMZ3lhPhQbuHd%2FHuMUaY%2FMzBjthcoegEU%2BqyDJkkt7rfFmPf1zkWVb2ExpbsLntW49aOkWnxPbSW%2BkLeoED2mjQf1GjOr0i%2BDMLm8ezdptP%2FprVVe%2Bf2Qds80Gw%2Bg1rKfTp6%2FM2JoZwhpGeVdBPWIndOSiPrjdjHG3RBG5rxFCP9AOi%2Bxpe5mHumwXP%2BfsJDU3p5uh3sCiKPj3jZVoO9%2Fjr5ue2VvooArmVBYapkEDHx75YTa%2FQMhdO%2FCo%2BJ2oWWdPLKGIWq0B0BILR1cHAwjtWy40ow%2By%2BkPtd5VtVZaljwh93VlypLl267SpkXX20Wt%2FT0UiAb9CDFJFz79XqokJQOoxYRV3HqPqXt7AN0qUFuKKZwxo7zFgG%2BV7HiGNz7x1ytjK64M1yOmyMzddIRRxvTBANic%2F1g3kko6oingMQCa3dW80y4G6BZo1JBE0fTCN1qXLBjqkAbHtfApYWBmqgRE2yRXBQnNRleL%2FD2CTDS0dddf%2BS9fMK6HUT9xjgyd8U8%2FTbtaBlQFjd2K3oMN3f3KvmGpF%2BECScl%2BGdJnDRJ1fKCS2Sj8fjqiuYzYLvuhMnu%2FEBby%2F8vTqZ%2FgU19nt4ePZcj1uHHUqv4wjztrFEAns55PtXG4DhvdMQkVGS72piq3Li9UvlrEafwNtWi%2F4GQ8fcS%2F5nGkpSMnm&X-Amz-Signature=c2d7084eaf635445b59698911a99e1ac855f9bc917c4d8201e726eb04d61fc9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DRUISJE%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIFzx9iRaP4A4Ai4wPMuUxuWb2yKAlk1rt7dd6fnb0YrLAiA3IfCIo8q99di2s3uy5hofH%2BMduzqiGDSwlRr0FAksJir%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMeYexprfjfR3BcnLZKtwDOJ22eBdlZoazAXFSvGLeaIFAurdd5AVpKTb9%2Bl2UXfikOQyRyaetBl8SGrv7b9hgzwwsfTbCQ8vjYj2y%2FlrsvK0GOvVNADInXwdT5tye%2BLWm94ncEnU7DSiiThXuQfM6n04RbWU6FPz8xjbkChejIUr%2Fqv8digZC424UkD%2BnvceVxghUlCdlJcB1vZ4LSztutJZYxvi3kIv6IqXw2Wb0ZDWsrdaAg0wHVJL%2BAkN3jnGRV95RGt7llZH4tF5PA97N40Msbg4mV46BlNZ0GJdISTYvfTcVr1y3%2BrKgRs1WPsFyu9CxH5bshagJIHBZUXwUQNAUsb9finCpcATr4rIIzav%2FEv0H%2FGnDcNFoCTblX694s4mYzYQPHPEcBunLNd%2F1CUq2AL%2FVnGd1urAaPWt%2BpgfBL23w92Zt9xi5gJ%2BbCy4OJxz6ZpQT6AHr7XeE6dRfhNuM%2FU%2BwIM9VVLFsZjk7C9i5vYmlw3uoqiLb4lasBhFS2JheAEzcHEoK16iEg%2FgrXRoB6z8MbBcsM6EHEVgJEAkBQkspX2nQnbP0VmsmoP6OQkc4EuLD1xxg1u7qM5FiTga05DEMxStyza6NCd2SjQwwAqxFTS8ZpSkM2NQmDeCti8KCpkX9qNf8d7YwmNalywY6pgEv3n%2F%2FSJfrHlc41DsisChyoYMhmzaCgqrzmrInLO%2FgILN1n7kTKi7xWHZELFVPH2SaRJxJfjjXJF7mmWhkCxgXTtLucC5WbCgDYxEpwLsVEXztlEavanz0AsZlJERIWV2cLR2RcojM7UyrbReRg%2FNeBtI9m1NI%2FJ%2B96g8j57yFNEiySztUzjhK9JRDcwk3iGVR%2F367vHi713MU0FQPXRRJvgDppEUX&X-Amz-Signature=7b0a3d393968e639d0d0c407ad7d0a8074400f19a8004efe1c4024c9b7f78d3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJE6J73S%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQCdZWFLxJRfaR6%2FDmQ%2B5q4btYFrnFfAfg%2FFEwrjUDNxuQIgdvu%2Bg0FL%2B2jFKgIrM3qRr9Bub4Cxtmgx%2F9mOUwOR5r0q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDOhKJXXyWhC%2FdGqayyrcA9p%2F3VhxtBle12vz8ZL8a%2Bg%2FmXGB0E11sIvnGryToDAJptQ8rauBrkdOgbkzuHm8qOM23JQ3KYWIS9QU14OL%2BggcZhO5dFeISxNhA09H04N3bPJ%2B8sSSAqmhUDUljglXuxal7EXmW9T7PEP1oInLzsgtomJxTGxpZzgr%2FKiNPf6vJlzwPp1CbH7szWel30yfN2CFnQLxkIaMX2p%2BP35mSSc%2BePUZmZvi%2B64ubWT52VQqypadKShkJsis2MZMXRUclnUF7%2Btp8nw4g91BueeugGIOvP%2B8RusS32HlgBqT4PmlWfyY45Ku6ZIh%2BSDwt%2BMMdo4XBaMQ4BdVXz%2F%2FgodBtr3XMYeMrcjWJP5JhwFyLTmp7lMRWIW4goaTs8FNpOGe0oo9qAZkf0LFbPYN4QLJHRPbI8ixpFG7QbTH7ZyXj50H4pr0LR3fhp0ylVz3HiELVlzkt4IFqgxFrWz0RnWAdSxO7gFdjxXOuqXVolI9USXf2WBDHaVlIoO34cREIXxohg2PXVYjxWOC1Dy2qmRijZbaBeEfL8HBiIge5yciWRWsYPAW1P7zkjHH62aqY9ufIqCLeGJs8IFrpoc%2F6e4lNnhQI45VXunmKsmhhU4XTHz9esLUcfWLuvWeP%2Fw6MODVpcsGOqUBRk%2B4hqfpErBeQcXnQ8DuftbsKH4AyfJuglliwya3ObW8i4fHGYC4SxM2iedQ8UGIILUp83GWd6n4YH3HJA0s5w3%2BksRhbVpYM29Bit7trSp3eIBcrGZ4934i%2BstfWBcumVhLgyXQdliXsXW7PSpw5VJOGPN7fckWNMI3h46Zj8QUvNNIQ26AuSVvph8TVK8gALOVkGIjJLeI%2Flzcwm8CcQJy4B%2Fk&X-Amz-Signature=bd021da379ae7ead199c3c528b1231391d0ff193bcd9b088a8e73db1623b89f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJE6J73S%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQCdZWFLxJRfaR6%2FDmQ%2B5q4btYFrnFfAfg%2FFEwrjUDNxuQIgdvu%2Bg0FL%2B2jFKgIrM3qRr9Bub4Cxtmgx%2F9mOUwOR5r0q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDOhKJXXyWhC%2FdGqayyrcA9p%2F3VhxtBle12vz8ZL8a%2Bg%2FmXGB0E11sIvnGryToDAJptQ8rauBrkdOgbkzuHm8qOM23JQ3KYWIS9QU14OL%2BggcZhO5dFeISxNhA09H04N3bPJ%2B8sSSAqmhUDUljglXuxal7EXmW9T7PEP1oInLzsgtomJxTGxpZzgr%2FKiNPf6vJlzwPp1CbH7szWel30yfN2CFnQLxkIaMX2p%2BP35mSSc%2BePUZmZvi%2B64ubWT52VQqypadKShkJsis2MZMXRUclnUF7%2Btp8nw4g91BueeugGIOvP%2B8RusS32HlgBqT4PmlWfyY45Ku6ZIh%2BSDwt%2BMMdo4XBaMQ4BdVXz%2F%2FgodBtr3XMYeMrcjWJP5JhwFyLTmp7lMRWIW4goaTs8FNpOGe0oo9qAZkf0LFbPYN4QLJHRPbI8ixpFG7QbTH7ZyXj50H4pr0LR3fhp0ylVz3HiELVlzkt4IFqgxFrWz0RnWAdSxO7gFdjxXOuqXVolI9USXf2WBDHaVlIoO34cREIXxohg2PXVYjxWOC1Dy2qmRijZbaBeEfL8HBiIge5yciWRWsYPAW1P7zkjHH62aqY9ufIqCLeGJs8IFrpoc%2F6e4lNnhQI45VXunmKsmhhU4XTHz9esLUcfWLuvWeP%2Fw6MODVpcsGOqUBRk%2B4hqfpErBeQcXnQ8DuftbsKH4AyfJuglliwya3ObW8i4fHGYC4SxM2iedQ8UGIILUp83GWd6n4YH3HJA0s5w3%2BksRhbVpYM29Bit7trSp3eIBcrGZ4934i%2BstfWBcumVhLgyXQdliXsXW7PSpw5VJOGPN7fckWNMI3h46Zj8QUvNNIQ26AuSVvph8TVK8gALOVkGIjJLeI%2Flzcwm8CcQJy4B%2Fk&X-Amz-Signature=dfbb67422e45cd30a66e480c448bd01060c1c471282f58093e1be64ed5602cf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWMN2ARZ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIEA2mn9zw%2BpPBijNhibAY1296wCHzoLgs5eA9%2B5bpDQsAiEA10jq5z83uq5YtAvLU%2BYznYBbTFmJ7WsHneQoWexMAWEq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDEJszvpE0xAMhfbROircA3TjrCPDlmecKEuchKeFQhwXB%2BI733B%2Fui5YUWAq4VFkVSUOMdQ%2FpGuIUPRBv5wPNEvGdzyB25wvOEv4UUHXin%2BLkV55OMOANK2rY26x4O899cfqhFBJAzohxYWcwHyw9DjkU6%2Bv1eey59fvFbExxBIbWnfz%2BHW4mNJxS6LvbxljTbu9dlgduzpexCcUisUpC4giO%2BZcAHccG5iYVAECG47GVsUNZ5f7vfJHhPN7Eh1O6PStnzDdvj%2FWiUMdm8mpD1uOmAHUtArevczdU4DIC06Ll11v6j0QMQcy4N6WtiITHxw6mP9FoEkyIYvl0NarTCmq%2BLUeHHgYMsyn2sDrfBFqsNrCnypOXntUd1ID1pJqBzJh28D8%2FvsIAuKHwwpcyeicYx%2F4gjB6zLNHDbZYBH2lbNsdscBPKmwk%2FA0BYqEji80jgLVLg2ExH%2FP3cKVWuYEZasnjtmSg1GqyTAgiQxqap3FpFp6rxeWA0VNU6LgssPWECXWQv4htB4yH9Ji9ZZiZHigDhhKiDN0VSdrEeQwDeFMhdlgc9Hj%2FyQmkvux7gJtfh7BCRlWx0lIaYJ3%2Fbf5l6vwy%2F2Qw2X%2FgPuhII%2BlN%2FndoyG4DVwuWM1zrZe85vC4cAtbOXdijRqORMPrVpcsGOqUBFGiFy4rcZOUJ06FEXuFVKbHM8PGL4ASfPd9V6UEPjArDI8CbJrXKP3OER%2BbQQ%2Fu4%2Bds7NuZzKXXAAOj9qg15inTsAzhoKjvTbbdNdV1ZKlkC8t0CSJNBWfC1tDS6f0kigWuj6Rj8n4WTQ%2BJynkToFQRYJv7ix4tdvFPEzW1CSs3G2zud67cmSO9LMmzzUa8f19drpiYiN0QbZD%2F1G0eKA1f0dPt7&X-Amz-Signature=6a1c92bd04bf44db67289e0d354d52e04f01da9619dfe73c8445af90b24ecc78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGLWK5MM%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIAC83U21zMUfGk10uTHn3ux7%2F%2FnzFTpJCKzJFTVmklh1AiBd4rb5RvGcsmQRzTGzplkSFFq%2BuZIWXJLQp%2BgX5EEu8Cr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMDLT5pQs%2BNrI1Yc7FKtwDk6%2BE6x99bj9zuv5%2BxERIt26EDiraUiGrYe7JmEQAz48lyDzxp9ExmBthHLB7Kaoctbpp46Vh%2BTMBmAgDrA4rSDcN43OqohlYIp3pk0cSIYr8HTuJkWCUJpdFjUTs2KvAinfIXuRVwz4WvB7URpd%2FvuTtN5Wz5AFiFAiSiTSjVaTV6gNhig3mBcKsdMNRYUHbQFE13XkQ7Ju%2Fa%2FBg3tYROdHssoDYhYdf%2BpIcTnFHAQlIFfpiiWlbd5iyySZR8xzXCpHkcIjGprq2D6QHJ6H%2FI3FwrAvDeEBHBq15h52jdbAWqI6Cm56kTs3vvhMp2GLXyprt9mPCb8E8qRWC8fcCmYdr6YgHSkpgygPbydRyJ1nQ6OnwItEQVXnU%2BkxSMFh6aBQbQWwjYSj0xffQ2QFiv1%2FRq2yPS8rgNXbFdYSNglBc%2F6%2B09s3z343KMfteLBI4XIgKXhWoNTdDRuIbfXnKhjASSqENOSUozrwWL3h82y%2BoEqR%2B2n%2Fa%2F4T%2FtRlLfMO%2FBp38fL5s2DRB4QSkrgEeeOkCJVkyN2N8yxvsEQ20yVSZuYZ33uw2l1tVyJlLnjTyZwxG9JdLwzCku9hnoEV4nxfLqNgLpfi19C9sYjXSUY4JbsVwBCsmrhCiKMww4NWlywY6pgHdL892oBpQgS0UVycTzR6RmxgPqmHENYXlXLDkSIaesG6bJPc5ZMxZNtDqT2Ueotrm%2BH9tu4MUgqlv4J1LCIy28TyuJANrMUi9j1gF9J5dvNCFiTShBPOFN%2BjAt9dMl97I2aK8mMIgS%2FkZzi0hPCqV6DQSqOvl%2Fs0Bspfa%2B0mDC9%2FKnolVGxFGsNkCnxSKZb69rZkhu3lN3wVB9nnNKkVw6lUPY1am&X-Amz-Signature=4fa662e142396e1ad47ee9427d4025251e9a8b069ed19159d4665d5040f6a408&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPESWT7Z%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQCJSfHjQXJMeXI939ZVRIlpmKQ7z%2FXUvV5V4wy%2BrUNa8AIgRGmWLNeECgY4j%2FY2DQVGvjqDrw8DwWHDYvKEHAEzxOoq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDG4ZZLW3V20m1e5LRyrcA6979k5H7Hleih%2BQKTeRFxXqZ9Urt5yEZYZZwwWST5KZAVaDe%2FGBsnXrh5PHrQb5Ic1w%2BFge4i6qHyNpVNA3HZQM%2FzAFKTCjqxNFQ2t%2BzXHoZFNZIWRRNo7Mz%2BQ6aZm7zEAFj880HdX%2Bss7GBTNoiYYmq2460UkYyrLv%2BooOWDXthc7nBtFtKrZTkgc53CrbOnRZ2NQOCcl7ks3vsnsk3A9seK0yxMDcfkHppJ5cwZU3DN53JbXJaP%2BXiS%2F8wrH1jGAwcrnoyBt%2BI5wkgragzjTFctTD9tcaKNzyICQBAbO2SI2iHeNbKV6kMx6O5g3hwjrZR8LI4pbiFUGZq4ya9yJCZil7bnTb2pr4VUSX7IOe9mOrY6Hbm163SFmY7gITgo7xYGdKx5XC6NNtLzayR%2F4y%2BKXZuaiIJuuvCtl9S%2BYxhjmMtZm4hR%2Fgi343tHvh5p%2BCJXsEKwrcOq8OpzVL5Z7K3IApcs9dPZbsz%2F%2BPDc9%2FNtGQR6oD%2FXH4gEOi85pgzAGjLO3hr%2BVyMOYwWzt6FT8FrxOmCeKfFKDTtevchiJ1X2g86voZ0NMBpBPw1dzSW5z3SaefEzLhKZI34c5JxxfWAI0es27cQIfdH8xp3ylExVXBT4bbMGepn1MbMNrVpcsGOqUBMSBXMuMxWOju5zzvVilTZIGL%2Bk0pjj2ycUFxAjTZ0j9PwxRasDbfu2nhewS1EJj7f0lez03fgnrYZUS2EjN8%2F5crBXmXFL%2BfY9vauY0ncFZSm8ljntaaUJPN0kDV1ar0CqsZauYozw0tB1fm31wusV0ZzT4%2FuN3jlUV%2FYqed9sgOz8TpePup8FZQTuaUti3QJova0pD%2FdLArK0KpEokvezi3q4%2BL&X-Amz-Signature=fa8da66f1440ba6ed50cc2e5caa4f9a60e342985905752adce344158a5ccd0a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4R6K5YS%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCmEws5VNeX5%2FfHoCXs%2BDgUaqxIHk2QbcrkQBn%2BryHcMgIhALeCrzD5AStT9XkO6aaR6AOf1PtyogO7u%2BiUPwsBKr05Kv8DCEAQABoMNjM3NDIzMTgzODA1IgzEB0v7GWWQ%2BGLiQycq3AOCr29kSVFvZ02vR5RSibE16F3zxextM9MRHQtjeAGAPjlUyqs6JwWx10fNHGnigKjaQrWo6oaSpIpHqpbSKPm9kEaoXCYvCRB2v%2F5DZ7wXqMJIzurCMOP0qWDQnRRAA9nmlFGD6LFoi72McxPriyNh0bsbge4RkQYIoli5no60ABRW1NnSXL6g1RMtgMlOkSUI8xAP1273k97oeAcreHzztcxFaWeo8ZFp84LFR34C8SH1jf6LKUfGj91XQVL4Ulm9z482Bb5BpmSbNxFbe2r%2BL6tEtCSPXlE3j8FyCLTgyTSZ%2B8stDB63MwsCOb4GPFZZsDearry6J8B3nBrBWFFjqconnG2JXOcagY9LTR9q1%2FuiqxXzFpmcnnOiD9DNwdHWErm59cjKX1I%2FfrSiJEz%2FZf7BzhwjWIKc9VedwbcNpEpCiISwiUzAwvda9K4dT68Qpol2DRcscKd2j8E9dIcY7WU1WhuAeKTvhlc9BU14oLpS0EJQqvFD0hoh5vlURI3dhv7qKcSHlX8WN21834VyWhZawM9ck0r5DFIwvWduI7PrMwwY4s69Wn4AS7lJwA34pfk3f0dE3jBaP3Z7Npz6iC6MSQbXGbskzM%2B3CQnXu%2FNkf7DNNGuZdyAtVzCa1qXLBjqkAY14KpwmmwmjuG1tY0nLi%2FHpemMOgipZB0mCZ0bCiVnahxQcaCc3HQXKDjF8VrYKYCeyZpOgpR1M6UgbviQrj4ZkQe1phQ8PAc%2F9IbnnZ3e40mFXUVy%2FITI5MgCQ5e3iEZ3GYHnTMDfyo4EaKb4nGWfidWN8G3jA5mTCQ3LPuxn8OXrDbAk%2BzFleokDmX3IHUyF9ADkNSl99kYGh5fFTYcVmRsNu&X-Amz-Signature=578b66ba1c1e077eea7b7d27d52993d9a7a1280dd7c6648937da618f34c23211&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4R6K5YS%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCmEws5VNeX5%2FfHoCXs%2BDgUaqxIHk2QbcrkQBn%2BryHcMgIhALeCrzD5AStT9XkO6aaR6AOf1PtyogO7u%2BiUPwsBKr05Kv8DCEAQABoMNjM3NDIzMTgzODA1IgzEB0v7GWWQ%2BGLiQycq3AOCr29kSVFvZ02vR5RSibE16F3zxextM9MRHQtjeAGAPjlUyqs6JwWx10fNHGnigKjaQrWo6oaSpIpHqpbSKPm9kEaoXCYvCRB2v%2F5DZ7wXqMJIzurCMOP0qWDQnRRAA9nmlFGD6LFoi72McxPriyNh0bsbge4RkQYIoli5no60ABRW1NnSXL6g1RMtgMlOkSUI8xAP1273k97oeAcreHzztcxFaWeo8ZFp84LFR34C8SH1jf6LKUfGj91XQVL4Ulm9z482Bb5BpmSbNxFbe2r%2BL6tEtCSPXlE3j8FyCLTgyTSZ%2B8stDB63MwsCOb4GPFZZsDearry6J8B3nBrBWFFjqconnG2JXOcagY9LTR9q1%2FuiqxXzFpmcnnOiD9DNwdHWErm59cjKX1I%2FfrSiJEz%2FZf7BzhwjWIKc9VedwbcNpEpCiISwiUzAwvda9K4dT68Qpol2DRcscKd2j8E9dIcY7WU1WhuAeKTvhlc9BU14oLpS0EJQqvFD0hoh5vlURI3dhv7qKcSHlX8WN21834VyWhZawM9ck0r5DFIwvWduI7PrMwwY4s69Wn4AS7lJwA34pfk3f0dE3jBaP3Z7Npz6iC6MSQbXGbskzM%2B3CQnXu%2FNkf7DNNGuZdyAtVzCa1qXLBjqkAY14KpwmmwmjuG1tY0nLi%2FHpemMOgipZB0mCZ0bCiVnahxQcaCc3HQXKDjF8VrYKYCeyZpOgpR1M6UgbviQrj4ZkQe1phQ8PAc%2F9IbnnZ3e40mFXUVy%2FITI5MgCQ5e3iEZ3GYHnTMDfyo4EaKb4nGWfidWN8G3jA5mTCQ3LPuxn8OXrDbAk%2BzFleokDmX3IHUyF9ADkNSl99kYGh5fFTYcVmRsNu&X-Amz-Signature=baccdf97c1fc4679eee6a3b7a68a334baf4101a93080159abb6a7394211a84b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OAAGB4L%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCC4OKUips955qgxGfTnGV2SJOxw4svr4xz8L2oXskLKwIhANTLK4QRWRP2VEiLwU0Qo3%2FRTKfDeqVELL2wWxh7D31dKv8DCEAQABoMNjM3NDIzMTgzODA1IgwJ6yWDrtyj0HWZaWYq3AOjyvfmbFqSUm4D4z%2B1knqcGPNkNO2DhEqVcc3lSJxRJv9am%2FEXkXa2%2B09nwPdWbiH2uIlgiKoXICu8H%2FqoPSTrAcheo2re%2F%2FfnL6upFpmlAycth3%2FzF9kCzyZjZgaxM92KAj4howeHME9KXi3n8r7bFZecP7Ec0qLA8I0SG6zO%2BCK0sp56t9E6p386pZdJ5pMabrfuBEL4GHkNz4W10YL2NCVEFE6KS8h7peRWWRfDvGgsPF1UFZatl21KTCYFsXcoRDnfmySM2vE9CYd5bpl3s74QJ0USWJKevN9xu5unkzUbftqjT9%2F84SBhyO6dRJpBmqSiEuhHCNo8GmciDULutqAngLmWyf2AU6hkzIm0C1lKxy5sx0%2BHvPL5OiojuTS7tSJqDV9Kf35CrJUEyqNuuYHceuqFCJK7swEGGTUHTo028NKUwJcCVksZBut%2BWhcR57d5kSDg2bh2iGXuuh%2FcBLHGVZp92qEZ0j91%2BSIY40I%2B78WlYacQAadnnw0rm7I1ylOFvYLltBM3XWqKXr4%2BgfuxAXBfDYWWgJzWREc%2BUOHcmo%2B3mL9T68xl9vBxce0Zq5WPmfOs9RqLFun2wLWdjCba38KuVXLIIb5UnH4hFkl3n%2FFmwpubAYOIoDCh1qXLBjqkAbGmZdBvWWJnt9uOoqY1CM7%2FKweqz3RIp0Rl0m1wprzhAKzFoN7fj7KAvJp5kvUaY2ISAO7wOcV02p%2FVFXpBFUsLI91yWqm%2FABGq1O%2FYcZtlbWoqHN5UtXmjplJth53hYfPZ8FZhsxFfZvNipesMzS5vWpqfnEduMUv9Xx89XIAnqtOW8xLcNuMsNTnKcy8GmINwGRT1f7ndpEvIkHEspiRja%2FBT&X-Amz-Signature=43e3f01803565fb0784b5de716690a7b658866053706b5f3193385732caabe7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2NRRLS4%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIDV22vE3kRIYuz%2B2m4o8osfxsVb1M93NBN0cjO5UZ5khAiEA2JLjoz3I78J%2FK7ksxkflVkVLaC3puiI2H7zov2Sdl98q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDLoyN9ez2Bwwsf28ByrcA8O5j83OoYElxXVSEsf1Q2bYPu73GeeFNpH9Wzj9wxWV%2FWEhuEgLvcerz8dvZbqj2ycFsLe32L3ceYx0Yj%2B2EvN%2FTpnMZaOPDEzG1hPzefarqKvwJGSkCRUi8ym1QsJj35w8nx5Hj0YJ4E7cAVMaUssFqFAKhwYd6vi0%2BFTKYZyymYbpmLxmbUu%2FS8dEGZe1g%2BEp5KCFsLv9cJ33VymHdF%2FT1ruplRG5m7G1dOVBr1%2BAxyU%2FJfpO3Bpo6gTnbZVMm9KrA8YMDgdE6YERxBZSolOv9IbI3WJjueli2Lzfiic2z2ifj2jWVXDHiZ%2BZmvRIa8vSbdZ38Ar%2BjEdHR0Z7W9nYIz1xP%2BACDSujzf%2FvDl%2FtdOyxgoJbcqeoUUpL0f%2FAUGSbmGrZMy6TKFScsR1YgbCKpOM7IQvFT3Z3bNGN49THwczWnGpGCT3T9SzpDNZnthSjtGnexdH0BY9wsc7gifqDsvcPBPphc2NYR9%2BJd9gGA22mgSf8GDwQVR5uQ%2F%2F5C2kxJebvrr7FAPbPyBEWYCqUeJzPaGivsFV6h%2Fc1S3ecVrR5Y6I2hvjHQajkGRcUQtdQexzMyU10yDdK9bMDR8v2A87ze8T3IpnP%2BCa%2B2ypyzM%2FMFhFCCWRX0aRMMP3VpcsGOqUBgwe8hTW%2FATzbF8TcYJKNagfebswFUH4eiUov%2FlBM0dpq48QOfl3jbI5Gkri98aC1Y%2FQ509GVXCSRxDJpqYnvucQMgSzCJvxtBwQTX0eunHtqMcILBhJL5swQ6UR0vOu0DEwK22JHNj8jTr5lyLsngLYQXRnpt1HWzNDpgETF3UhwHL4E4BiDZsGs3LQrEW41Vsx4ul05aaU8Ag9coTuUqHXEXLwP&X-Amz-Signature=d282a597ba0d8e575e4ada8c186d64303cfd5835d03696a301020ca8103a0c08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2NRRLS4%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIDV22vE3kRIYuz%2B2m4o8osfxsVb1M93NBN0cjO5UZ5khAiEA2JLjoz3I78J%2FK7ksxkflVkVLaC3puiI2H7zov2Sdl98q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDLoyN9ez2Bwwsf28ByrcA8O5j83OoYElxXVSEsf1Q2bYPu73GeeFNpH9Wzj9wxWV%2FWEhuEgLvcerz8dvZbqj2ycFsLe32L3ceYx0Yj%2B2EvN%2FTpnMZaOPDEzG1hPzefarqKvwJGSkCRUi8ym1QsJj35w8nx5Hj0YJ4E7cAVMaUssFqFAKhwYd6vi0%2BFTKYZyymYbpmLxmbUu%2FS8dEGZe1g%2BEp5KCFsLv9cJ33VymHdF%2FT1ruplRG5m7G1dOVBr1%2BAxyU%2FJfpO3Bpo6gTnbZVMm9KrA8YMDgdE6YERxBZSolOv9IbI3WJjueli2Lzfiic2z2ifj2jWVXDHiZ%2BZmvRIa8vSbdZ38Ar%2BjEdHR0Z7W9nYIz1xP%2BACDSujzf%2FvDl%2FtdOyxgoJbcqeoUUpL0f%2FAUGSbmGrZMy6TKFScsR1YgbCKpOM7IQvFT3Z3bNGN49THwczWnGpGCT3T9SzpDNZnthSjtGnexdH0BY9wsc7gifqDsvcPBPphc2NYR9%2BJd9gGA22mgSf8GDwQVR5uQ%2F%2F5C2kxJebvrr7FAPbPyBEWYCqUeJzPaGivsFV6h%2Fc1S3ecVrR5Y6I2hvjHQajkGRcUQtdQexzMyU10yDdK9bMDR8v2A87ze8T3IpnP%2BCa%2B2ypyzM%2FMFhFCCWRX0aRMMP3VpcsGOqUBgwe8hTW%2FATzbF8TcYJKNagfebswFUH4eiUov%2FlBM0dpq48QOfl3jbI5Gkri98aC1Y%2FQ509GVXCSRxDJpqYnvucQMgSzCJvxtBwQTX0eunHtqMcILBhJL5swQ6UR0vOu0DEwK22JHNj8jTr5lyLsngLYQXRnpt1HWzNDpgETF3UhwHL4E4BiDZsGs3LQrEW41Vsx4ul05aaU8Ag9coTuUqHXEXLwP&X-Amz-Signature=d282a597ba0d8e575e4ada8c186d64303cfd5835d03696a301020ca8103a0c08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SJMJIEF%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T230123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIEiDSXWdmjw1JeCskCrGfRA3ZfFEsZHZYbVutSehIcyLAiEAx4G6URxZ3%2Bu7xBOqWhlDzQYIFMRnnLT27YOh5e%2Beb90q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDPRpvLoI%2F2cbcPLa9CrcAxYb85CvBfx%2FLYWzzsGoUnKWoe51pOXWOW%2FeYWtCu7dKHwC0ab7mZcSH%2FCRjzRh%2BthcPW%2Bf66sior3R7jimchtOCuV%2F%2FXZgeSH7Rl2k85GsTlHeBAR9iNs6oUSQDZBVMIyhMuDzgftOg%2BGJk112sc6MyAX6mgx%2Bs6j6W6Oc08o02fxR7mMwB%2BXnTuTiF6583hfTFGGf8D8n3Y7%2FYlIBibsjAWzF6dyFE%2FMUAJqjuitaFAReE3KsDsWISSNLHErJSJS2kSZgMLL8tcHXkXfI1ylzO6JcGCwZdaoX7C2ImO4%2BaKVsQovqwTSw1oKq7H5mpDA6Ud%2F9xJYaoY54r1QBH8RHH7KyKHP8q5Kt0WpFE4Jho0tQNBmKKe628g9S0HJ830uHEREjt5ALJ7cPhhA8NDhNO4Yze2OLg67wY%2FMoiLUT6hl8APbnoQNgslh24yi8b2gNKPzeKrtJcEgILs%2BU5z6%2BuAAK2GWSqjBIt5gJexVxFfuG17JTvuF%2BCloPEbd4gn%2B5x3r1pstPazeRPGIT1pSerA0VDP16wE895axtGg2Df078Aeax8JA68redXFdnQA00iyjF%2BRTDBgCjcgJIPubAa8LvskLpmScGQjplAzMqjTJ8d7hvcaDEfn3uuMNHVpcsGOqUBhGytDC%2Fr4Q9B0xZzIY6FpUuxg7SasSyjXousjyjuUeyzGKplylcGbLz1qMVp%2Bum50SYbHXLCL%2FW5baVrkfILieUF%2FWBhOda5LtUxY2YYFt6L6hcqgT1OFJAn1y7RPO3Ju2u4ngQm8EeAW2%2FFyZmb%2F27KDY8sXcpePv0dZbqzyOSUtGOTUN5%2BLeTz%2B%2Fno5TuCDm0892Y7Hwp%2F7kU32vGYLT4%2B7EDN&X-Amz-Signature=e8fae52afbd29d50fe707413916d5a47d4ed8596a45a852239c9c98767754037&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

