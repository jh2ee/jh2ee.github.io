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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635S7AQMH%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCGIEBNGvQdrKcvjgE0FxMYXr2Bo7lhsyMj9fU8Ok3%2BBQIgDZ10YUNnPUlhOUHrYqHs9X2OaSNSvi%2BdIJ1cF6%2Fn810qiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHRpnMxq7u%2FLtxY2oSrcA7Z6vetbnhPijxP5hFfXTYhuOw8LEXdTxFbqwPYEbY4BfRNStf528mlnR4za3gJIyWv%2FaL9RKX5lHObi6psipU9msHfe4fIhFSziaR2Ti3wr0hSFdxVJHKo3Ki3rVJ3us7c%2FOhChykkuuARzAs65HxEXReMmey%2FXjrMpyASHhCcE2983%2BCepNFMjJfioZlkWjLcftI1IQMKXJCtWcCbzIXKmRv8aVuouiR7Iodv%2BGveqinXefc3SEKGYgcUkZG7ZMJ%2Fl9QJvamKO0e69LUyOksJmPDCbGNtmRYYr%2Bo8lAL%2BmsldUK63jwrp9M3iZheDeFNYPgbP8kmZgbxKLtts%2FReDJeRQgWuchPQx5sju5SExPV4DQ8pUFwuom7TZzFCud3EsUQJA6nfbsLba7NiOXecRFPQh1JNGfzkqCWYB4gLkGCo%2FpdX0OTlua84zJY0%2BWMO07l4ZBarZKLtSFGxbjWqhJfpZkVRTGKqlrmBnOm%2B5P3%2FFlSG91ZFX3F02Efzx0SoumKLtx4eplLxmQY4bv9mH2ftG6W5DJYxI4iPWUqeEdhU6pY%2FQsyTSdtnJ8kRR9Puq3HIKS1BRZ3W7S9xF77V9kLIDqVmRxCaZNnhFrhgvQ7f7McGNtvXZd5uG4MI%2BJlM4GOqUBBHk5FFZ7QFyU7ix4Ac6%2BPLFW8NKZHcJLAzcbzD5%2BcJFrQOV7Ac9oDh%2BCwNabJ7uwxwV7q%2F4x5GCBgj7rU9QOR%2BDfO4VAeyqAv4kTbV63jVq93lEFzTR4j%2FjDmgRlHcND%2BYQFdLxtKrVeqK9bAFGW6ONcOJnsQt%2FfV%2FB%2BbXdyis7hDlYgNCVoykVX0DFHrK7QftYbst%2BaZ9049hgxzdyLLRN%2BYLm2&X-Amz-Signature=3207d12f19acda7e954779bf61c7be158109c9d38abd26bcb655aa584d2c5e39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635S7AQMH%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCGIEBNGvQdrKcvjgE0FxMYXr2Bo7lhsyMj9fU8Ok3%2BBQIgDZ10YUNnPUlhOUHrYqHs9X2OaSNSvi%2BdIJ1cF6%2Fn810qiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHRpnMxq7u%2FLtxY2oSrcA7Z6vetbnhPijxP5hFfXTYhuOw8LEXdTxFbqwPYEbY4BfRNStf528mlnR4za3gJIyWv%2FaL9RKX5lHObi6psipU9msHfe4fIhFSziaR2Ti3wr0hSFdxVJHKo3Ki3rVJ3us7c%2FOhChykkuuARzAs65HxEXReMmey%2FXjrMpyASHhCcE2983%2BCepNFMjJfioZlkWjLcftI1IQMKXJCtWcCbzIXKmRv8aVuouiR7Iodv%2BGveqinXefc3SEKGYgcUkZG7ZMJ%2Fl9QJvamKO0e69LUyOksJmPDCbGNtmRYYr%2Bo8lAL%2BmsldUK63jwrp9M3iZheDeFNYPgbP8kmZgbxKLtts%2FReDJeRQgWuchPQx5sju5SExPV4DQ8pUFwuom7TZzFCud3EsUQJA6nfbsLba7NiOXecRFPQh1JNGfzkqCWYB4gLkGCo%2FpdX0OTlua84zJY0%2BWMO07l4ZBarZKLtSFGxbjWqhJfpZkVRTGKqlrmBnOm%2B5P3%2FFlSG91ZFX3F02Efzx0SoumKLtx4eplLxmQY4bv9mH2ftG6W5DJYxI4iPWUqeEdhU6pY%2FQsyTSdtnJ8kRR9Puq3HIKS1BRZ3W7S9xF77V9kLIDqVmRxCaZNnhFrhgvQ7f7McGNtvXZd5uG4MI%2BJlM4GOqUBBHk5FFZ7QFyU7ix4Ac6%2BPLFW8NKZHcJLAzcbzD5%2BcJFrQOV7Ac9oDh%2BCwNabJ7uwxwV7q%2F4x5GCBgj7rU9QOR%2BDfO4VAeyqAv4kTbV63jVq93lEFzTR4j%2FjDmgRlHcND%2BYQFdLxtKrVeqK9bAFGW6ONcOJnsQt%2FfV%2FB%2BbXdyis7hDlYgNCVoykVX0DFHrK7QftYbst%2BaZ9049hgxzdyLLRN%2BYLm2&X-Amz-Signature=3207d12f19acda7e954779bf61c7be158109c9d38abd26bcb655aa584d2c5e39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MDETWYO%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDFLbncnzeZYwGAvPdkVPJJXbR933N5hpp2%2FwOnYvmlNAIhAMy2MurxU0ZLa1tb%2FVBho0P1OB41CMap6ifYwWBvMC2LKogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyK%2F%2FG0MNvWBjyba6Qq3APDX1QY9j6nWr4VbTEqkufuLQq0fKhZksOkfRi3N%2FzTrz8H%2Bs9rELR20ItBqkLyUzIBHCWuCsleBfxaEwxZR9%2BgyJzaBzVTzY8u4k0oYU7TBy%2FRfVYzffiKCBo97lOg%2FrX3MGTtsSdftaaUoow%2BbyMpCae%2BNI5fdw94U4FEY8vKTOYepmoDGjELkaZl0xggFDE0aGrjs93fSTWuAoe1TcbTsptd9e37ASg3R7jOz6CSpfrzbJsaZjcK2%2Fem2U5ykjc8xhUvNJRHdLwKqPATu2L5S7f1IodJMIWFmvms9c09rGyaV3Z%2FzP26NhnnMGONutq4g4QFPp%2FqhHchCmBcWXj0AvAsKBZ0sad5qHpssseJ%2FgOS4sU5oxqAVUb3YXEApp2NjqtE%2BGx7iNBnrFv9kst0C6JZUkmRrGTULb2JSBpSrghudsKsCUcxBnJ%2FyIGNL%2BrO1%2BYH6%2FbF3CEb97ZKUm4tUxZvMScXaqAVGePYnknKrEAi5PJxmnEhj7%2FaG%2FJGPCvSFQ4BQh%2Fz8qEJHms8YQxXnkY4spOki7Ay8AcjpZkpH2VFv1ZZ6AjjtZmpLTE8VhOm8ybY8CnsDvd9Z%2BGP%2FdSBCRfJxU0ls8rUh2HsJrS4RAJ9OyZcEa3dBXlkpDCtipTOBjqkAStJxpEstaBX%2Brmn3uHxfCW9efu3t6rg3iIMoWI6tznNqxlgKD2%2BxCA85Ap0AddL5Cmej0WKjffzAIFvy9o7owrGThZGyhkEA2ILdFFScsyF78SkpbPoqStdqSrmhh5ydOf1Uw1LUpgO08JRCkm9bencCM3M16es2DAsh8ZEwelErLXwKRQh61Hpgl3640aQsP1kITFaheZW32jsjMPJIrstBlip&X-Amz-Signature=494f8a26ad12305d591ff307c73933788f2b368bb8724e06678ef528b524f856&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBDG7HLE%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGAPAXt47GD00H6biJQBrXTH9lwyi0J%2FbdmcX1pa75bVAiAxHFiI6RQsJw0FG58r4QLISnuquB2X1vUTSD7rM5htMSqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMiyEx1fQSQTIoTF%2BqKtwDzBIUKLhlFnuYeiemA1uq0zFArbK0uLCq6Y6XoJ6baNGiydB0yuYYKpBnBj83xoO%2FuOBO0WA1a2voCzSBPpaSOMU%2F8Ttx34sbiDEUz5ExfAwOfItKV4WngXuA4PSapgdtwcGy9qDJVEXpXxLDcSwqHtX4MXeDVLZ%2FRgb0qJtKUKwP%2Fdb2kbGCCO04pYLi0%2FRSXVe2QONB5hruhRy5qwimdUNSY4tf5nh7DlispTdUTPHwiOXDbjSzrLegxMzdQUIMftPH1bBu%2BJSL7AXcH27Ju6Q35yXK6zuJUHzJHG4e99PLNDgzI9IXGxhaFsDrApV7v5OI0GkJQ%2B4KFuMuhqjfx8wZ909WDn9cL3SPS9xlS%2BSBV24fh2sGrjJKCwRW2o%2FK1JBW0eFjuYOvEQMCGVbEKVtqUnDxq8O3Y0iJ32anA8XwA7zrE4iiNeTgMj6grRfg6xzxHPsWKSnpK%2Flkki3CYJVBEpYx79P1p3YcESOwl0ifuHtwuzqlOhk%2BO2BPJG3385YUWNftvC6Oq3f0pCACunCT1HPfUwY0gXfWFMaRnu77DATN735PmAQbbZRzO%2BNvA1IB982eyeMsmmwQq%2B6I5mIjYS%2F%2BOJ%2Bh3YWOpdWtas0VTwkaFJTxrQPzfTQwk4iUzgY6pgE%2BfLeeAn35ko%2Fki1Opd8iDhtT%2BuNPQcKiO%2BZ5fG8dW33NjgqmJOltq84oDMZwRUJJIxcVeMnwfg9HepQDcc8FNaohxq2azAjvqQ4JhpDhKFp7IzipPWQknOLdA3xEsp9sXTTIRM70xpUT7oCxYsVU5Vbrl7nqsJn%2BAJ1z7PDA9xxDH%2BrVSwC1irs10o8FgvEg%2Bug%2BaOcmxmCSsdSyBUjaVwKbD4uL4&X-Amz-Signature=f131889c9b3b62e4223cb5eaf7e8a518c4b813610ed087523792b5de0308bcad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBDG7HLE%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGAPAXt47GD00H6biJQBrXTH9lwyi0J%2FbdmcX1pa75bVAiAxHFiI6RQsJw0FG58r4QLISnuquB2X1vUTSD7rM5htMSqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMiyEx1fQSQTIoTF%2BqKtwDzBIUKLhlFnuYeiemA1uq0zFArbK0uLCq6Y6XoJ6baNGiydB0yuYYKpBnBj83xoO%2FuOBO0WA1a2voCzSBPpaSOMU%2F8Ttx34sbiDEUz5ExfAwOfItKV4WngXuA4PSapgdtwcGy9qDJVEXpXxLDcSwqHtX4MXeDVLZ%2FRgb0qJtKUKwP%2Fdb2kbGCCO04pYLi0%2FRSXVe2QONB5hruhRy5qwimdUNSY4tf5nh7DlispTdUTPHwiOXDbjSzrLegxMzdQUIMftPH1bBu%2BJSL7AXcH27Ju6Q35yXK6zuJUHzJHG4e99PLNDgzI9IXGxhaFsDrApV7v5OI0GkJQ%2B4KFuMuhqjfx8wZ909WDn9cL3SPS9xlS%2BSBV24fh2sGrjJKCwRW2o%2FK1JBW0eFjuYOvEQMCGVbEKVtqUnDxq8O3Y0iJ32anA8XwA7zrE4iiNeTgMj6grRfg6xzxHPsWKSnpK%2Flkki3CYJVBEpYx79P1p3YcESOwl0ifuHtwuzqlOhk%2BO2BPJG3385YUWNftvC6Oq3f0pCACunCT1HPfUwY0gXfWFMaRnu77DATN735PmAQbbZRzO%2BNvA1IB982eyeMsmmwQq%2B6I5mIjYS%2F%2BOJ%2Bh3YWOpdWtas0VTwkaFJTxrQPzfTQwk4iUzgY6pgE%2BfLeeAn35ko%2Fki1Opd8iDhtT%2BuNPQcKiO%2BZ5fG8dW33NjgqmJOltq84oDMZwRUJJIxcVeMnwfg9HepQDcc8FNaohxq2azAjvqQ4JhpDhKFp7IzipPWQknOLdA3xEsp9sXTTIRM70xpUT7oCxYsVU5Vbrl7nqsJn%2BAJ1z7PDA9xxDH%2BrVSwC1irs10o8FgvEg%2Bug%2BaOcmxmCSsdSyBUjaVwKbD4uL4&X-Amz-Signature=a3f55454d79ec48cef156e47adb59ba6e0f61a512a3d53ca54f1f80bad573fae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBHYBHAG%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCtx%2FGqhtMIzVRMBbI5H8U8%2B24Y%2BnMrrtPbZodLi5QC4gIgbL39CcHkD9mItqxO5M6VYsf5kVXQqagMCt8DOnZjKfsqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIYPqzyUTuiQS%2FuZhircAzdw%2FT3QuSAXOLLONjLacgJU6Zx%2BV%2FQ8aTtSPHyiGpRG2j%2BSeVRFZXkq%2BtDgqNNwJRajqnt6KrbfnLhVpZEVQUGmVxwFCuvgcXhhfYzEqbhuInPYAbq3tDluO75xpAFRlm8duXN39upnNlVANiQ8YxuKWsXpw181DMNIZKoeO4fEvnCVceSTOQ3ti78y%2BWOvp8HY4kh%2BOnsCPYqQ94FhMRibjpweuxl1m%2FGQpKdjJWZIxQ2J%2BnZqt3X50r%2FpG0kXnN1fwXmxJgDSdL2UE%2FP0h2978z0Fbj89WhTnC%2BwOF2ozAkKrQtIABlKRVbYetXrtcu%2Fy3DpakdJwcMI1078KVhvoxRh7ONNTk2yBkTD5HKuaGc2tqNqibCNs3J%2FvFYWmEnokVoXtWKzqfPm%2F2uYnvXbqtJ%2FB7dWypnBcWC1o4XHAVaplK2aAG8vA9OgIYwbeyJ%2FICfmLIlsZd375IjQKIE6sMtDQs65PQ2GdBNMyblj3wB9xCFQQxtmPOW%2BAbTUNuv0Q8HJR%2BxlV1T4qok%2B84kx5vxlEuQHI5YFQyVu9XJePIrfZjale71UcVuJPwSx6jOjpyZhqIxiwMYEWKex3a3dEQUIuOwxiA2zcQQTDNt4EnkwkbrZaMd0goB2MMKiKlM4GOqUB9ycg1qEnFYrPQkDJ9Y1bKrkFlpJQmhf%2B9yTIhmsSKPYeiQZfHFgJnkYl4IUkM7qnMzH59bKwSFcltp03HZKtwvt9C2PTi7qkRggJpv6%2FN2HY45AwphTYWnQ0YxPqMpF%2FBFLQWbOlDYaFb%2BIw9VRFDmgmYnoQhKuXONZaTm%2FmMumMBVqH6H8%2B17RVxt%2BFe2HoG2ywrQUO7O8TfhoaGCQuQE%2BcE41X&X-Amz-Signature=75b3a4e5a0e8790aa58d6c47214f9b2685a4d177b57e31b4750a1ecf6e334f60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YW7EDAR6%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICVquhhtND3yMpIUYo3ALy0sv%2B5LGFuj8ZkII0Wc%2FOmJAiAN9vqC0fSCBy%2BSeeaJuR1IuhW40L3NRKaTgyalWZ3wFCqIBAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYLjljecgZubnAqjRKtwDBgYK3O182911QKzLa3TFcQiI4enBFrygHdwwtTkdqnU7D2sB%2BApPA2i5BZ9TtShvxkzHjsg4%2FSzVJuI7al281koAvxOWuvUx8J8WvE%2BQcGwQ%2BjkVFIniVhgVUl180yvlQ0yV8xQL9OQj7yXxutRux3xVkCfxLCaRmHYcjaCGNqCHBHpGEP2%2B%2BoLjFy83mCnWNymhGsnAEw62dM5Qw8CqzKPbirq4XyOH6j2K42sujgQgfTliDq73ykFNlZeyig1VZEalV3QwHIGPfQu%2Bhg0jpW5erYAWgLKo91EIhAVkXSdNRoKdwniyi18tkmg3srOSfhQaBKW9QxHiXJrl9YW9VJP46rZfAhkRtlOlNyrs9LVJPNpWzOcd%2BoaUYpCZ8qLKjXUiSLAdAduhwnSSd6a0klSYTkJKr2%2BuAjlH59JYGckPcYqp%2Fb4ek%2FmqrjzIG215%2FNUiWN3KOKAcavLAN6c1lGkFmy3WH6OvhnA1Bg9%2FdUeUA07fYqfb7KTS4AMIFWdB1Ayzlsetlo2SNFvSAiaEoWawdNq35DVWeYAYPDt%2B%2B9L%2F%2FokxRcrOr23rlDiUHiW8hA6EsIUAlpBEHL%2FzFAZ8UwGulgJvGACTN45Mkay4tzY7Odl9IiqHR0Uam%2Fgwm4iUzgY6pgENZUogdnho9yETqVxenEJAlldyfFLu3xP7%2BppCPIPJZZwC0RccnquvwgBQ%2FXHX5N5qMxB89Vtuq6%2Bs9nA5tDb%2Fui9EyVRJrljvtcNMuLlhj%2BbUV0x042JEK6mPQeZtXxH5f6%2Fhr7Nd8vfvQbkL0NdGLZItS7odJjAYBwtFjHSm3ZwBVl9nRuyeXHZFtRAdgHEobIjKkp5mh%2BBnEoLCR7yZwd2ltMVC&X-Amz-Signature=1185e4a4d7f1650e5e4eb33c692b5a83ac153a2f1a919a1ff2b52386e4d8f1f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IX3L6ON%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0FXeDmJ6izvUIc8y4owQTKJEeLFsU4ZF1wx2MxLPjKAIhANMbJrchVblFCmvvch1EMp2hfrKwJxn7xN%2FrAfudXkfwKogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzwI7HmctYu7V2eWmwq3AMkgqfB6XXAiLbN5TwIf5HSH8DslSWOZxt94BiesnNqevuXmzT5wWZdLj277Td4oVX0sNzj7RupMiTarguv2Cc7d01i8VyQqXWsd2%2BOXjKHZNN3E5dGeaI9jdlsMNflTIdP6gAuy%2B1AWzS%2B%2FwY6PZmXooQupNA63%2BGfRFGnv8%2BIPflUV%2BHcUzCh6TpM62MZNDuzBzP8K89Upv0v9HC3r%2FBXTNIeQ%2BnyQ9KkonA7ls8aPh8d9Qt78xCbD9QCr8weEfln4EiedE6asIQOlRa62vKLZIqi3Xgo4ri6N4%2FvJZ5HMFZgQMtQJA4AtJ5EU%2Fkj%2BWktPE12yi5A17nj1REzwM3b6FQb0%2BqeuubUfgLS4O6ifAG6BTrNkJj4TwqRELDdEmZboCpXWZhFTmGjlo5FIRD%2Fau%2FRDKIeKApJRbiF%2BEQKdCqI8T2OAzUSvzX%2FmqHpu0a%2F6yzsorIAWK9xkmVgf%2Fl7BMWUZPBpIUDbKyWbTzYlluN%2FOHOcwEy7ZjQ5s5%2Bj3cKp0D9bKi3LZ09AJfG9mOjUXP7opljU4Zvzg3fFNPyo13TCcD1Pp3RlCRGk9um9Bm69ot1BL9mHkywAXhNwaydNOqw6JBcFXqd0UNc5Xr1Bg%2BJjaUs7n%2FrlAKeouTCLiZTOBjqkAWhWhRkB%2B953XP9LwR67cZEGAUj8eLUiXlQekRyP%2BYSxkG8WsQK9d6OXsNlP0ggBWi38MztrKPCQk80XWoapajmgEt6yDtecaaRFuQqnbDxjzajLMbltR%2FH23U5R%2B32Ek46LXgP%2B5xlEYmIpWRFEy5MJWKP3vN883GsHUQbqPSo6NKq0QmLj%2FdLZ8Kdd7eN1oBFz4BT9GFLGVg0%2BDNKmKSgFr6K4&X-Amz-Signature=482f409a36c4b8385525917e3d374611e9ac70b50169e9725897eac34625196c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635DMSL3H%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2F5CgWkHh9QMGTT8GQtu9DcfZIgkalrV7q3uTXzNymkQIgeEcxNyjVxunZFEuqKAC2XCcLfhCP9fhdCbbHKrhW3hQqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFKKPE8DUpG%2BIxvcNSrcA1eLZAzpX7N6r37142aPlk1gscYZoQpV2P2K7uk1iN4FAM%2Fh2iQtIrdtmk9%2BcwfgrRVSmxCV%2F0hMv3RryZLVJLE6LDJ7eFJtmEfyBKWHKifQV7F9cjQ7%2FjGPKt4iz97IfDP5ApqECKBcl%2BChUkOKeas1CO64XjqdVphoF0TFfCIfAYUo7MkrcKA2PWjDezcBoJ9VVYtNTNWyxXEkkPkyr60IyAsO4CJ3QBL0viSLzqcEgOddyKLiAofrRVDfrVvjjGDn%2BMckEB4XLtXMbdScl9t9hFCZUpvNjXE3IjeCsKhV72nUXX%2BMfqcA94WgYlSmiSM4PiBjajY6LUdzRoyzx0iq15v7suAbRM1n8iI0GiUzA6d1sNY29GMASMv49XEJeSoh%2FB%2FwxYZ%2FamprFzpA0u4Q7nY7qZVDZ38Sp8T0zBbqgMGwesAT9RTD%2FNGSHCdmg%2FewvPzPJeEGL6oMNbCwVd88fDI51Ue5rSF8nCqd%2F%2B41Avu4AYhM2UG7vOl%2FDZTgxTBP5lKbmb6MM0pXmdg1ZS7PmiLtY%2BK7jDWbPTxzclhy8IsCydeK3yBrdJBOmiJ%2BsyE25EfUrSrpgSIodrAxJqiZkI%2FI3emjrWZOvazaZOPbUWZx%2FKz8b99Droo7MOqJlM4GOqUBcp5qHqzTuo6CniwYcUKwmqFxiQL%2BJdVVNs6TRnl4DawA%2FsjUBIEc0dvpsipfPGM%2BN5GY9S2RLqqM2E2o1iegTG9L54qZRLBxvy79stbqs3oVcI0%2BUZObi46RKKKlIFXNFZoiOCBmwuwYy%2FAYfprpbO0YG1Fbe4Wfe8T%2FJATzaIqEJemdvJVz5E2nHRJ2q1gPJ0BtAAmwBWbf9J%2B2fpf9NLGV9lX5&X-Amz-Signature=96f0378e8a1075b508ec679a182c64ad7bf7ebcb671f54f014051e9ddb580ecd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635DMSL3H%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2F5CgWkHh9QMGTT8GQtu9DcfZIgkalrV7q3uTXzNymkQIgeEcxNyjVxunZFEuqKAC2XCcLfhCP9fhdCbbHKrhW3hQqiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFKKPE8DUpG%2BIxvcNSrcA1eLZAzpX7N6r37142aPlk1gscYZoQpV2P2K7uk1iN4FAM%2Fh2iQtIrdtmk9%2BcwfgrRVSmxCV%2F0hMv3RryZLVJLE6LDJ7eFJtmEfyBKWHKifQV7F9cjQ7%2FjGPKt4iz97IfDP5ApqECKBcl%2BChUkOKeas1CO64XjqdVphoF0TFfCIfAYUo7MkrcKA2PWjDezcBoJ9VVYtNTNWyxXEkkPkyr60IyAsO4CJ3QBL0viSLzqcEgOddyKLiAofrRVDfrVvjjGDn%2BMckEB4XLtXMbdScl9t9hFCZUpvNjXE3IjeCsKhV72nUXX%2BMfqcA94WgYlSmiSM4PiBjajY6LUdzRoyzx0iq15v7suAbRM1n8iI0GiUzA6d1sNY29GMASMv49XEJeSoh%2FB%2FwxYZ%2FamprFzpA0u4Q7nY7qZVDZ38Sp8T0zBbqgMGwesAT9RTD%2FNGSHCdmg%2FewvPzPJeEGL6oMNbCwVd88fDI51Ue5rSF8nCqd%2F%2B41Avu4AYhM2UG7vOl%2FDZTgxTBP5lKbmb6MM0pXmdg1ZS7PmiLtY%2BK7jDWbPTxzclhy8IsCydeK3yBrdJBOmiJ%2BsyE25EfUrSrpgSIodrAxJqiZkI%2FI3emjrWZOvazaZOPbUWZx%2FKz8b99Droo7MOqJlM4GOqUBcp5qHqzTuo6CniwYcUKwmqFxiQL%2BJdVVNs6TRnl4DawA%2FsjUBIEc0dvpsipfPGM%2BN5GY9S2RLqqM2E2o1iegTG9L54qZRLBxvy79stbqs3oVcI0%2BUZObi46RKKKlIFXNFZoiOCBmwuwYy%2FAYfprpbO0YG1Fbe4Wfe8T%2FJATzaIqEJemdvJVz5E2nHRJ2q1gPJ0BtAAmwBWbf9J%2B2fpf9NLGV9lX5&X-Amz-Signature=3611a1c9c4b9e231ce94ea3bf623dc895490ff5e51d1c9834f5ec252c814d640&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QR3ITFC2%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD2d2LxJWAKZGvJYMJHRrVCPkRrvnJJEzWBKQP4qWn0SgIhAIRt0zcpdl9W89vcTfWpS4%2Fy%2Fz1DoVzS%2BmjRULNj%2B9%2FXKogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyca2To2HfIwENXehEq3ANqYasd%2B2AXO1ZY8ToCA6M9AZzH8pfb3JE9lh9U1dFhqzaaZfkoXNfPSOm4iSh%2BhALUbeiicAynFKNJNxBIdN1ErSwt2YNVENJVCDKjR5LZlbjr8Placy8uhfOQ7i1jK%2FwtwXITTKLWsxf%2ByrAlY8eGPYMChTJPI19Wt1SwnKg9QAmPjIYuDhLJmS0Nn8i504IcjBSFCJ4B3lkW3A%2BnPiPkiqbXFhXSi7RrhyFvxUpCBuaJEBYKm16va%2FQL3bQciaUbo4DPurWx1EYT%2B5KU1ehefjF65KM%2FXhWQV5QKacFYlASqKZsaM3080ffH2FhOixvztVVKkYizMh4xHYmhsU7GZ%2FUuP7HfYT7Sx%2FZUCfzYzY2%2BzOq3Usoh4XL%2BosJfg%2FIaCgB%2F6248wFhloDsOmTzrdYm9OMnRJJfTnWc%2FF1gBObziJBFbiraCuwIDU6pEa4ravP7B85sv2Eh2vRF2rc5ucUP1Ay4BjNaoEGTxlzvJnbMZRYuh1qbv4tAvvDsqhhz%2Bpa%2FKWapPr4OxVaEbkEKFxvxmGVBWAgYuD94h%2FUBFjEPuokW0LH1pZ2jExzqEAm9QIx7gpMO0A2WaNJ1e9WnDhSjCXLS3qsdqcr8GCaIuQDF6UbDrHes9obKuTTD3h5TOBjqkAYPEZ7ocRy8gB6V3Vr0xe6uyVtsMxPiNGS8pxVe4qFqngPPoiR9Z2dbkigvWVCGAhcjmADxUNHL22TudhsPJZEJ9WHuPfg8o8WVRA7Oze3uOX1Uw%2F93vlxII9GBY7I9XBZq8w%2BXA2KASOoyv74TwrU3%2Bous5Jfjpi7hdgWnhJXgEohDN4aKgVf4hXvGs1C1iScwcSLVYg5%2BQXrRzalzb7M0mLSSj&X-Amz-Signature=60d1000b147729e246d4ba077df3aacbf4c165d769f5cbe8ac9e438904fdc715&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665S4DGYOX%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2FQzvM17qB2bDONTTBvQKXD6%2B%2F%2BZ34c98pn9cvTzvyAAIhANqVsj3wJnHhlnW7pOuRsypnHSRBCi882G9pmFm9r2p7KogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz73edcK7hThwUjWA8q3ANwIUajT08yCMiKQijwbcNxd%2Fu7c6WqQHQW22Qx15FtRHxA1O0IOgdmlrwKps1eLXeoixrCNaJeFGP62YX96q5KXy21KKCUG%2BmkRExKyz72Oltte3iffUq9fAqyTHnzgmWNEZ2Oj%2Fxj2Hg44z%2FakunG3Z28Q%2BKCE8Hf34O6elwuiXT2Gq7kR6aLdXcnN%2FNlbDGV2l8%2BkBnp2camCPQQEqgcX0nFLoOl6%2BgKNAbljvJuL9o5duiYwNedJClcnHG%2BCuXjHvf6r4BBXhYKs5ZEev%2BCyllGW9lXYXbFN%2BZYaWgXxZMuyQ4VPkc%2B8nnxZIdamlXA9yn03By6QpNYJX63mt0j2eouxdpBx%2BtXXDJUTqzm7fMxg5PgxOW79D32DxW2UT71G9wQRcsNSjxSeAGovos%2FVDyl3wG2l4cqylH0Z9T%2FKXmKLDqsJQaR0nrQxi7k5rzu2n%2FvGPz7N%2BDbzF7ElHEaM%2FlQPR8c%2FKfcNHyJLhzwri6AMg7YtYCd%2F0UmQ4Fxdb9KJBiJlAXOhBP%2BOmKbtot9VG1pf%2BZmTfnpsp40OCOPf%2FK6lqZPeyj3jbXsmgbIZxYIgu2a%2B%2FZICrJT2XunX8Yy%2FasNxlNaCw49mOSwFrt%2BY1k%2Fi%2B7q%2BwjuiT%2BbgTDHiZTOBjqkAc9u3K99DaIxkRSMC6YjvutsB2W5h1cTEZ3V2Hc3KM0AvhOgTprxZHp%2FQ9gxgyuuhAwx%2FW7YfFPQZwk0K61Td7UJMNiWwlUYT18RvLAAbiEcQS%2BpynOhayMy9%2BuAgeQKvKHnYi%2BzJ24sYUXSiXgcwfdNjXJBBAQCAClF25p0j4WipM%2F4TLLHSWL9wduOAT4v1IQlLkEN7AwSFWvboqWjglMTzlVp&X-Amz-Signature=60ab9cc549bfcec3aaf09e8c396bc87380b77c0c2f39974c55767e37ee448b6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665S4DGYOX%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2FQzvM17qB2bDONTTBvQKXD6%2B%2F%2BZ34c98pn9cvTzvyAAIhANqVsj3wJnHhlnW7pOuRsypnHSRBCi882G9pmFm9r2p7KogECMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz73edcK7hThwUjWA8q3ANwIUajT08yCMiKQijwbcNxd%2Fu7c6WqQHQW22Qx15FtRHxA1O0IOgdmlrwKps1eLXeoixrCNaJeFGP62YX96q5KXy21KKCUG%2BmkRExKyz72Oltte3iffUq9fAqyTHnzgmWNEZ2Oj%2Fxj2Hg44z%2FakunG3Z28Q%2BKCE8Hf34O6elwuiXT2Gq7kR6aLdXcnN%2FNlbDGV2l8%2BkBnp2camCPQQEqgcX0nFLoOl6%2BgKNAbljvJuL9o5duiYwNedJClcnHG%2BCuXjHvf6r4BBXhYKs5ZEev%2BCyllGW9lXYXbFN%2BZYaWgXxZMuyQ4VPkc%2B8nnxZIdamlXA9yn03By6QpNYJX63mt0j2eouxdpBx%2BtXXDJUTqzm7fMxg5PgxOW79D32DxW2UT71G9wQRcsNSjxSeAGovos%2FVDyl3wG2l4cqylH0Z9T%2FKXmKLDqsJQaR0nrQxi7k5rzu2n%2FvGPz7N%2BDbzF7ElHEaM%2FlQPR8c%2FKfcNHyJLhzwri6AMg7YtYCd%2F0UmQ4Fxdb9KJBiJlAXOhBP%2BOmKbtot9VG1pf%2BZmTfnpsp40OCOPf%2FK6lqZPeyj3jbXsmgbIZxYIgu2a%2B%2FZICrJT2XunX8Yy%2FasNxlNaCw49mOSwFrt%2BY1k%2Fi%2B7q%2BwjuiT%2BbgTDHiZTOBjqkAc9u3K99DaIxkRSMC6YjvutsB2W5h1cTEZ3V2Hc3KM0AvhOgTprxZHp%2FQ9gxgyuuhAwx%2FW7YfFPQZwk0K61Td7UJMNiWwlUYT18RvLAAbiEcQS%2BpynOhayMy9%2BuAgeQKvKHnYi%2BzJ24sYUXSiXgcwfdNjXJBBAQCAClF25p0j4WipM%2F4TLLHSWL9wduOAT4v1IQlLkEN7AwSFWvboqWjglMTzlVp&X-Amz-Signature=60ab9cc549bfcec3aaf09e8c396bc87380b77c0c2f39974c55767e37ee448b6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZE6LRGN2%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T103926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCmXS%2FdOBE7tEm9fUZGMtyoIIy%2FNPQtBQhh50xPuUB6CAIgOwDilwoDnaPsNd7YPlBJUD%2Fd9BxILIAZDtmAySsMz58qiAQIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGzLISlplcR4CSJoaCrcA46YhpESX3GweMuqy5PQK%2B%2BK37TRJ9O2TzR7tvOuBwtsCp86O%2Bg6JR575bsUqgJfw1sjfmpvopgCGtEW%2BqI5bOq1ItvSyh31W3F21ZQRmdHWK0aWccuZsJJNxR5V3Of2QLaOweZy8d0ssxc%2F57J%2BCwEtM5qGg8fLBe5iy%2F38ZI6tvIjuapCKXd5iZMdLjnGRIklY4bdYADQt26TuMjHzc3%2FtDfvB2gJxnlw5iiSJnkDk9BxL1R70VtRtgDeFR7GHk1dNfJrOyW%2Fqw%2F1d7EEHIL1wQ9nADhtqnBjDg%2FAzU6LAy4CYsv1%2BYOZmbGy46VtHLA6NdhXWBPVNdq7CX4TrI7%2B1IqqNyB55awB9kXHxeZDq7X%2FI40xAJG2j3R8omUGJjA9sXVCUy5FxX8LzbPWtKN1Yb%2BnXkPc2FqWu6JM0L%2B7uoGz3LCWHjTL5enjJStfRbyVJeEPAAT828FBWvin%2Ftl156uxFUemGyY9BuUZV0ryldtwJ3VW0C3j3VTvDtvSbO0vCEwHfbe6kqx0TABot9K4cD0vHR%2FzsVdeTZ9sRcZjP5nwiTGEkvjNg89%2FvW5a7riDn6B3uaSL8UhzgiKg8I8225IFRSTnF9UqYLplavFb6pxD3TYM%2BLIO1gp8lMKiIlM4GOqUBsHC5EGRteRCdHmb8eQFXlsRB5j10jp7PkaSGNJbAIilaaj0Q%2BFfin8hfD%2FdhT9J64vfE%2FRoBDHWtyCucq7dqU5rJkhGtlWFYo5ERWke94vk%2BpFExEtWa%2FmH2Z80pQPHMv0QXNWt%2FYrRQGA6wO7%2BTIrz52t90SOPCUys9%2BVN%2F%2BsX%2BdDABhdOdwqNMaAic3rydBV2hdJPwzatLx3QqE9kVOmx2q138&X-Amz-Signature=f5bf6597540daed26a1ce01533359f3eee2271096ce8971146d74ad69095e30b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

