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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXQ6EGQP%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIH6yWu0aQLQL8gm94T5g90SlbliPy5soDpAPMrRygvNBAiEAwhZbaaG%2BjuflX7WbiJm6gcuGoVCGDg%2FSkfyWxUBpGv4q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDE4IPhF1Zb%2FqAsLArSrcA6t6itK9BcoNpv70C7XZqpt1WIr4yfZgydZ6JgzPVaIw%2Fnj6BMTB5U%2BXmaAznHkTpbsHtUK%2BGvSo8lwSkCVxM56LjdemO3DvN7cYgK66xAPbz5Qm5OypfxN6xzdUQRf08UyqDdM3KwrjHzeNIEtnRNeeiiHIfKGn68aa4Hs0fXN6pZuiDznD%2B4jgwRoJu6HTQV89zwMMT0%2B5oxBHSAJ1wkV%2FGuLc7%2FY72F5wvW7%2FN1FdKwf2Iqc5Z4SeeqvXos14WN36btpT2czma%2BR14ppY2FbxhroA%2Fo5pDA%2FT936VTZawlYdKG0rZOZ9Nr9VfhBaPZggqhiUGQe5Y7HditwWMTMECs0%2B%2FP08HB8rbXJmmyHiAujJcGxVjIdP0jwnQZaMUc%2FEFRvr9tP%2B4OszPSEqKsEpZwAIU%2BRyBuqULEydR5%2FPqzRZB1nzss3hX%2BAjRORELjpq3sKNrSWLv%2Fyw%2FSta2vbvds2Izo9MeqSGOo8RZnd82ud7xTm2sidlK%2BCQT%2BvzezXaTmmHttPkgTqhcGpRSafxbqjYmIOK4pStTotyGiJEdBNX2w22bS8epjdeu9epktx9kvRMId03N0dqGL4qpR0EUhhLEJFKJR0s0MYkvvK4Hf1Zldj8NXfbQxT8gMOW9oc4GOqUBNtOzk6yQxIkZnSL8kmanTvd4sDlmE3QtGq1xrufgXhtgEAVtfDAJ9AFBRIivQv3KaYX5xV1Ali3ChFo9dfGXWztXEICRGZ6f%2B2%2Fa5gVYoxXDBX8wgaNA9%2FFqoWXQVSVidpAlVraD0CFCJ2sBsBmmjSZNySsfMeTYgebBU%2Fe6fd1Y1%2F5tPtm7bv%2BzahzbaHE50SEeAeeSLnD1AYEgr1A7gImuMWvm&X-Amz-Signature=c20647cbd7204895563266dbab07f2fa81b6b995efb51eb41a9d5c41223d5fa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXQ6EGQP%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIH6yWu0aQLQL8gm94T5g90SlbliPy5soDpAPMrRygvNBAiEAwhZbaaG%2BjuflX7WbiJm6gcuGoVCGDg%2FSkfyWxUBpGv4q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDE4IPhF1Zb%2FqAsLArSrcA6t6itK9BcoNpv70C7XZqpt1WIr4yfZgydZ6JgzPVaIw%2Fnj6BMTB5U%2BXmaAznHkTpbsHtUK%2BGvSo8lwSkCVxM56LjdemO3DvN7cYgK66xAPbz5Qm5OypfxN6xzdUQRf08UyqDdM3KwrjHzeNIEtnRNeeiiHIfKGn68aa4Hs0fXN6pZuiDznD%2B4jgwRoJu6HTQV89zwMMT0%2B5oxBHSAJ1wkV%2FGuLc7%2FY72F5wvW7%2FN1FdKwf2Iqc5Z4SeeqvXos14WN36btpT2czma%2BR14ppY2FbxhroA%2Fo5pDA%2FT936VTZawlYdKG0rZOZ9Nr9VfhBaPZggqhiUGQe5Y7HditwWMTMECs0%2B%2FP08HB8rbXJmmyHiAujJcGxVjIdP0jwnQZaMUc%2FEFRvr9tP%2B4OszPSEqKsEpZwAIU%2BRyBuqULEydR5%2FPqzRZB1nzss3hX%2BAjRORELjpq3sKNrSWLv%2Fyw%2FSta2vbvds2Izo9MeqSGOo8RZnd82ud7xTm2sidlK%2BCQT%2BvzezXaTmmHttPkgTqhcGpRSafxbqjYmIOK4pStTotyGiJEdBNX2w22bS8epjdeu9epktx9kvRMId03N0dqGL4qpR0EUhhLEJFKJR0s0MYkvvK4Hf1Zldj8NXfbQxT8gMOW9oc4GOqUBNtOzk6yQxIkZnSL8kmanTvd4sDlmE3QtGq1xrufgXhtgEAVtfDAJ9AFBRIivQv3KaYX5xV1Ali3ChFo9dfGXWztXEICRGZ6f%2B2%2Fa5gVYoxXDBX8wgaNA9%2FFqoWXQVSVidpAlVraD0CFCJ2sBsBmmjSZNySsfMeTYgebBU%2Fe6fd1Y1%2F5tPtm7bv%2BzahzbaHE50SEeAeeSLnD1AYEgr1A7gImuMWvm&X-Amz-Signature=c20647cbd7204895563266dbab07f2fa81b6b995efb51eb41a9d5c41223d5fa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IJ563FC%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQDNkZmpwy91lUx2HS%2BAbffkc5yfNOpQBjaQM%2BvZs405aQIhAMGW1OePl7MlJh0NdefFdI9fMK6tg0Os4xoNtHBp1RCaKv8DCAAQABoMNjM3NDIzMTgzODA1IgwEBGwKApV%2BGiDvgLwq3AOTffmSBvXVE2%2FmCJR87prXKwiX7walnwHojYUNAN4alSXIqFoqOcvteMsUrkzWdeR8SirJnYK3QKqU87w%2FgrQ0OBIO13f3xkzObrVjSNC%2FibzpUb%2B%2Bbh7jf8wDyZONnvaL2PO818mJllO%2FapSq4oRX0HsWsTq67jOx5ZJbKeLz0JABDryVVFnh5Z7rKgOHATJtLRX7ZPHuQGGb1OctniLEtf7alVhvZhC0a2hLq0bhnJxUFFrlR9JZW5gy9daQzopIFkQiOIcT4VgX5S75DQs%2FUddlj0ysuKwngh2MzbE77LS6VjNOls1sxu2RmiZgYXkSlSFNIKM%2FNGTSpXpl1Iy3mC7DsG2Ge9ZXAfuYFpjuuiG6t2hiY77Dc%2F1O%2B4KOCK65mnFzbWGL%2BK4hoq0qVHRPfM5DHTSV0rnLN6fX8dDf%2Bquz7io6849MGeISoBHqNEan0YeWvm5KuDQwm3YfikhbEFxzdG6g35HnOGNujfNT4bbfI1IREDYy6%2BDto6HydsgDDZuFy9Ssat9uz%2F0q1sEBy2roNPgMUmsoYjCZFwmSC%2BZ3KBsqR9kYoD%2FTzDDztS5quqNwvCs%2BoLnH1nyUqWQqSF%2B0OP1q6B8p8ArUl%2Fy8%2BgkznB4oNH4q53gq4TD%2BvaHOBjqkAfJV35RiB9kkO9wFMP6TwskIy04W4QLbf0vkBb3KoHeuTrNfG0onhgy8u%2FOQYOxWfuZoEn0r6k9Gk%2FMAAacZyzNX%2Fr0Y%2FSqlfYnOvEkNRecIt%2FjKv6QhB5Zqra6V0ows5UjJt8F8L5VaXQ7tfEc8owTwKq4shoqhGzb4D3t7o2LsfyY57TQIBofPsiQxk%2BfuJ%2BplFDc73YH2FUoioc2077VHCmQ5&X-Amz-Signature=6473b4ea83c36e97490e1b24697ddc767272e2a0360e43ec8837297f85c9a503&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YPNFW2L%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQDmh7Nr9WkE4bXmk4d6lg0j3voJ3GYQFMJHkRXwe%2B456QIgA9RP3wbYcxrmFlt0IndWbIvVpx5bv4o0oqz9UDP53ZEq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDEFS418NFTYu7qrXsyrcA8BBNT0TMEHeJMWtbOW%2BRuX0sOeWPldSzASyNKuI1jiNLi8GgIIzjgvg8QiRxPip1EjMLjjPirZmwv3MQn7Y0CcFFu9ekglGxcGus7qBgPTzov%2BXY53IEMMXhbc53YZND%2FpVicQ9t1f5hTUXPLRnkYGV7vNSYjzdLsGDCR4fVW2FmNFc9yT2mVp8OY40svTiRqSDCeMnmrF9wmN%2FMwI%2B%2FXvFq83D4yfW8gYd5lqZUDDUJlVe56RbfBoyOUe0Rlz5n9cxBnDqPy8Oxfpj7HIuyUL7Gh%2FwJOyEORkzwrWsCRSFleinNNKWxA4mfjwKw1CzK9UBeWSG6ccahTv7jALQ0pjGqvVxuMVEqO9rQbP2A5KAejALTUENUBky5DrUHGI57pk62l8kXBkIxVk1eHG%2FD8WqkcnpnNeSyQZdFjYtKhI7oKejYowbgO2rOZ2IxXdIz1e5ztP%2B%2BcPTwGkVbwVkxKR%2BWdBC7K4dto%2BerbTd5q2dKb%2FuNFFEl3kVFmsNcWKqvsQbKfVNBj66GPEj0wUEmAaUP1Mj%2FvtzH3v8sGzRjlwsIoF60Wp0GXuHdfXEGbhYMP%2BVlNYn2RG%2FkBHlhJDJke72CylTOgh21Fj1ElosFqbyPhE9K2xDqSBkzclvMIe%2Boc4GOqUBrXLOle%2BpYkCiq1JhxSbtxLGoAzXESYt58GwWRExZQWRa4LAKwRUoaaj4B0QciYPsJINnrrsQ5Ygyv3ewwt9xqGTV3HmfxlZ5YmK5JsjYKmPEa9qhRkvGkMW%2BCsvW0ztdxkLI2K7ej40x5gA13tNt5SskDYei6gOdsYLDTBKMfCnmjaieCWDtJrsqPAbqSbmnoHz3jyOutvhD4jVKqE%2FgeCk4UFeW&X-Amz-Signature=d2dccf2efb55cbc4846d53f10527b41ab1eb79436cffd6f42e6a3d6e1eb00cbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YPNFW2L%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQDmh7Nr9WkE4bXmk4d6lg0j3voJ3GYQFMJHkRXwe%2B456QIgA9RP3wbYcxrmFlt0IndWbIvVpx5bv4o0oqz9UDP53ZEq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDEFS418NFTYu7qrXsyrcA8BBNT0TMEHeJMWtbOW%2BRuX0sOeWPldSzASyNKuI1jiNLi8GgIIzjgvg8QiRxPip1EjMLjjPirZmwv3MQn7Y0CcFFu9ekglGxcGus7qBgPTzov%2BXY53IEMMXhbc53YZND%2FpVicQ9t1f5hTUXPLRnkYGV7vNSYjzdLsGDCR4fVW2FmNFc9yT2mVp8OY40svTiRqSDCeMnmrF9wmN%2FMwI%2B%2FXvFq83D4yfW8gYd5lqZUDDUJlVe56RbfBoyOUe0Rlz5n9cxBnDqPy8Oxfpj7HIuyUL7Gh%2FwJOyEORkzwrWsCRSFleinNNKWxA4mfjwKw1CzK9UBeWSG6ccahTv7jALQ0pjGqvVxuMVEqO9rQbP2A5KAejALTUENUBky5DrUHGI57pk62l8kXBkIxVk1eHG%2FD8WqkcnpnNeSyQZdFjYtKhI7oKejYowbgO2rOZ2IxXdIz1e5ztP%2B%2BcPTwGkVbwVkxKR%2BWdBC7K4dto%2BerbTd5q2dKb%2FuNFFEl3kVFmsNcWKqvsQbKfVNBj66GPEj0wUEmAaUP1Mj%2FvtzH3v8sGzRjlwsIoF60Wp0GXuHdfXEGbhYMP%2BVlNYn2RG%2FkBHlhJDJke72CylTOgh21Fj1ElosFqbyPhE9K2xDqSBkzclvMIe%2Boc4GOqUBrXLOle%2BpYkCiq1JhxSbtxLGoAzXESYt58GwWRExZQWRa4LAKwRUoaaj4B0QciYPsJINnrrsQ5Ygyv3ewwt9xqGTV3HmfxlZ5YmK5JsjYKmPEa9qhRkvGkMW%2BCsvW0ztdxkLI2K7ej40x5gA13tNt5SskDYei6gOdsYLDTBKMfCnmjaieCWDtJrsqPAbqSbmnoHz3jyOutvhD4jVKqE%2FgeCk4UFeW&X-Amz-Signature=42930ef0f29650f123549b85058c2c95791fdccfaedc1db500325af8b3097eea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E6LVUKV%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQDO7ft1pErY9Op6McBXuY1nY2yTRm%2BG0m2vftIwac82SQIgQj8r4YDm8syY0wCNL8E3%2BQ2N4Ux21GpOu%2BHZL5dla5sq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDKZCe0WxIuNRgb08zSrcA%2BmnQWPUdFM7HEOBQd4MIAYk8JAyE17NLB50ZquegiCbFt667YVCegOnFLMCihJlsvjxdCIKFN2BOvWy4nK0jQodN0PWlmnB3%2BysK7Uy1zja5pHryPQ922ThoKNQX2rCUdHwqaE4sk2IqYnHP%2FRIeb00MKwBC2Byc7Uw0am1fjCQOY16oP%2FUILPTXOWLqiU5a2wujKy6Ji1ANJxr65b9RYb58LGZ3nU%2BJayj84Ej3gw6x%2FTqxHosFlE6u1woT%2B8EDcbvWLp%2BUj8jL2C63P8Y5fXMHby9O6KsJHRTAC5W4kfAkjZ9l9S0MogFdvMxTbHZAq%2F%2B9lUOaIzapN6cvGiBaYqPEZdipk46CfdE6LCCpXBaM6j0R%2BMtfGHsIRmSNenILBqBx5xu606NnpQT40cnZpvysEzsz44il58SjpCAUo3tKIpsMZvaU14LfHIq0Ijdvn6Neugruyi2nv6O99UqX2nOK8Qur1BJTeR8C1JON9BBCmF%2BoFNEcPWB5PzkYDdigqLxMJQk4MQIgQ5VdR06EDTtxv0BpNdDppEaQSM4VKUNzs6t1L07ceR7nZUbFsOsP16lRCzLMDo61F80Ka%2B%2BJmz29XY6q4hY9Pmc%2B5Emqp6if9ZorgyEwYn0ysXkMOa9oc4GOqUBePl0CNXvN1k0zkgQhMEiLbwdxvYqVJ9joAyk%2Fvc9V2TC%2BlD5yUwcv8zVj2pHzMnPZ3dCbo1DpKSlN2YGmxjWqsUUfuhXn6fhI%2Bffm8OVXd1LTK%2BgNjGLKDxhwTIAKkbtgUDh%2BfDKjndgh72EWnQ%2Fwykx%2F3J6kSei9hoIjYX548n8ajhx9Dmb31V37BU%2BPCu0GH9vY59p2qEvKnVR38Vv7%2FW%2FUU3a&X-Amz-Signature=923d5e01410876600fac837a30a53390657b9ab003808f687f17a592327c2658&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7EKY65B%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQD7tYkYXyfFycB1Viu%2FEpB%2FlFgvXdhB2AyamxdXtyrzmwIhAM0%2FRrBoz6i8ZDQdDgNKNhGcb2zUNYaJQJD9UWGXYJUnKv8DCAAQABoMNjM3NDIzMTgzODA1IgzuxeNcs8yOUcxWUo4q3ANH8gbWO5YPgHkLZQ%2FkNHY8jWhjJq0AW7qjA3ajt%2FwlRfYSPtIMp9s7A2ztYekPqNbVdNsrKSzrTmadwJ%2B0qqTqUK2ouxt%2F6yZ9QZ5UGF0qSMieb2iO3HcMUCm2AEKdxdaU3eWYBeGEyupL9o7M%2BtgwGARSZd7i%2Btg252CeNXXaaZJ1sA9oQGmYfibqN4%2Bo0o3xjYP1w061jrUF3keM7tfaHEQrZ8NuWAp%2Br%2BJBz7mSl5fQvu0g%2B9LIbjhDDZgVCi7bkRMBv5NEOjbGS8vIBsIrIn%2BLY%2BlxhBk8iKCmHDRHwvtjKLrvmlvTI4auE1i3MHdEgkTf92csobn%2FZUyMC2ClfYPei4JkZjwDE4gldAsDac88%2FdhNCm82RQakXaty1l0fiaXLllzRo8wpR9K6s5nblYTJT1FMSrk8JrxL%2BwjZl%2Bkuab840DR46kgsOLcPuddD%2Fl9EEHuI09TE%2BuHN1K4qGg5Tz4I%2B87LJ4qcZ7ieBRufsggWlC4saIaN4BqPybXbjkMcC5b%2FFZL3Mlk03L8V6yppAyrKvQ89H0tGK5bLhgoFlDbmIx%2BcF%2FFW4Vsx5WPtYtZaf4PGTQE00rXCDRum0E3BcnFrSf1Dm5e364cMy0UGb%2BB8EACAH0fsfrDD3vaHOBjqkAcPSeLqx3fyLsNlc0nY1cbhwD8HSRBsdQLBDFrQqEqutJp6XYfTjORncL8XcuU1Z0Q70HxFaZRLvi%2FWO3NvWez00XLLTM5HTviLxul8d5vbaUiHMHabGgzp6Ifq9ekvr%2BFEvAWaDqGf7d6EbUtOHi4JwViyKNFu0YUdl%2BTLZRFQTkmMfX9ZRFL9vQonJQrA2pn0FTdRp0A8Lfw%2BhbCO%2B4HvUHJlz&X-Amz-Signature=4d9ccc9c5b1d7557966c14546ccc16f89eecdedb9bf0849cdf5ffe84953c93b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466733BL4MK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQCdUer%2Fpw5UTlGxT1i9s61iAQF56drIsOSH%2FRExv93fYgIhAMHhAFPDIV8pN5TLEwDj2NKXvq2RCYIVLPJwWuIZrUysKv8DCAAQABoMNjM3NDIzMTgzODA1IgwX5F1Ae5rKAS%2Bx9Xcq3ANMbHGUSibKVlVradIPCavYIEhZq6m%2FYY%2FxVeNHiN5ccMap50Mo9sve7%2BkmlzTC%2FZYow3zGIQ4jSDrPuUpnbpLNunHbJCpN4AGFR6IX8bZX2xjuHH0zDhsTdp55lo%2FKtT1bj0bgOQdn5UTP9%2BvGUNJYRG%2FUmuzcPH5Oub7gZ2ucsxAzUe53mC6VDHLRqDxWwtZFmeyLBkM1c1wXY%2B4x2M73zJsOsI3zl6mxE%2BsOFwIhxABHkiewBXkgdcrpJh95HXy1ZwMe55X4vDuGDyIpwsdw9SxVbDpMwwAC2lSdp3wjoEZgrLldxaSxIQrEjrPG1lxPGUfBC3tdn8LNj27FUQqbSUnliHbRE0b0jLDzjdEOhcGVkHzbgt02evee2nAHyx%2BuWrcqsd2wI%2FTryeDw8nh2%2Bq2FrMqzU2Lj5EfpAgt7Y9pmrRYGiWAjI6ZE1K8odpgwmzXdXnrgTC%2Fx%2FJrRFb58H7QGNYv1DTZl6rjMr2UMkdpCU3o8uUsakqWD2b6qNjwLq4ep59N4HONVhXRwyp6qb7rbL5Q1W%2FLi4LMWEHEFZwwvC%2F9NslgKe2IX6u9dbT5VNc%2BlXN0qkstHyxFvIcfqkvEfIDCPD3NYSSWYqHoZgiqLIdmq7BsBeWAoDzCGvqHOBjqkAQbh1rizUu8BwqmEM2ffoFvA7xmQg41pX8uHuq44pzKwtKrTjqVd%2FXcKb5i9f2yJXn5aec9jrc6GmkeMDQSfOtHCasNYKykXcgPM3uAFqcNrHUsVA7fCijy%2Bjx21p0jrSzmbRwsTxfETJkZAofJJsBwTRX4HkDq%2BwvWofTe%2BYYH7ulwxo7z2cIIPGJ1a55zUiFlS46mqu1qEOZjmHhcBzoP7GPZA&X-Amz-Signature=b356eb94d8ce19399eeabf4702211a32bb044b5304dc4710f3535314cb03abf0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIWB2DJ3%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCqVeFhhu4XmmSm5BoOyPaJTBTb8DUVeCdcsxb7%2B03PEwIgEmX%2B%2FIafr3VEsXgyL7lAR8k%2FMBEu%2BdgaK6BuAo6mf8Yq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDKXDuhuUrVsVefgUPSrcA0E0WK0HrfpFkujuLlbi5uJr21%2F6fyJdAFtuG8xLHY%2Bf1IKIIBbUcWQuUI71csuvcRMS7bTKilqm4lVkMOtqjm1FlQKWcF7E6Qu2NHOaFU7C%2F%2FU%2FBEHppCbVIHr%2F0hvtrD%2B8VdjWP5eQHd0dLYWHOlxZW9Kxeo6FQ5gS%2F5Z2CEGm3yKM9iXFv6WSsmpcBtudI1ypCfWJ%2FKd6kGsjzU4N4iF5KP06wAI9Ojj9Oz4jZ%2BdMek0uWTowXchpWIE0wE7QlSt03C3eAJPyWmxp0hJPRLb%2FBv9QSpbkPZKg8URw6U7fYgrGAZHDnfM%2FepNJ1L3cOiV42r4hhYe29F2aHcL59pBsjQfuo1qMTY4t%2BwLuYbvHataCmuSt%2BYcSpOxl4cttZusdrLyZeSzBn8PmOZ3ga8JNyeeqp6c8N16uw8fW4lG%2B2EDH0vDnza62SeQUVlezafDPudptt3PgukGzqDUBXis1Jvbbs7uyDTT%2BRArQPSgD98TZ7axq%2FL7G%2BsazxIZg1tPwlOr%2FZlZpbfiYTM9uXC%2B%2FpG0%2Bv8BIRmBvLeoqawzvl1AHXCHzrYTaqNI3tRkclS%2BLX7yJ7q%2B422oMwtQzYj7bI3I8bC15L0GH%2BKKYXuZjl8vBFBItorWmNyjEMIq%2Foc4GOqUBfa7hgZtx7Tjgd4fCBxNc%2FgxvO1e2bk0XRZ4oRFwaEEZ8J0REp3NaKYH5Mc%2FncIE6wGOeUzEdOE8DMPYqfMzie%2B2qvvAouj5b3%2BfitipP%2B7SYM8r7WJrZBXIY4ZCt1VsQCfASxtJhfYGwtAKf3yMi%2BSZUnIfWLcKw14SP5SQR4Q6lKt9y%2B6mkkpNc94hpo%2BNbAXGURtQCiyeVgOkZg1NEBdUmGKBN&X-Amz-Signature=a4f4e4f9f5607c8d670dfefb4e49cd33e734b25994066cdf245cb8087b225854&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIWB2DJ3%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCqVeFhhu4XmmSm5BoOyPaJTBTb8DUVeCdcsxb7%2B03PEwIgEmX%2B%2FIafr3VEsXgyL7lAR8k%2FMBEu%2BdgaK6BuAo6mf8Yq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDKXDuhuUrVsVefgUPSrcA0E0WK0HrfpFkujuLlbi5uJr21%2F6fyJdAFtuG8xLHY%2Bf1IKIIBbUcWQuUI71csuvcRMS7bTKilqm4lVkMOtqjm1FlQKWcF7E6Qu2NHOaFU7C%2F%2FU%2FBEHppCbVIHr%2F0hvtrD%2B8VdjWP5eQHd0dLYWHOlxZW9Kxeo6FQ5gS%2F5Z2CEGm3yKM9iXFv6WSsmpcBtudI1ypCfWJ%2FKd6kGsjzU4N4iF5KP06wAI9Ojj9Oz4jZ%2BdMek0uWTowXchpWIE0wE7QlSt03C3eAJPyWmxp0hJPRLb%2FBv9QSpbkPZKg8URw6U7fYgrGAZHDnfM%2FepNJ1L3cOiV42r4hhYe29F2aHcL59pBsjQfuo1qMTY4t%2BwLuYbvHataCmuSt%2BYcSpOxl4cttZusdrLyZeSzBn8PmOZ3ga8JNyeeqp6c8N16uw8fW4lG%2B2EDH0vDnza62SeQUVlezafDPudptt3PgukGzqDUBXis1Jvbbs7uyDTT%2BRArQPSgD98TZ7axq%2FL7G%2BsazxIZg1tPwlOr%2FZlZpbfiYTM9uXC%2B%2FpG0%2Bv8BIRmBvLeoqawzvl1AHXCHzrYTaqNI3tRkclS%2BLX7yJ7q%2B422oMwtQzYj7bI3I8bC15L0GH%2BKKYXuZjl8vBFBItorWmNyjEMIq%2Foc4GOqUBfa7hgZtx7Tjgd4fCBxNc%2FgxvO1e2bk0XRZ4oRFwaEEZ8J0REp3NaKYH5Mc%2FncIE6wGOeUzEdOE8DMPYqfMzie%2B2qvvAouj5b3%2BfitipP%2B7SYM8r7WJrZBXIY4ZCt1VsQCfASxtJhfYGwtAKf3yMi%2BSZUnIfWLcKw14SP5SQR4Q6lKt9y%2B6mkkpNc94hpo%2BNbAXGURtQCiyeVgOkZg1NEBdUmGKBN&X-Amz-Signature=2c6b156e284e44a6d02a4d4806b818e1643209961e8e3dec547aaedc349e21ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LNWGXN3%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQC0v0w020Dzo9DztBSx%2ByUV0ZwmGuJjllkR3KQIUUy2SwIhALQvj%2FWAA3h0tOxYAgJv7AeuodM1SYp4kEmnZZ1Wk5bMKv8DCAAQABoMNjM3NDIzMTgzODA1Igy%2BPfPVUwmR0NxlvAYq3AN3lrR8wRfA5uOnoDQHnflJtll4EUGyfqgxOp4DhICzIERNzWm%2FFRNcH4Jt4ccu1BRx0gs7qKHVCzFn0ji4TCWFoiwrR6ENSi%2BBpjq2%2F%2F%2F1eP2hYbTcRvbbhNvms55c3isUyBuMAGAXQogRRe2%2Fgq9yMD9jmRdLY0Y1K%2B%2BurmRbvQb%2FXS%2FG0kaUULnuM6%2B09AQ0haSVmEn6O76CigeELK7r8UMIQotRxmtJwiEH6puTotXdSQQuyLECF%2FKDG94JGkRoplus6NaQQUlTaqChCNFa0Fh1f8ZtMee9K1%2FQtiDS3%2BHjfSYCh8PS%2BTDRAvyuj5Ib0%2BeIBtrdw21lXjdLo3y2g2t8raXwR8qbMfI1sry2HPSW%2BdowO0sP98J1lEuyxNf1k%2FK6n485LuPhISA8P6cKt8DCOCrt%2FFaj9P0gf69%2B%2FYuXfasujvmFm1dgVF7liQczJJyci7xvKEfuD44RK4meW6gxvvOi6Q1QGABWMXc%2BS57rVhYU%2B4dfcmhh4A9piZvmYdNIPlA%2BFEWU8DQwY48EuRz3DEyx8Ve4cBffPXDQuMIEAJSVozXFrcnZdwWzJlp1wRfqNQShr7l7squuw%2BcXY7oBosHRekxsiFGXAToHwMhIVGfCGWyX7SFIEzCGvqHOBjqkAQGynrgw3MhrsfoQlvEtWwf5YBs8IQbBKQmc16588tjfTg67lJlAC8LFsnMLrdN39yA4SluIhqeDYIOOJfJVXz1djHFRNFmzBqh6oxMJYTGzwrJVmR%2FhyFdlOJlAT2JR15rOv0%2BVwOnFJ%2F%2BmdTA%2BiLIt5TTOnjqUtTJh1C8vCdmAwuHtlL9HzSSyvsB5ws3cQKoYQLFw8W1%2Fai42yz1sqwwUeGhE&X-Amz-Signature=a18cbe028fbd9bd39890d47ed787e34ab793af46f79b364d5fc40778c45cb655&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675W5KVOY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIBhClZYmCG%2BP%2FPDzme1EMe4757jPBTdNd%2BLFcNDUeWE5AiEAxdIQyiYfNj2VhXTAShqSE5R7JVSWzYvpP6KCt4K9hUwq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDGHhcfvwZubjZjuOJCrcA4Mg90ecjxFMLSA3LhxhGcVA0ATMNUUQde20oEcCqRkC2gz9%2BYtkzXI3DvmCkLQaSaZKb9ccoWbIc5%2BDe%2FUpd2wIN5G1r8fW9LuRwUUuuHJbgwIctL1JHVT%2BRO1VBudRPiuEWaz%2F14XhUh7OAJWc8T9fjADYYRCQBUfyqHi3B03lGjTQKRwYLleoptMLzWBRZaDVusmpA5cg34VRlpTC%2Bq2D5NJZA5ZcFIC2spjz8EtGnXIwgvzcys22clBkrKro47XOEQmD9zVzg%2ByBVyCNLY68HZQytXui6K4JTBj000RnxIKUfXCC1%2BrzzcsbA66RspSIgbaZPbKJHs6VfWZuXdRaHc7KiSzqIcFJJfr2R0ZVGM4%2BCTJRro%2Fbf2AnM92yIy8J879ZbJoeydqdBJEaKYQ%2B%2BKJCz%2B0vB7x%2BQDxOZiKuKjSBIu4RJyPENqqvDKVSCpLJvmxdW8Iql7hqAfhmE0G1qqEyk1dzGhnno9lJJnr8A9mUt45eV%2BNN0SFZ%2FyD53IgwKqC4vciPFBsKD8Dc9vCr8fnE4hfmsrm6sfVKk05xwxUmiU95waWTVSJ3upMLVbxWn6bj7A8cduYj3RE8fQ8Cyjbl38pVw7Nkr3ljWvhzaATgtaiWOAmkYEIXMIm%2Foc4GOqUBmDVOhVd0vgU9bMOr1W0GI5oKjNHei9hU1Jv5nBWdZqAjPSaVG%2B4owyQppw%2F4lTMnGbQaVNx9yx5Fpn6kBWxPCOqH8BtZv9s7gTDFF%2FjjP5qqSqQjJ2oliVaE5Lnwvt6%2FhL6ik75264o5SCLIV8cFnHEnUYfIdKhd0I%2Fj%2FdqcNWiaG6MLDRbj7hzkBNR6e8%2FRj7F593R3MzUyEgdojbbChV3BJofc&X-Amz-Signature=4a67170b9d50d693e650427ec0940376213c8312b1a8d7349c8c41c5dc0848e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675W5KVOY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIBhClZYmCG%2BP%2FPDzme1EMe4757jPBTdNd%2BLFcNDUeWE5AiEAxdIQyiYfNj2VhXTAShqSE5R7JVSWzYvpP6KCt4K9hUwq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDGHhcfvwZubjZjuOJCrcA4Mg90ecjxFMLSA3LhxhGcVA0ATMNUUQde20oEcCqRkC2gz9%2BYtkzXI3DvmCkLQaSaZKb9ccoWbIc5%2BDe%2FUpd2wIN5G1r8fW9LuRwUUuuHJbgwIctL1JHVT%2BRO1VBudRPiuEWaz%2F14XhUh7OAJWc8T9fjADYYRCQBUfyqHi3B03lGjTQKRwYLleoptMLzWBRZaDVusmpA5cg34VRlpTC%2Bq2D5NJZA5ZcFIC2spjz8EtGnXIwgvzcys22clBkrKro47XOEQmD9zVzg%2ByBVyCNLY68HZQytXui6K4JTBj000RnxIKUfXCC1%2BrzzcsbA66RspSIgbaZPbKJHs6VfWZuXdRaHc7KiSzqIcFJJfr2R0ZVGM4%2BCTJRro%2Fbf2AnM92yIy8J879ZbJoeydqdBJEaKYQ%2B%2BKJCz%2B0vB7x%2BQDxOZiKuKjSBIu4RJyPENqqvDKVSCpLJvmxdW8Iql7hqAfhmE0G1qqEyk1dzGhnno9lJJnr8A9mUt45eV%2BNN0SFZ%2FyD53IgwKqC4vciPFBsKD8Dc9vCr8fnE4hfmsrm6sfVKk05xwxUmiU95waWTVSJ3upMLVbxWn6bj7A8cduYj3RE8fQ8Cyjbl38pVw7Nkr3ljWvhzaATgtaiWOAmkYEIXMIm%2Foc4GOqUBmDVOhVd0vgU9bMOr1W0GI5oKjNHei9hU1Jv5nBWdZqAjPSaVG%2B4owyQppw%2F4lTMnGbQaVNx9yx5Fpn6kBWxPCOqH8BtZv9s7gTDFF%2FjjP5qqSqQjJ2oliVaE5Lnwvt6%2FhL6ik75264o5SCLIV8cFnHEnUYfIdKhd0I%2Fj%2FdqcNWiaG6MLDRbj7hzkBNR6e8%2FRj7F593R3MzUyEgdojbbChV3BJofc&X-Amz-Signature=4a67170b9d50d693e650427ec0940376213c8312b1a8d7349c8c41c5dc0848e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KDD7NHJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T010650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQCTD7i57U80n8Yd3ascX6yYlm8FjtRnVxd45uLBy81nXwIhAJQ4Ib2CdjUe7kHIvjrbVv4lX9Atx1SUwCHNIqstm%2Fa5Kv8DCAAQABoMNjM3NDIzMTgzODA1IgyDzMTRjAmoQZRgRIUq3AMiYmKF43JddCsbWLGNO78DHAHnzQ99qGGnxsbZHksjWM2%2F7f4TV1YMkC9TCYF4TMW0H%2FzDxOmRSjfSkKPTv7mTKz0wS27e7uhMyGYEuoT6q7G35oiCxW4C14YvOHeINBlGcOkBTO32PnEsL5cBetxOugikiYylRafclxKRZYdELthBSz1%2Bmv%2FgkCknNFcADLSib8hd1PqQaLStEgJO4%2FrRbyrYx1h9rEVovn%2BCSADBNRmf7pJeAq3lOqkWNITNc8qT4ktLXk1U%2FiIPNEFjGrNoRsr2dAAQIXEeKQX7yg35c9W5u%2BqfVFN4d44e%2FNvXz2zwlQVvbZ3zno6Si8hJileOF%2FnJovGlrHl3r%2Ft%2B6uQ3WMikEb1nkGhd1zaxKJRd24uzO6Lzt1QmlFU98dQSs%2BdqgT1HmE%2BgDEHgDZ1da5lFxgYdphN9xpCncvtyQCYg5By5UYEpNtAGkhu2yIbVcL6wb9EW2xU9aiJoC9XB%2BMh6Np%2F33HnENH%2BiDnhwbn2OFQEdep1qdGjrhxrxXYsNCvm%2F4ZkRNoye4WW9u47s3PH%2BqaFGUnN2mQSaGxYtTK6CtFuncVxLicUrJOirxi6VRWaD38rCjSwOYbaQQKQCfhtKGBfHjDp4tBsnHpA0xDClvqHOBjqkAaxPtNu0wUf%2F9PBbG9gv017pIdSjCeFRE7Dxoeh%2BVWTVZcNRHQ3IdMGA%2F0Uy9%2BuacbEaUqLSmFr6M1JBdavbh9QhjF5KG6VQanbKtJ%2FHQ9%2B8mPF7j95rGFCYayvuO7rYevOLvnVu66DL7E3adNBknvrBvtkm8yaA05HO0ABw4Vcqu6oxMNDZP7HyS8B3gASdYrDp4GWENzf91GdlGfk3IZjmJfWh&X-Amz-Signature=457ccb4eca7aaa02c5501c024f934769916a79fc24f76e925493dd9b6eec30d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

