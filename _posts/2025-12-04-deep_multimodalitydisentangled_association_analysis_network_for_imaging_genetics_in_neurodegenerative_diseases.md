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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664B7ZGWHZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIDW33Nje9NMNT9xDcQi4nUm3n1%2FVbI%2FLkNgSTKMOpLr1AiEAgafmuZCInBpgqyzaUgJhSnMCx8pkUt%2BCh0rc15OPcM4q%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDBxsAo7Hvh5fwRmaPSrcA5OiHLxQWdgHbUeqOK7zb%2BsaNNB%2Bf0bsCKVVhgNPVkv1i78jhu%2Bdlp%2FtpAgyirn%2Fytu%2FP0jd95%2Bl3vLTh95hegwJ0LwFqRihpifF8oyRmPC8RBDBtaxJAO3dmZhLjsUN5cBRNqeBc49wh2Yibf0hrIztzY68%2Bhl45eOtBM2O5mwVHcmpxUjrbHFUL3pu%2B4FH%2FwSW5y9T0q6M2pIn3WnVKZladMrgSAt%2Fl6hs5AiguJBDo3Q0hTVRE5vzbxXi3HFk%2BxTk83TSpHvJG%2BV8d6uVfphrbqckKtHppq3edPDm4pTPnzmPxf4I89HyGkr95iLUB3OSk9xEuDZJiNl7fAecJfUOJDgLtRQ099ATl%2BGtvPpZESBjPCIpc3iXBKg9qKBm0cpVBGTWF4Uc%2BicadG%2B9hswMGfh8OIkPDDTRE13JbxTd5XHN2SHctlja675m9TjDjr8nlasgw3ordYG0WWlfFI653G8EnQ4I7Xx9tFSuOK%2BFFSmjNsNlupfA6ZMatu9RjQ9wv3qj2%2B5kP0JI%2B4NV%2F5n0LM8goHY9U860umN2Mhl4Zg9MBVL7sX0iayii8paAZW9dwZHNJFPqI4zkf9L%2BcWuAxenbsqbBcLjU4i%2BP63Mz4gL2X%2Fyt1ymSfxN3MLnmsM4GOqUBcdEt88zmkIedvLwb%2BglCrzHrJ%2BGtYtmqOL6pEORkKDdWu3gUAwv7vSXoidIFWL5lNuZ1MS%2FUxosBoTWWOwwKo6bU1ajzfVUV1j42QqCa5o6OBUPSKRNFVQ8ckkhQe01SCyPJrOugP2jRj1S7rZxswIKZjdSGw%2FtNhlG5m12BVWgS9hji%2FaE80jCrUy5fYI7EkgWS8gDGiP5e43Qs0stLG7osuLBY&X-Amz-Signature=5824c40409fa50f4aeaf5c1973acd40f13e4fae905adf287ef80c8d491c6a2dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664B7ZGWHZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIDW33Nje9NMNT9xDcQi4nUm3n1%2FVbI%2FLkNgSTKMOpLr1AiEAgafmuZCInBpgqyzaUgJhSnMCx8pkUt%2BCh0rc15OPcM4q%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDBxsAo7Hvh5fwRmaPSrcA5OiHLxQWdgHbUeqOK7zb%2BsaNNB%2Bf0bsCKVVhgNPVkv1i78jhu%2Bdlp%2FtpAgyirn%2Fytu%2FP0jd95%2Bl3vLTh95hegwJ0LwFqRihpifF8oyRmPC8RBDBtaxJAO3dmZhLjsUN5cBRNqeBc49wh2Yibf0hrIztzY68%2Bhl45eOtBM2O5mwVHcmpxUjrbHFUL3pu%2B4FH%2FwSW5y9T0q6M2pIn3WnVKZladMrgSAt%2Fl6hs5AiguJBDo3Q0hTVRE5vzbxXi3HFk%2BxTk83TSpHvJG%2BV8d6uVfphrbqckKtHppq3edPDm4pTPnzmPxf4I89HyGkr95iLUB3OSk9xEuDZJiNl7fAecJfUOJDgLtRQ099ATl%2BGtvPpZESBjPCIpc3iXBKg9qKBm0cpVBGTWF4Uc%2BicadG%2B9hswMGfh8OIkPDDTRE13JbxTd5XHN2SHctlja675m9TjDjr8nlasgw3ordYG0WWlfFI653G8EnQ4I7Xx9tFSuOK%2BFFSmjNsNlupfA6ZMatu9RjQ9wv3qj2%2B5kP0JI%2B4NV%2F5n0LM8goHY9U860umN2Mhl4Zg9MBVL7sX0iayii8paAZW9dwZHNJFPqI4zkf9L%2BcWuAxenbsqbBcLjU4i%2BP63Mz4gL2X%2Fyt1ymSfxN3MLnmsM4GOqUBcdEt88zmkIedvLwb%2BglCrzHrJ%2BGtYtmqOL6pEORkKDdWu3gUAwv7vSXoidIFWL5lNuZ1MS%2FUxosBoTWWOwwKo6bU1ajzfVUV1j42QqCa5o6OBUPSKRNFVQ8ckkhQe01SCyPJrOugP2jRj1S7rZxswIKZjdSGw%2FtNhlG5m12BVWgS9hji%2FaE80jCrUy5fYI7EkgWS8gDGiP5e43Qs0stLG7osuLBY&X-Amz-Signature=5824c40409fa50f4aeaf5c1973acd40f13e4fae905adf287ef80c8d491c6a2dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXKWJMJ6%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCKHzsJYWp5FqFTkgONw%2FuzvXVE65DGlyton8ESyJWqwgIgBUz%2BmIIaZG%2BlxYi%2FIkVdrDK7C6UqVuROUrqSEFQgBSYq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDCdAEng5q5LFZgbEoSrcA90qChs8hH0ImJvOnkj6WdfKB3RolbkRa6nomKIM0GiXa89e%2F%2BTq%2Fu%2Bv7lSOX9%2Fiwt10AKR2Xow0WTz%2F9HC17okd%2FGXaLnRJVZKNUKu8bduYypl136awchYjaNs08Oqev87IXt0KhUlvtIYsbssqRefoU%2B63eXnATq6QXlCKVsYOgW2a8EJ4CxR00Cru420Aex4Tc8PPQRWeiYi9R3xXOD%2BtSXQaovG2qm%2BFYhAxt21TVUA9nTWmBlk%2FC2zEzekcePA1ns%2BjB6ea7G0rbhhDlJb%2FMXYi9K9U0s0xhqgod5JcCm79uPi23eKoU4F%2B%2BDUu3EbHEqg7S5fU%2B3fthgB7ARNHYhW4509x%2BQ5Sx%2BGyDeqXXbQqeyzMETgB8fBZpCsBkQXqfgBNSMc80g4sbyNE%2FH6BIQqzOq7f%2FBsnsE0%2Bzihbf1MDQ0Vov5YNdMYgfRfExMygnrYhv1uKm5Mkl19nDx9QeAH6PUDz3t%2Fg3XQY1cD464mbRDz6xV7tPVG5ub21bXUhabYufLhOohFvAR3dn5rtq8pq5O9G5aRjFE1Qa6NYCOGNJsQOD%2FymPNeFK1EQmOlAi35lwjoyjGmkT%2B%2FcC%2FOsG6MQa9GtscZnN13Mbn8%2FLwZNg3Ya8Wsmwlk4MNvksM4GOqUBEeAddThaNE1Q6XoFRFbD4InMui3QEADX7RC3CmbzAMO6GlX7NOG3ZGD5UgEfYQ4zUecaPtDXrjzNuGoIzbSP6wrjTb3ocHGb742y5JV8w0XcA9GPOW%2FYMOUjQeqFA5uVebCzPlvFVbzzAlzkbv1EfZnUoNuLN%2FJ0YFTlYao5LmpBmiR0FZEiYfXyuahB1CzC9ZFNUNMua80GXV6a00hJKeiKrbKs&X-Amz-Signature=4f6d18c78fea9cb4674e67065b13a25f392d38500a034de9501cdf435fbf56ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UF3EPZWC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIHqyYYigY9HzL220N6wkEEYctAutiLLOd0CUZa6tp%2FgfAiEA4Dbsqnm%2FOJEnmw2KH2ZfLo9aNwMJ3Kf4nOaHyj%2FXB%2Foq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDFsOumobXHMmZfSWyyrcA5OdFNZ0SPLnqVNaJVFkKxAI5LS%2FyVxclyB45NNmEAhpgQJbg9OL7nR3ruHyCyJuQi3eyO2dWN40e7l5OL3kYQW8FDEPTShAsmHwh3nbCgo%2BGKKOi4E6CNnfWKTOzU3tCzAKKgIatKxo%2BLlkBCmCRqSpnIozozqeMhenfCOwITgZLuaVebvTropaVafsgzIA6JcMhfQR6k5rLxID%2Bx7fhSS%2Fabhw%2F68sLhK9xZfqpxH%2FMqFyr7JhcVgDSD7srmvyRPyRR5LnOlqbA6wu2sLe20FRvXiEOUunpOaTlOq6GNFyCQbKkSoWOUDn0YLuQi0DtLnwDZ%2FQCVUyPdUm%2B5sjK3pCyvhnoi6rFxzXTxnYoloBDwvGzXMdTeLfgXgVRcYygu%2BY47IlOAm%2BLEGJBCLrAHlPFULtIUoQjl4V7%2Bdx1vVzPoScWnY1loQtufVagW4G0XkK%2FJFR60CT8wjJ9Rjuys%2BfYgQ37NnP8MMcJB1G4WiqTUw7vDgrXcWxTnez0mouVQ%2F98%2F2geTH5lTS1CdxeUaf%2B5PaPK%2FlnzXQGWPwoGapTRFiSA3HmrtvCSiPTrq7rWjQzsiCSj%2BGvnMGvjvxhy9PJybUZQczs2ftQJ523k7uvI8ISrGGvoS%2BZI33nMPXksM4GOqUBMQCl%2FcTjh2gfYRgtzqUVRNpOexnrYj02fT9k%2Bd0jBMVSL9Vkb9QdYejlHlaOY9NrXtkLmA6GEbhq4gFh6LkzK0NPSh3NoUNjPJGJXW6aEMPPlkPUVhaBZRdAEyUnpo2VrJJJZ9iJxvdpWw9cTeJIE%2F0xTzJ%2B0Ry8PFaow30HHqCgCoX%2BeGifl5dPFox%2B4I2fgR5ToRVA9mHhghZh4AB7chFUNV0Q&X-Amz-Signature=270434ff090f5a4135cb64b6fbdb4f60b68cddb4930591c24c14a8d1d1c12733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UF3EPZWC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIHqyYYigY9HzL220N6wkEEYctAutiLLOd0CUZa6tp%2FgfAiEA4Dbsqnm%2FOJEnmw2KH2ZfLo9aNwMJ3Kf4nOaHyj%2FXB%2Foq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDFsOumobXHMmZfSWyyrcA5OdFNZ0SPLnqVNaJVFkKxAI5LS%2FyVxclyB45NNmEAhpgQJbg9OL7nR3ruHyCyJuQi3eyO2dWN40e7l5OL3kYQW8FDEPTShAsmHwh3nbCgo%2BGKKOi4E6CNnfWKTOzU3tCzAKKgIatKxo%2BLlkBCmCRqSpnIozozqeMhenfCOwITgZLuaVebvTropaVafsgzIA6JcMhfQR6k5rLxID%2Bx7fhSS%2Fabhw%2F68sLhK9xZfqpxH%2FMqFyr7JhcVgDSD7srmvyRPyRR5LnOlqbA6wu2sLe20FRvXiEOUunpOaTlOq6GNFyCQbKkSoWOUDn0YLuQi0DtLnwDZ%2FQCVUyPdUm%2B5sjK3pCyvhnoi6rFxzXTxnYoloBDwvGzXMdTeLfgXgVRcYygu%2BY47IlOAm%2BLEGJBCLrAHlPFULtIUoQjl4V7%2Bdx1vVzPoScWnY1loQtufVagW4G0XkK%2FJFR60CT8wjJ9Rjuys%2BfYgQ37NnP8MMcJB1G4WiqTUw7vDgrXcWxTnez0mouVQ%2F98%2F2geTH5lTS1CdxeUaf%2B5PaPK%2FlnzXQGWPwoGapTRFiSA3HmrtvCSiPTrq7rWjQzsiCSj%2BGvnMGvjvxhy9PJybUZQczs2ftQJ523k7uvI8ISrGGvoS%2BZI33nMPXksM4GOqUBMQCl%2FcTjh2gfYRgtzqUVRNpOexnrYj02fT9k%2Bd0jBMVSL9Vkb9QdYejlHlaOY9NrXtkLmA6GEbhq4gFh6LkzK0NPSh3NoUNjPJGJXW6aEMPPlkPUVhaBZRdAEyUnpo2VrJJJZ9iJxvdpWw9cTeJIE%2F0xTzJ%2B0Ry8PFaow30HHqCgCoX%2BeGifl5dPFox%2B4I2fgR5ToRVA9mHhghZh4AB7chFUNV0Q&X-Amz-Signature=bcb106c053094c0dfbee200bd1ab41d0dde246a73ad9553de02a433c4de0f2ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPI6LT5E%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIEN1IQS0ZHlFMzCJPoIo5MucvcOARrXd%2F3qRsx4K51FUAiEA1%2B64U4POIGilo4HetmYsvuGbNEavnWqelXUaK7XnaW4q%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDBWCElJr6pKiadkVYSrcA0fF6y2ubv0CR1YpKmD3CkSGtX7%2FniMAukIeNs2xT8CNskJLtVNKu4Zi%2BMCXcdu5hPK6UbyWca%2BWIpJxMyyms64EntLtVg%2Fwn9%2BJ5SD%2BXubQftzACSt0grCzLWLdvKrkvj2XMCwKtwvF6aEZ3%2B0Z2vwvAqrcrTleJZaLIGkUMJz5Qpw4EoV0i8ZkD986dm%2BpsbJYsRiU%2B2xb3Z0AYhGi5%2F35FabjUmkMHdfd3uv5Jlm%2BlLINuAMdF4cFlVIl%2BEyIqV4NRnl8r%2BXsrS83nQEuWWXW0Cv6egShaRoArASmglL0kQ%2FGuGWjMvX2kcu2nLrgbWY5bpsJNWcpuYG6%2F5jNjgtxuw46Irxz0OKgDrMqsaQGoDGQBRlaO1xnB6lzNNXKMllByv%2BJpnph5wvcrRspmPNzsDhyEdU85WeQ0NKXEckBopHs6%2FL2cRh123XsefZ1Wsv%2FrENPeogJDmLHK5RwcvU0KhakG2gHRtPKaMcRyTkZ3wbNpySrT46waB%2FyxY77twvgDWcgPfcExiUKG7jQAuHs9x7d2QiBv7r5m9Za1ZhVId6gQKo1pUTgbjjA3rCCWSXwajRNCxX388YY02KC2tD26743Ss3AgIu%2FYaSq%2BbDddSUhAUfLEVDqZkneMI3msM4GOqUB5IVVezydxUYMNnjcFC%2B3XWuyZPW2nJNI519OuozQZ%2FstD8JdpCWEALqkFd%2BMc0KctVinGX7%2FXyszoHnUlO4YETaK1ZPFanyOiUnfYksadLO7oH1IZnnV%2Btu1P8ftKmUWESoOHP82TPHAzYtmDs7Bls%2FLlpT2S0FFswKXo34hqXUZUlId0%2FvpBfu9TzIAN1BxpUqNnWL%2F6DjlqiKkIMP6JQ8Az1dJ&X-Amz-Signature=73f52b2eb7f4b5e7d20688a38b853a192eea08502a3a192a1d30ebb230ab95b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKXDONJP%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQC2SAVXTnL5PgFfApFtHEj2eq8G2SPArWI1l5rDm4Df6gIhALn7Rgxoyl9%2FZtFzhq8fiOzxnppei1vmTkwe6irUB2YTKv8DCEYQABoMNjM3NDIzMTgzODA1IgynI%2BsMUUR50w6l4kcq3APOZ9LMrz2%2FadTZmIFV%2BlaJBWoVeJm9t%2FZ1ZD9%2BipnB0yUkknn7hvwVG6IF%2BJJyxViRC7skc%2Bn3Ls7bWQbBsWusgTQk%2BzFRtuZY9tMWLH3CdcBhxKlUyGNSE0ShyhA%2FegLQFCFtQaGibCE7VLvS8jizzLhT2O9zuU1gu8b9vOfTcWP52z3AuLx%2FqTdKchd2qkLce91P1JxHqKWGPjODGDEAwO5rUNU61z8gEBuMYiOMnaXtsXE%2B6v8UzHzPQ8coSt15mti%2FjjWh9bt5E37K3aYN8Om6xqubbxnv0MTnmhKcG2pg9QK%2FUU0b8ndAyghsdLWUUxDmbG7H2jJRIfAZCw%2B7gCMEttViEt8aVODdmFUtj8fjgdyqivtBTtxUUp9rWYxxqVu1zT%2FKOnuz4g397cOa2OXjCnmi6aUvTjwfsaeop4axBLo8r4rIVTvENdFXd7fybQX3ba8PZr4nWb4WBeD906o1pV7reZkx3oXe%2BKmNzu7NAo031NBI5tK%2BjbjpOX81Y0cvRbtkPDlCyvvEMCN1lUu6z0lAwK7KtXFkdT4Km3RGVuLiKXvJzu0dFOCM5hmBrlD1h3OfUQ4ATWxGUEar6EAs9Gax7deWjMT2qBcN7aGdJhURWcIopbIvezCO5bDOBjqkAWtCaKG9elQ8HjwH5q40AmiYYr0MhodKQBraM46TwFSireLtWm20YqUFTkJLo5rbVdSaMrNjoP4vjSRchMgo3LJxjWccm8A5EW8OiCPn1DwdZwcVNs2ftqCYt1sEeECIwE8ElZu820PNbrBmPQFkwS4i0WJiCwwQiAz5UJq2sN9p3q4xChzVsbZBpKEtJ9TtFJV7KYg1cFJv52sqsul5HaDXzUUK&X-Amz-Signature=e299a4b0bf874c6d74cb796f911de12f2437244f5d11fd047119eef20a12d7ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYIU5IZZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIDcv9VX1MRg5AzKyFoEHyZvk6nCf9WGGaDIaa8SpDSiZAiAthStCaYyYJI%2B8GP7fi%2F%2FCrT7MBDcnupEOjFZPYTYc1Cr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIM3yuv%2B5jDgFuPVuB6KtwD0qIwvR88JI6%2FCQgse%2FkvqMJbKn5gHgwkxP6pllShYwD8sOq8KcNINYzpfyZXOk%2F9J3m%2F2ZaMOAFDx8pnN6KqJIbOmjJ%2Bf%2BVTaoXy0yuff3y8xN1OE1hBpXwLMcp5Qi9Nx8o8Vc1FnSoeGNVAxtYl18MXOpmw2gXVFaFKaF7LRairHJK7BTfftEvcYUwPM%2FArr0MsuTvVwc%2F5ATJXqOMf5cwY7RMGif6cSrIFCqVXlX5hcR44YXTp%2FkNYEerxqCa9AYpemApADFtrA%2B2vefdPU6i8D%2F6iwiXQ9t2exiJ4xVMKUIz5ArG8NwhcCFTNnFRbPUAQN49LqaGwVSgrny3LIg1J2StzLuesS2d%2FZZDFBTreqAcn7R1em5bucycJECp5yFjrVGlkOFdUFen85z1Jg1O2ZrSAfFenExK440MoF8XEmMz6mLX5qKS1lU5YF5A3QFA7Jrmu5pLZSIGqqHKWpOk%2F0o467Nk4BZUqMPJGyXGNvA5J6WSKaDTxlwT83vEsz1zZhyxMX1u%2FmnG3ZEgMA%2Bv1f7y8iXvMf2Ls%2B5r49rQAxeni8M8NYDUGhhfz5LdkKyvPtpp2Imdk0UgOGAD6wa%2BmPseCLDClgMnUPkjZp1S7XoH%2FfoOlGFG91EswlOawzgY6pgEfDyrzlGBqbUGohOpyV%2Frpxj2%2BibNZBNLq2ND%2BwPGd8R6O7FuRD0tLgk5zMCdEtO1Qat5j3tMhPtf1PIQNROJxcSWYBcUWGEGb6txQ0ot4BkRZo%2F36GWSoS1GvvMq%2Fu6HASjNovX5EsL2tu4Oo6FFu4%2FHpf8fhP7CTNvDyq%2F%2Fy0Akjd2xBEMTfzm3TPxtEWXhoNWzx5Upl6acDmj9ZW3LlYRKBCpzF&X-Amz-Signature=63bdeed6cbbc27e4eda79736bba8a55bd23df6dbc368140e8ee7b08b1d53e778&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MHOXNOW%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIBKzMYi7I8KEW3mOu%2FFg8BZZNwUD6fvBfuGcXalFZZAxAiBejCPlAfrGvfsTFwCOYnksNQh7xB6iOBVOyVgFbs0Wtir%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIM1OTYrbiGIp2YJg8wKtwDpUUkDSY3v9Si4ut8624QrLI1VzQOn7HouxVGr%2Be5TjOo3FmNl0pMPt0eglJkC4YKaHSqQzc%2Fl3xMZ%2FoM7x9JQEnFENLSJNsXdA%2FFm61dSg%2BdjqGesS15X%2FacTDxKyalVSUkApFlgcbJb49lQVrcPTJgvCtfgej%2FyQexB%2FIKS2%2BrLGq9J2h7G4ec3YpUDLZo4ImbVRZ%2BH3SNLsBEpVegJ1BNpb8WMHo5RoWLZPiWo5NUj4nh0P4vKTAhszEv%2FuNVPcJCPJrJa3SOPD7SHof%2B05i4f1UMrLkhvqSAnXXCOBZQ8uPzGD9uN4PMLFdwSQURkCFQ3ynGVWm8wiRsFqijPiQWQhexAUhUosEyQ5T4B358i9krnA0aAcNR8Lsm8T9CMPvXEzd8E2OFULX0zwUpi2w0ZY4bG6etWGAKfW9Y4Oe9IMzhszRlYoIn5xxpNE01ux4gXku6NTBvLILuMqhVb05YUqJ5WykT%2FWJbAShcn92I6P0eRu69b%2F9vTdFclsG8UyWa19PSQiHHBkointEp0xV9skFyncixjHQfBObW8GrGkosy78W4yJrop9pYmEftoiAAFgANDbfBFOII9dyhc0jniD2ZH%2FW2z6JColHDujhej2qzc2AxQZEcG99kwjuWwzgY6pgG4pFiYykfyQ2haTe31nN6EIofLneMbbjk43P09Sw4Gh2NPfWvi3bh9LDcQBf3ZXnDEc9fw00h0Lu%2BiP67wwOlmGKjf%2Fa7%2FHfrriIqh2Sea5quT7B3q%2B7Zfjpq4K0CUyQ824SyXz9xGlj9s2tAacm0N2IKv%2FEe5zDQGYbIhtnaJOJSioByHuVfpP9uGCK4q2mHjzVbjkGnpMbtyMYQrO1gNDbPDtqgX&X-Amz-Signature=53b0d383731e20086226565bbff4d5b3e87b3d2e26b56fc7950a2c5c0f6f44de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MHOXNOW%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIBKzMYi7I8KEW3mOu%2FFg8BZZNwUD6fvBfuGcXalFZZAxAiBejCPlAfrGvfsTFwCOYnksNQh7xB6iOBVOyVgFbs0Wtir%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIM1OTYrbiGIp2YJg8wKtwDpUUkDSY3v9Si4ut8624QrLI1VzQOn7HouxVGr%2Be5TjOo3FmNl0pMPt0eglJkC4YKaHSqQzc%2Fl3xMZ%2FoM7x9JQEnFENLSJNsXdA%2FFm61dSg%2BdjqGesS15X%2FacTDxKyalVSUkApFlgcbJb49lQVrcPTJgvCtfgej%2FyQexB%2FIKS2%2BrLGq9J2h7G4ec3YpUDLZo4ImbVRZ%2BH3SNLsBEpVegJ1BNpb8WMHo5RoWLZPiWo5NUj4nh0P4vKTAhszEv%2FuNVPcJCPJrJa3SOPD7SHof%2B05i4f1UMrLkhvqSAnXXCOBZQ8uPzGD9uN4PMLFdwSQURkCFQ3ynGVWm8wiRsFqijPiQWQhexAUhUosEyQ5T4B358i9krnA0aAcNR8Lsm8T9CMPvXEzd8E2OFULX0zwUpi2w0ZY4bG6etWGAKfW9Y4Oe9IMzhszRlYoIn5xxpNE01ux4gXku6NTBvLILuMqhVb05YUqJ5WykT%2FWJbAShcn92I6P0eRu69b%2F9vTdFclsG8UyWa19PSQiHHBkointEp0xV9skFyncixjHQfBObW8GrGkosy78W4yJrop9pYmEftoiAAFgANDbfBFOII9dyhc0jniD2ZH%2FW2z6JColHDujhej2qzc2AxQZEcG99kwjuWwzgY6pgG4pFiYykfyQ2haTe31nN6EIofLneMbbjk43P09Sw4Gh2NPfWvi3bh9LDcQBf3ZXnDEc9fw00h0Lu%2BiP67wwOlmGKjf%2Fa7%2FHfrriIqh2Sea5quT7B3q%2B7Zfjpq4K0CUyQ824SyXz9xGlj9s2tAacm0N2IKv%2FEe5zDQGYbIhtnaJOJSioByHuVfpP9uGCK4q2mHjzVbjkGnpMbtyMYQrO1gNDbPDtqgX&X-Amz-Signature=b43a669f1b5fdebb4421523bc8f99cce0cb5a69e7e23d58dd1b0d201ba5c9ff9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQZHZF7G%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIETlqlqlmwt5HuUQWSKIsJ%2FfZopPh4ORHMm7CExyL8FQAiA7tAlw3AwFVW7faUNEkuG7E6UK5fezYoWAf%2B5gOY7k7Cr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMNL0%2BckxVCsQH2jVrKtwDTIurI41B%2BlVKeFioaGB%2Bs%2BiYYSdlWXqlv%2B51oYWepQrR9RmX4GMXOAcTsl6JkBCY7kuUPwllpWqi7FgF%2BLmd0RkaSab0Mon%2FTK1g%2FYIJcdgFF9FVjFFnia0jhNBuKbxuHtHpRjwRnroNvxt%2BPkzPd4sL3NezWhZFILcH8uW9SiHcxQNJbS%2B4p8iOpZfzYvkR1Arf3bNzlSnImEfq%2BQJ4A8aHYFlCK1RqsU1s8DfavuNSGxqFmeuzLBf9g%2Be49iS8zGOPmhyWizN4DXzLQPt7QZH%2FhUA1UIzPxA7Q7R2fnfwcJcH5ifR%2FtHVgDvm4QSa04ETsaIlldf%2FTlQbnzpYJirJ%2FXNHDeq3%2FuMErlqCv2cvQP96%2Fo6AfJ1wycF8vd3CGl0vRuwJ57qovjPC1f9f00a%2BjL1x2RujiE%2BatN1GrcQB2M7wA7s9jOv33ogKV%2F7G58S4fEtfKcq06X01ZmjS21PP4iK0hXlZHi9Xuk44bEgAiW%2Biwvs8W1OWlwL4gYDokjTukEGRxz0jBygufbcQj8CA86ondlyT%2Fq1eIjA9Ha44VKvABgJuzkDpxKdckJZzf1IHGvQ80KQ6UTdq5syxmQlJ82pi%2Fh1Tfo2%2FaaYkaUKKkMD990HrvGZ034WAwjeWwzgY6pgGkPB9qhBAPz65TnirecQWPF90qu5dUhkje%2FQ2Wj3T1UQhl44I5ilhv%2BRwBZpPEz2s9upZzULcQKeBh8IdZy7g7ANvUoiKgwpwvcEEe64AZTp%2FLyYRC596GD8YCjUZysgi%2FcGDl1k9ZIK5ufRv7bX%2Fq0ncmDi6HUNYrGhU74wTvpn4sOSmJZaAa9sRkij9TReRHudwo8QSpE7duP0AmGe%2BE8cKorrGU&X-Amz-Signature=6ce35eaa6e397635733d547839c17bae606954de10c8a8281c85f9d35d2c297e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JEP2GOE%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIF6%2FitrFQCKDydCTpWBzHh%2BIq8JSmnTfdgksDN4m%2FUCJAiBfiVMkbNRtZjwqcabCB08nzYOQhx8hCWwueLw%2FXBK5TCr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMBotJZyikD6cYcb0%2BKtwD1FyfuWz1O2i5tVFmWGRgSE%2Fxl2aTIOzTg1UuDckTatwv%2BdbR6Z5fUAxEtveF38wn1zErEBgaCff0C6kXNmDIu%2Fl%2BfKpJsJdT7g3iLxNUyJC8uzE94p6zZb4Ra01YxCq2U%2BiWqrzvYjXWdohNuUs8HSQnvkK5SGQDY4cluCMrxcrM8%2FPJJGnX6CAS%2BI4BHMBdQC824kkXVNvieyT7LcvcV1goUhbJAp4nXW449MeBEYAMkfYwFxjosRwPLDR89VEg7YZAQZbYRz47jIYhB38MyAo9kMF4dabqnDHQDvYdVpVzNQTAskJSuVF1cvd4IExIbmW%2Bo3w4igk9%2F6vUAEy3PRKCwhv7REJnmCIp6XoV0ZhGhhvByKKKuP4tsLk%2Ff%2F96snFx8w0xpHa1VXVx%2B9JgCOMtN0IcJ0%2FY4btPm8lb70QGvZcxfCHpx7J8pZv8QSFasBEnJEdZW4lx6z9PGBXsZsWY29tdeQRgqBkQ2%2B5kEigfJEnX1AKdJGxG6Az3fty%2FhZE0shDKqOwaZ%2BnswepG%2FcWOHhQUXSx8UYF2GmmaFqfZo2R%2Fc6ZcZYIcDIoCvaOiVG3BDgW64v%2FdcEbhg0lq9BkHWY0T7FmHYaCma8WeFegp4PMqvo1B37LMa%2BAwkeawzgY6pgGyU2j6VjubygO8sNs4jCNghWfywTFxSRxpTZYvttNNgkTzLwlH11Dtpj4nsfc%2B1l%2Bx5Wu%2B7ovkfYbx190JY2ClpOljUGUddItyp7R5lswvaWXq6EvcHTyrqOcbYLkY1jbXNa4bw9b6mAhsW5OyEzw%2FggZgLsn2aN0V%2FDSSFrubMEU%2Fp%2BRPAZYeGkrNisP%2BUWjGfZY5j552VxXzTddHPp9bcPJOb%2B%2FS&X-Amz-Signature=e4d4fa2d75814d02483d60bd10e637e710f6c048f0ebddfdbf8555b23458a44b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JEP2GOE%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIF6%2FitrFQCKDydCTpWBzHh%2BIq8JSmnTfdgksDN4m%2FUCJAiBfiVMkbNRtZjwqcabCB08nzYOQhx8hCWwueLw%2FXBK5TCr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMBotJZyikD6cYcb0%2BKtwD1FyfuWz1O2i5tVFmWGRgSE%2Fxl2aTIOzTg1UuDckTatwv%2BdbR6Z5fUAxEtveF38wn1zErEBgaCff0C6kXNmDIu%2Fl%2BfKpJsJdT7g3iLxNUyJC8uzE94p6zZb4Ra01YxCq2U%2BiWqrzvYjXWdohNuUs8HSQnvkK5SGQDY4cluCMrxcrM8%2FPJJGnX6CAS%2BI4BHMBdQC824kkXVNvieyT7LcvcV1goUhbJAp4nXW449MeBEYAMkfYwFxjosRwPLDR89VEg7YZAQZbYRz47jIYhB38MyAo9kMF4dabqnDHQDvYdVpVzNQTAskJSuVF1cvd4IExIbmW%2Bo3w4igk9%2F6vUAEy3PRKCwhv7REJnmCIp6XoV0ZhGhhvByKKKuP4tsLk%2Ff%2F96snFx8w0xpHa1VXVx%2B9JgCOMtN0IcJ0%2FY4btPm8lb70QGvZcxfCHpx7J8pZv8QSFasBEnJEdZW4lx6z9PGBXsZsWY29tdeQRgqBkQ2%2B5kEigfJEnX1AKdJGxG6Az3fty%2FhZE0shDKqOwaZ%2BnswepG%2FcWOHhQUXSx8UYF2GmmaFqfZo2R%2Fc6ZcZYIcDIoCvaOiVG3BDgW64v%2FdcEbhg0lq9BkHWY0T7FmHYaCma8WeFegp4PMqvo1B37LMa%2BAwkeawzgY6pgGyU2j6VjubygO8sNs4jCNghWfywTFxSRxpTZYvttNNgkTzLwlH11Dtpj4nsfc%2B1l%2Bx5Wu%2B7ovkfYbx190JY2ClpOljUGUddItyp7R5lswvaWXq6EvcHTyrqOcbYLkY1jbXNa4bw9b6mAhsW5OyEzw%2FggZgLsn2aN0V%2FDSSFrubMEU%2Fp%2BRPAZYeGkrNisP%2BUWjGfZY5j552VxXzTddHPp9bcPJOb%2B%2FS&X-Amz-Signature=e4d4fa2d75814d02483d60bd10e637e710f6c048f0ebddfdbf8555b23458a44b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WI7XVWIZ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T222212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQDuT%2FmOVs1AvidmQjiMxRfHeuvOuaFuw65TQ4c0baSuyAIhALdrM5%2FOBEk6aBdAtTkDMfOBmt%2BKRrg1ivdFYpV5qUW0Kv8DCEYQABoMNjM3NDIzMTgzODA1Igz7HkxktxV57MT9uyUq3AP%2BxYr9IvxJLfJ9UomHC3B%2Ftsni4dJMEkQyGRpjBfgCPHY1sZdf%2F%2B0Rkyrig6rCThk6t%2FjuvQTNV86UPCNVCRfy%2BItMEzvvXZlahLGlyaTTpfwYBcj0UMGGdCw1JaDnYhca6ihLPQfnT3ZFDKx4wPNtdWgef%2FW8rdHtngEl8BaHk5RZaYZ2jEUkAiE1NKXaDQC6nXrGf2lbR1B03A1vEaDsnm5NGCqCpnm1VnXTx2qxi57Okiq4%2FbEQ%2B2f0kXoVYHNRWUU9kUg279W3PrsYbeoDjZwBDu918gsCMNdEjS50S7BMuC8XbD%2B6k%2BO%2FfXmfoYauyJqP4zbhaBn0WfVaXkl2bE9lo%2B%2FbUkkZd5nAYZ%2Fy5HwKqG10HxJxeRtevY22aMBhHATz7LAgWAVqyhCwE3rp6xJm6LS694Ik454hHhBxpBO%2B%2B%2B8Anwgbqq4iKZNOYI8K9YC1j7BlzBtEuuN6gMu%2Bq7hKxFLxiTDqD5cABfAzkwikwOSuRUaNhXBfevMtAAJy2GchYOJakff144B5S6jGMrAM1jPh5%2BojbAttfxz5GKXLExvwEJhDwUqeuiAvINwCl8h8mI6PNqZIU3E%2BHDwYiNzujFOJwxNsjj3TwXMIAAaEYIdz0HfHM5ivlzDq5LDOBjqkAUlUqD5uj3Rm09dOZ3rjvIXsZYL3X1WNrWUOPMpCna5m3wZBzpbCS9TjS44UeG2QCVGPbdyyB2Gu9m8QFM0Rg8i1sakuFonWZ2NiHfyBxaeLpJcSVbRczu%2FgY8KtGSKlx1USF%2Fdfy8FcE6q%2FCQ3UXZpR3NBH%2B0N3YZVLghXR%2BI%2F6GX9lYmD6QVywmN41xGicG%2Fn9e%2FV2TrLJHd%2Fg332qBn9Sc3x5&X-Amz-Signature=b3dd75d0efdf73860c0097e8dafd5d0680a1b9d1600b47abc0c034c1f365645c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

