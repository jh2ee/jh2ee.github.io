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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YU63ZGEC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDHbfxWW3IyVTjavQntBEMmUs6jnhH9FWkaMpgyTn87aQIhAMoM6nKMd9SvR3Kxhjm4WT2eJ2u4Hw2%2BBL%2FLwC2lYOQaKv8DCDsQABoMNjM3NDIzMTgzODA1Igws2YZSp%2FxzGBIbS0Qq3APME0sth54XzSbB1NwYQ%2B25qis2PGr9H4FYSgt75f43ZbVqRClq5%2Fj29eHAEkcPzSBQ7DBm4zB0BbGl9grKr0Re0PSWb68eXFApNs9N%2Fq%2BOA6dOe%2FjVRUfxu3Sn1tvzOJ5UHGKEeefBP5BPQWy%2F%2FJcLi%2FlWVAt8xt%2F4%2BlYZUhH%2Fyqb7ENr6g18DgX01LuK1AGGK%2BdryRqT3vyFe0Xh3pccdxfm1EO7jyJzq%2FVzB44EH2LN17VBrLnO2pip0ay7zxYZzttTNL4Q42UDa9vUr2lhj52rdD8lgSSzCorHtmuTdO%2FHVul00lflkZ2VNrgwsuRS93YTuDURqhKV8Pc6Los3KbRvK8l8tT8O2Xhy%2BG8aAryR2NCaOVikwBenNFIso3BviIYTAXspkWIOuYhle318oG348kcylLSUdQ%2B5dNwRUrsTuMJs0WxG%2F8R4fyvaSuNTBo0mhffSBzXfiIlwCB40Dmn5qbzkpWajYxoq%2BscR6qStxKijgPJ7FlI8nerAL6YNSi4OnXYmf8IRAqtqBGWVkcIHa4cdzAtkFaxhkJ0fvs4Ub0MZzi6g3TJbI%2BNZQOcIp8EEBm%2BCWEciFkE3mycSWo5P%2FL9h7mgcR7EsHgEMqYQcMQKA5BS4iXpYKsDDlpa7OBjqkATYiBjjXd6rxqENQgkD3VGrvK2Y%2Fs1a1DCbDytpJK%2Baub3s9rYGsYJNf%2B5XutkNZ8qix%2FP4IkiN82I7a9udN%2FLGMqSGYe6FaGhK0IbteV1SgcZ8GIk%2BYLny%2Bzdabzj%2FOd4S8GEdcADokRy0YddI9HpsbwwN0jxJD4TMnlS0RAvxbG1p2oMfh%2BkSel5%2BM%2BWZZKgKAnYA2LXkceC8f%2Bm0ViW3o7vCK&X-Amz-Signature=0df11c75f7a052b390216960854712eff52d8b711fdae0daa69bcbcb1d8304c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YU63ZGEC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDHbfxWW3IyVTjavQntBEMmUs6jnhH9FWkaMpgyTn87aQIhAMoM6nKMd9SvR3Kxhjm4WT2eJ2u4Hw2%2BBL%2FLwC2lYOQaKv8DCDsQABoMNjM3NDIzMTgzODA1Igws2YZSp%2FxzGBIbS0Qq3APME0sth54XzSbB1NwYQ%2B25qis2PGr9H4FYSgt75f43ZbVqRClq5%2Fj29eHAEkcPzSBQ7DBm4zB0BbGl9grKr0Re0PSWb68eXFApNs9N%2Fq%2BOA6dOe%2FjVRUfxu3Sn1tvzOJ5UHGKEeefBP5BPQWy%2F%2FJcLi%2FlWVAt8xt%2F4%2BlYZUhH%2Fyqb7ENr6g18DgX01LuK1AGGK%2BdryRqT3vyFe0Xh3pccdxfm1EO7jyJzq%2FVzB44EH2LN17VBrLnO2pip0ay7zxYZzttTNL4Q42UDa9vUr2lhj52rdD8lgSSzCorHtmuTdO%2FHVul00lflkZ2VNrgwsuRS93YTuDURqhKV8Pc6Los3KbRvK8l8tT8O2Xhy%2BG8aAryR2NCaOVikwBenNFIso3BviIYTAXspkWIOuYhle318oG348kcylLSUdQ%2B5dNwRUrsTuMJs0WxG%2F8R4fyvaSuNTBo0mhffSBzXfiIlwCB40Dmn5qbzkpWajYxoq%2BscR6qStxKijgPJ7FlI8nerAL6YNSi4OnXYmf8IRAqtqBGWVkcIHa4cdzAtkFaxhkJ0fvs4Ub0MZzi6g3TJbI%2BNZQOcIp8EEBm%2BCWEciFkE3mycSWo5P%2FL9h7mgcR7EsHgEMqYQcMQKA5BS4iXpYKsDDlpa7OBjqkATYiBjjXd6rxqENQgkD3VGrvK2Y%2Fs1a1DCbDytpJK%2Baub3s9rYGsYJNf%2B5XutkNZ8qix%2FP4IkiN82I7a9udN%2FLGMqSGYe6FaGhK0IbteV1SgcZ8GIk%2BYLny%2Bzdabzj%2FOd4S8GEdcADokRy0YddI9HpsbwwN0jxJD4TMnlS0RAvxbG1p2oMfh%2BkSel5%2BM%2BWZZKgKAnYA2LXkceC8f%2Bm0ViW3o7vCK&X-Amz-Signature=0df11c75f7a052b390216960854712eff52d8b711fdae0daa69bcbcb1d8304c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJWOYJ6H%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIFjjv1uT0trxJSdIjBwRIkwwjG6lN5PXe1VH8JuoOSWqAiEAoA4jgmBxDw%2BEFtwXCfxZZGLXqDsw2zIqmWLNKBplNNIq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDFmGuauPLXiqgHj5QircA4uoo7vxcKZ6IIpA%2F2lpQ%2FryWcwVaeGdnqdXH6IiuxuNpkGEIlyxoIG0c9M3Em9%2FQ9wVI7FaHJ%2BOzgVlaJAYLerKC8vOQcYoKkc1IhkrS8%2BZEeEWmUkU9DEmpiiYZ9clRhM1gkg07LPneffGctW%2FQd9mDsKN%2BhY5%2BkEuP%2FNi7UVz4cA3PxU9HFLFgojA1bffaSngqFV8FFbMXJYM0Qt0%2BQsL35jiO6Pab57i6Uv5f9Mxzh%2FmSFgUobnZi5RINxI%2BLgTLxatLnljj1Oa5qmIsYYe0KhWzR%2BcqanOsEXkX6hBQGcin74tbYyqcrRhAs1NXjFGgThBKrcv8OqPS9Vemiu410Qp5c67dxNA3jXTxANbIVXE82jU%2F1F5Tx2aN%2FdkXpOBtkitBfrzYoe9FzjEGgWZM21F5IP5W4exMp2E0ag2DnKfoDoSwHqKgNXg540%2FmTkze2DKZF3avKljaemHrccglLYo7PXL9y8NDOLMqTglfUA5rIDoxCgO%2BSiX3I7m8X6DmkgfkLC%2Beta9%2FQyI3SgrPwQT%2BDZHaIRBiQJtS6kkF21oal3Nfah8wbh0767CAT6v%2FT44flGKyCysRBp0X65hm8NSWZv5jUOZNFTraXlHV0ehsK5vL2ZlbQR45MPSkrs4GOqUB7p%2FWnNbqzrZxjQOZOowkkBPHPk0VBMB%2BIyUaX4buUM02Ri4Bkq0eLlNxPW7NAG5puGr8WvyG%2Bl6%2BA9%2FLApwij7SuqM3nK08YN16%2BaAQed2aUrQcalc62rn0B%2FDmiMuMKn1cb76lHUMSUBv7wrCZ1uOFYq9hrbbsWPg0HSfkZ1ysjGqpV5eXv4VsXXOpK3EZVsyEF2daKjg1GE41uTxwoHRYJTE%2FV&X-Amz-Signature=9c43c866cc6f4cd9ce5d32e92b5589284c01f3529cc8331e70dba062ba9852a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQLVZOFS%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQC%2BYP4HXs%2BLm9ZRoFHFx9UGXT1zDv%2BbZOr2Bkh0oPtMFQIhAKtDqNG1urKUcZO60YcNTWcuL7AUZhqy0lKC86q10JpUKv8DCDoQABoMNjM3NDIzMTgzODA1IgwkP4fqt%2FxTs5cRZ4kq3APOzn0P5liorB5xDHNPZoLqPKboyjj2BoPiQbSy5jlUNBjLYutdMNoxGChp%2BUVMEBW2xt1Pphu%2BGb5AWMtH86VxDBv0aPOE2PT5OoXc2a0k0%2BZHSXCIIYmfgWJ4h%2Fg3%2BTkazHoQ1%2B%2BHixfLhkCw4%2BR1wCCM2kazPu88KKyXgvIajv0IMpLvbiX%2FutBUkntOP2JIn8BwalWnpmtMOv5VOEvYmT8xioBaVKKgVBaDprx7NCxanHdnzjomjS53j4YVw%2FRonx7n5pPkAapJhZsU38JNc5%2BpUhuYwt%2F1TdbhRgXluebSMk7MM0YXVGQC49K9Bx7l%2FNIeBC5QAeLeSxgmvHImnmJhquqFz22E9bSDaP6PXGITLDgxn85wXElBWwDYqqIyNLjR%2FVKbF6VaGfLozGbBiQX%2BOilHgShGKac%2BxMgiWiO3HE8UvLrHL183IHiJrvp5YdAQFyMefFMeury6AdJJ6qA3Tuuo%2B7EfNMuJpNYzsTkwEeOgKaiVPvp1eOfW9kW5NLKT4BaUGKu0ISMeo0g1NK6bliuX0%2BHmL0pxjwfDETp6%2B4gA6mhUU6fRUYgl6AOHkowa1he5OYyi2YKtt5mcRtkt6Fr0%2FsF8fIWRQGEmWPfABNOcDZtRooZ3EzCcpa7OBjqkAUY1Hhv8N9w6DZZI0hyGDx7pjAfXB%2BEQda5cZYSUwfKhZjx0xyGA8EOLlXxocowR7I%2F%2FxTw3smgwD69oa%2F1y4z%2BOi%2BUpdJn9mxG90uRwz4ZUfeKCfqRyshnkhhujJpwogSyMV%2FUn9NF%2BIXYVMc2%2BfE63IPCLAAfm5jpRaHi9cROrOimQ2wutp8%2B4TdIB7lnQim0shfMLlxELtCQVX2ZkolTwRNMG&X-Amz-Signature=d783b856360313782bc6b52bb2e55c0f3bf636ba85eb8d6b3231c1300e01ec5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQLVZOFS%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQC%2BYP4HXs%2BLm9ZRoFHFx9UGXT1zDv%2BbZOr2Bkh0oPtMFQIhAKtDqNG1urKUcZO60YcNTWcuL7AUZhqy0lKC86q10JpUKv8DCDoQABoMNjM3NDIzMTgzODA1IgwkP4fqt%2FxTs5cRZ4kq3APOzn0P5liorB5xDHNPZoLqPKboyjj2BoPiQbSy5jlUNBjLYutdMNoxGChp%2BUVMEBW2xt1Pphu%2BGb5AWMtH86VxDBv0aPOE2PT5OoXc2a0k0%2BZHSXCIIYmfgWJ4h%2Fg3%2BTkazHoQ1%2B%2BHixfLhkCw4%2BR1wCCM2kazPu88KKyXgvIajv0IMpLvbiX%2FutBUkntOP2JIn8BwalWnpmtMOv5VOEvYmT8xioBaVKKgVBaDprx7NCxanHdnzjomjS53j4YVw%2FRonx7n5pPkAapJhZsU38JNc5%2BpUhuYwt%2F1TdbhRgXluebSMk7MM0YXVGQC49K9Bx7l%2FNIeBC5QAeLeSxgmvHImnmJhquqFz22E9bSDaP6PXGITLDgxn85wXElBWwDYqqIyNLjR%2FVKbF6VaGfLozGbBiQX%2BOilHgShGKac%2BxMgiWiO3HE8UvLrHL183IHiJrvp5YdAQFyMefFMeury6AdJJ6qA3Tuuo%2B7EfNMuJpNYzsTkwEeOgKaiVPvp1eOfW9kW5NLKT4BaUGKu0ISMeo0g1NK6bliuX0%2BHmL0pxjwfDETp6%2B4gA6mhUU6fRUYgl6AOHkowa1he5OYyi2YKtt5mcRtkt6Fr0%2FsF8fIWRQGEmWPfABNOcDZtRooZ3EzCcpa7OBjqkAUY1Hhv8N9w6DZZI0hyGDx7pjAfXB%2BEQda5cZYSUwfKhZjx0xyGA8EOLlXxocowR7I%2F%2FxTw3smgwD69oa%2F1y4z%2BOi%2BUpdJn9mxG90uRwz4ZUfeKCfqRyshnkhhujJpwogSyMV%2FUn9NF%2BIXYVMc2%2BfE63IPCLAAfm5jpRaHi9cROrOimQ2wutp8%2B4TdIB7lnQim0shfMLlxELtCQVX2ZkolTwRNMG&X-Amz-Signature=8603e7cdb1cbf3d5de59dbe928e4571cf5fd3c1c34a628c233eebff6c8ac0d86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3XA3V4P%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIHePizhjmc7WFfApk71jS8VQbIoBWhW8px0j2NldivQzAiBiT9t9Y6FpdCODlV%2Fnc86m1iwslS5wIkkMZspknt5MLyr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMpyYrj1s0%2Fg2vXUKVKtwDXdnQ%2BcL7AcKM94L%2BHbqlNprf7gTGsX2INGnD%2Foz9KkFwBAoXp9Eb2XkVtS2mTu5HGDOqnmHjky1YFdzFyDccEueLHZGAoTQbq78yvkc0xg3z9JJ9Z52KCOcKcYtzFXorwsMTUUev8wnwul9jgcQbk6rlQrrKy2mMDRucBl4e2rOYLNkrtHfmSMootUt73oHT%2FvuMIdGjK1pT3VHG7%2FUwniL4ZQ4Hrmm0VdTXxEW2fGXOBilYkD%2BLs%2BY4AnShdyFlGOUwLsLpjCLEt9XxggiY%2BX20KhqifJCDIJowBR3Y4DRDfD90E1FrR93ph3hxfKV2%2FGVNwD80gKk5HIZ0wuSSCLKgX2kYdXGxEAfJpZ%2FNw3GGRnQo0TyKvUg34qQo3zh4iSSsvd3i2lcCWd9m4axhzZ%2B7bHtPbMrEbZ0iOwQzlg7iQExCuphXv8%2F0uH4W3eqK%2FHRg1aKfarjF1P8ms%2FG018yZrPr3gIEcgHqk1WcaNI%2BlVnD29AuYqXUQUNaclfSKLJIteBwn3lqnLRChUae2RqcbOf%2Ba9A1HLP7OMm3NpeefRwPc62B3yc0mjLX1lp2NH3NLx3bwfeU%2FoshQPFcQi9EOsw1xsdcGZjbe2MWX3JAsCnpnOKCueQcBrDUw0qWuzgY6pgG%2FF0%2BaLQb0vFffsRlNTq8zaOdVALK3kKfjKXLJpUunozLdAHT2V0ojZZzyPwMGMjldhAUrBzslmf173gF3NdopiKTOYUmB0izyb0GTbPRGdJPYPhNPe%2FUu4z2g4XMK3llaq2dxV1palLq7HCkQv4nK4XT2tXf%2B8ipPlvY3vjeiGXzdDEqmpj%2BpHUtqPnhpPx4r8HI44y4b%2Fsi%2FZlgh2WSzPKEbVVpB&X-Amz-Signature=e2967edf1d6bebca5e8b8edc5d07028b121c060775285ab666915e4b8cbd48f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHZC2ZTU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDQs%2BNKLtqL68K%2F4DfnNwxJ3ZysahGhWiAGUNqt1ayNRAIhAM8N0jeZpga%2Ffuti3Og7GWn5x2ekWOJSgIHoXO2Td0L2Kv8DCDoQABoMNjM3NDIzMTgzODA1IgyglT75lD6hQ45fAjQq3APWW%2BQlHs2j8qeEVRInhB2kiWV3vyJLuvDFveGjcesfrK2FeBYYe9IrncTmlT%2Bgh5Pr%2B%2FD%2FDKqxFlbVWcGeu2QBTbvw02cle6639or0oZe%2FTskpNBydVvxuEJxaF%2BsLan1%2B1A1kQAxfusk1gMDVrc7N6dIWbLUpC6J1cxxucYfOa%2B%2Fi838%2B3NXe9rS1WELgZa3sA5Jb0mGD3aH5jsDbh2w1z3B1paH1MGIvl5EzZtMIVe86EMqiIRreolYNmkjPomteJ765ftmwj%2BkpNAqKvt6iwS5HPTQIv%2Bz9YdMWpelB02OVtr3W5RCc1%2FdCpUnXYS%2F5BbZip0xOvj2M%2BhccS2XT61fAvlnpuc%2Fb49y4Kuo3MbZUqMiEsv7xb97h5I03mNst2jwAT7uTSIzjTaVXYkXekGP9D9VXpMoCSVMvsxZ%2Bq9yKeTIRgnuk8LTTp%2Fwy%2BCjzCAhGhjR9tL1wTem%2Fuy1EIza%2BM7wmR0Ea3nlTuJjSdYKAh0K7A2ASVBeQukin%2BY3CtB%2FGNX0COxwpZbXRG6424kmIezuzlzr5rOJjYsmqgQoofUCXvjoy3fGLI4YlMLE6xpy%2F5IdDzLMMxqBbM0ITIaxjzyWenOnzo0mpTkzATTRe6bqFMDiKvQk4aDDSpa7OBjqkATwbWc10rL1YC8ifFY%2BtaLa4haOF5fRygwmAfBlmr2I70sVf%2FDJORxHmyJoY%2FdU7nT%2B0UwzYbfkwT%2B6m4RVoL0RtPX%2BLq67ykng5a1FgJ8fI3SOWoSicG7OouK9pVe2qX4ieKuBLELVJpDkCoa%2BD%2F%2FndZzWs6McR8Uq9IjOxoZ6sLgaqU5T%2F9JkgNus3%2BPyNbMul4Fe%2BHA3JWZbVKH3inNqfm3Bm&X-Amz-Signature=84035af97b2ef87ad66aeda7ddf7706fc9c3c8c451eaea8a32192e35b902e574&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUMC566I%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIAZgWN7uGtdMd1VW%2FR%2BwcjrvHSPl59U41bng2Cz9f14RAiAy5L8j3qNvKKIx7H5vY8vdaeQTBV9ZlnlX9ye5%2BiGxLCr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMIqk8v%2B3Ln8FaCYlbKtwDQ0pElij0u6obEoLSBSO1Gcp%2Bo9wcGjPMeWU%2BlmfxgtTcbxBoQDnZ6gD55gjUrQ1IwZAqdBFybO43wytKQBRWrlnpMzog5bWpE32Md7fAF7dLLk%2BhJacGPcGwBoEODh2Q5ioQjAmkcnbh6P15%2BuV5AsUuWbCCn9VwpPePvvVy93GMyeWMb7fWiOYT4YtZ9EZbiHjwhiCDHaVjKp7nSB2lHEj%2B6W9FNfaLkzaYqIDLVeRfl69DQZ%2F8lf2rKXWaz5E%2F3GLU2x18elYKoHzYgeup3s800E%2FjJF%2FTw1UmrbgkN4B3oxTNykHqg3%2FyN9sTl4kii3vmc%2BFrjf4klQEIdDm3OKVG2G8XxFlZe3bNK7BNo0GWY9GdzFgJBfWyJrtg08UP9Y7Ki97nPhmKFm6BRqEWvwpySyAGX6hFeMdjVscUBt1XbCyT5DJSDQuBQSf%2BhiYC6FJqDMHjKXWESSaZHR9NS%2FBx9D7HAILaEjdjxEsKb7zgO%2BV3C03exrDqm4BiScMTAoXqWyGxXpNVWoKklQPJGTjkxsKsROmt3oj63o4qIhcQKqRMrQp%2FLwazoBxC4Gm0VVv1tBYRMA0e%2FsvKPDetg91Yr2EIfUAYHT5u3gvommTPtpGfGa8TGfWiVpMw46WuzgY6pgE2MzS6wDykESDHsYBxrP40wUuyc4zzGL39gjXXwzSvvS%2FEtdQwff4cExaW%2Fes0xSHYYEwekKN00kiL%2FAJXbYfDyAnIVPdWjvHhgwcc5ACwXx9nge6Dgc6xTCbmKdUsIs6fUqp4FeMa5Be7P%2BJH6ef97b9vUo%2FlOXx93IFFeSuiXseZUz2Q64kcE0x68F6oTaUVK1SI8IEUxdmnBVqovV%2F0WF8zFKuV&X-Amz-Signature=1d7f455d97ec346a96c4aed6db7c1810a96ab9fb18a5345a7e1a78c03313d706&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHZVPYRP%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQCmhVJzSDIgeepc3GLN17SHD6cHYftrsBxOcMvtV0dgIwIhAOb0U2XJYKduzwkJfajQqXbHVkSB33ug7HTj%2Boe8IZL1Kv8DCDoQABoMNjM3NDIzMTgzODA1IgzWa5MCqYfZihY6RjMq3AMVzgVmrv4YZ4LbhBPGr5UOOMIamJJ1Go20BFl5howHzpgE44mk8oR%2B8GUlZ9oBbOb234FIyi1rl7j4JS%2FcdGtrdvOa3Dk7rzeakNjThKR6M%2BzHomSYM7kga2s44yH0PqSBaVFBKeGOg3rFjJCBlmDN5420xYphGe9XfRvbEKHfWvRbvM1YQhASxxID7rSG3woQc3KchFaw691%2BwYDSidgis4TKbWrtvVmtNrqFrnoAcgjywzaNrwiqrjDhY4pNRA%2FdVj12RbeajGRaRM7yMEPh6pZsrKiwEh2jPm4E%2BhDE1et2iIiFA10EYu1pufV0fl%2FULILD4pAxKioRHDgkK0SKPwryPi9UWWeT45nwy7JG%2FGX1HESuEcBDQPTj3qE451XF9cd%2F099gvmboS1tJ2Z%2B2fMjK5Jbxye4rZ3%2BTnFm3ym0nCxgV%2FGnEO8hZWjnnE6tIC5quYBEYE%2F3QeAtzpweHkgPytWkgKjsw9eSGFnJWko4UHPqhReRrozhKT3aNMHThViq9w8JdJSbvhi3%2Bdr%2B5dSxn0n9CASirpBGu4IVLhqXTYqeh8BuDsynv2zz9Gwe73bKGWut3%2FLHrNhexDHRz7yp6maBiV5DANM94o%2FpMx61o%2FX3%2Bhybd3xmrYDDLpq7OBjqkAUYPfCEZdYj1FURrtqEz2aanFaSzsdMTMSa0KcjzTcgMT0DWcuyPn%2B61vKsAf74qeS9oG%2FouhD2jEp4PFzo3GqMTXh%2BLX2ssem6xXgwJp5hRh6sMUxdRty%2FivNdtR6oZQpcaVAt2%2B6pudZaGL%2BgurvgmHnedfLLkjsSkRFUAKMRM%2FPgVkqsSPX10l3UDxDkzhvvSfu506ul6fL6ewm4h%2BB1usqRk&X-Amz-Signature=e1f8e3a99691690c434f24914b20121186bcc8fe743cb8a02c32fca9b0173bb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHZVPYRP%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQCmhVJzSDIgeepc3GLN17SHD6cHYftrsBxOcMvtV0dgIwIhAOb0U2XJYKduzwkJfajQqXbHVkSB33ug7HTj%2Boe8IZL1Kv8DCDoQABoMNjM3NDIzMTgzODA1IgzWa5MCqYfZihY6RjMq3AMVzgVmrv4YZ4LbhBPGr5UOOMIamJJ1Go20BFl5howHzpgE44mk8oR%2B8GUlZ9oBbOb234FIyi1rl7j4JS%2FcdGtrdvOa3Dk7rzeakNjThKR6M%2BzHomSYM7kga2s44yH0PqSBaVFBKeGOg3rFjJCBlmDN5420xYphGe9XfRvbEKHfWvRbvM1YQhASxxID7rSG3woQc3KchFaw691%2BwYDSidgis4TKbWrtvVmtNrqFrnoAcgjywzaNrwiqrjDhY4pNRA%2FdVj12RbeajGRaRM7yMEPh6pZsrKiwEh2jPm4E%2BhDE1et2iIiFA10EYu1pufV0fl%2FULILD4pAxKioRHDgkK0SKPwryPi9UWWeT45nwy7JG%2FGX1HESuEcBDQPTj3qE451XF9cd%2F099gvmboS1tJ2Z%2B2fMjK5Jbxye4rZ3%2BTnFm3ym0nCxgV%2FGnEO8hZWjnnE6tIC5quYBEYE%2F3QeAtzpweHkgPytWkgKjsw9eSGFnJWko4UHPqhReRrozhKT3aNMHThViq9w8JdJSbvhi3%2Bdr%2B5dSxn0n9CASirpBGu4IVLhqXTYqeh8BuDsynv2zz9Gwe73bKGWut3%2FLHrNhexDHRz7yp6maBiV5DANM94o%2FpMx61o%2FX3%2Bhybd3xmrYDDLpq7OBjqkAUYPfCEZdYj1FURrtqEz2aanFaSzsdMTMSa0KcjzTcgMT0DWcuyPn%2B61vKsAf74qeS9oG%2FouhD2jEp4PFzo3GqMTXh%2BLX2ssem6xXgwJp5hRh6sMUxdRty%2FivNdtR6oZQpcaVAt2%2B6pudZaGL%2BgurvgmHnedfLLkjsSkRFUAKMRM%2FPgVkqsSPX10l3UDxDkzhvvSfu506ul6fL6ewm4h%2BB1usqRk&X-Amz-Signature=ddd2022d9c543c913629e8fe009cb16c761d34c37d398312427b3ed940773000&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q675BQKP%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQDhMU2H8UnQmCZaKV7BRufFwJMSsn38rMQmcND4Nxx9ygIgBAL9aAWFBakbbyQGHrTZGxtmC%2FSdWsj0JPG55%2BFMxUgq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDH1jeA4oNAENlhEKVircA50FNPIWrnU3VMZBWsMOrghyx2VfBE22a5U1ksNxieptnZWbW5kxrK0rgCRJ6YswDNFwzdJ5M8CwHtnxwqOShzOlW39qiplx%2B0HBYns6jtlDrszNXQy9XhO3uR959%2Bf06smgkDJcX1e%2BiRbCgYGNtNI2Mz2pwej%2Bom1WPq2Tmu1gX8zKScmmRn2c3Bsd7yF72LlHwUhXqIbaF%2Fbobl6ydE7IbK9kd9VAnWRtAzh9EAkpQRReXs3vqroC9kYu308evtBhVZQkfOE73JkmJMYXhfohvMvEYzMzqQCDZUb5Pfv30x5hsm7OxnpZCa3hoHKKJmN9DKDNVtciRZRHzZKrM%2BAG03%2BHedQflsAx%2F5AdrUhbxvRSbkhGOfM9b28U5vB4uh%2BB3XRGtK65nhktWQZtJZe%2Bz4LvNJLqof%2F9oQWe%2FJbOb3A55GdhDkdVUv66uCdFH1uR6PxbTdY9KSE%2F29oTivX20X%2FADbleN6ECiVlVnXODnD4k6pAyLM8BCuhJ3FFNwAuJOZTWO0LKRd9I9Zm7hbf46C75twGtGVt0nC2fh3W68XPIi5%2BJeZFRHtnRECBHqvzYdSmsOIlqpLaMB0CW4%2Fzo%2BNrSHQobTwEt%2FmOhFwxDk5hoL1Gs%2Bg676W8LMO6mrs4GOqUBSM7ZJvweGhBfItpbb9KkG9wGb5uJW03d8ZuRsushHNiTFMqdEUNqLtKyn0Uy7%2Fg3b7G52%2Bx1To%2FAaCCj%2Bl3nO7MK5ldZ1SYnsgSwExQqUqEbKRV7u7Q4ZgjxZ0fFtSJ7yovrV8ct5gVoHWUhcsEGZFTBDMooMTcQT6PN7lzxghVRhhiEeuMHuTXTRP5TSm5KJxUcuWRexNsGXMt8k7d6ZvE%2BCxgb&X-Amz-Signature=50f71be36e92ad3747f704e461561f1afb677c107be9acfb0e4052a3bac4acb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TANYURAJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQC0B0%2BLQw20AwnG0lqV6%2FU66OhwhqSVDnddadJgrQOweQIhAOWe2aMc2NuG6VYJAvtOpnX%2BQpes%2FkWoVJWRGUor2RXSKv8DCDoQABoMNjM3NDIzMTgzODA1Igx5NJ1B34NMKn%2BqHLAq3AP3uLSGjUfRBo%2BuSWfmfkkTxx4ryGNExzCY9Sde1Dau915uukXLU17DJsvH6pzpw55MM7TzVuG4XHN%2BdbQJpydBdPCEXkNDNdTk7yXQhLzPTgMybPcf%2F1gr8yQhDHE3helcW5MbdaUfU%2FvRdYzWXaLqQ3DDauk7GQLz%2BsaIsDXAjTMphpk3m0M3iJckdBCUfKi93B9qN%2B0cKMhBBLe7t1CkkkUJiFyBIQkwdExTvqmFoqEFmOfOBCoQdOOmzfaE5FJKpexk6p3iRGeWhEw43Vz8nR2e%2F%2Fwuk0qeifgva1DDNjZxLLE1A%2BqBLzmr0MF%2BQdrBdkEvap1ijW7UBraZoCtPhF2bMxQ3GpGIDmP%2FBlJt8MmaAR4hX8wzYe6tjpvqOb09nz%2FeJQMDWqokUmb2ctqgDGxI%2BI%2FgJc06NEFYqEZOMCC3k6FMisvj9KDZPzno9k1bq%2B4rKRrNPlFAEaglHr4RQvWIdrGTBi6A7LcMWN9dXYXwbWLZwnc2yAy70%2B7naDsRnimnPQDtwXQWRcxQlQw0y3TCIuvaN5DcuUSFoiX9SF2Vfe%2FODGfl95JVKgA76FxJh7hxJ3MhVSU7LnFNRDpYceqCLh3vlaq9ax5Tn7mTTS5JNTq1%2F8M%2BAJ%2BLqjCtpq7OBjqkAalke3DG7UEBYK9CyaNIkcUxWe%2FL0EXY9f4w3O2Nfs48wAXmAIadX4BflMMup%2BQGYF48PgFh0vn93eT%2BUzXXurPVOYuwuHie8N0a%2BPSIo5JCn0jm2EupGwr%2BVSfjgCxCWUsfIvFdRQ51ibouhwlwzykpy6HBjOZ8QWsRV063JP1yk%2BIQsya9XTVN8QIXpaBjvtC8eukJSCBJZH2P6cClnuAJ0s9v&X-Amz-Signature=aecad53147f05484db417137f39a85652ae4b1871d507043d5c0c0eb9d70336d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TANYURAJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQC0B0%2BLQw20AwnG0lqV6%2FU66OhwhqSVDnddadJgrQOweQIhAOWe2aMc2NuG6VYJAvtOpnX%2BQpes%2FkWoVJWRGUor2RXSKv8DCDoQABoMNjM3NDIzMTgzODA1Igx5NJ1B34NMKn%2BqHLAq3AP3uLSGjUfRBo%2BuSWfmfkkTxx4ryGNExzCY9Sde1Dau915uukXLU17DJsvH6pzpw55MM7TzVuG4XHN%2BdbQJpydBdPCEXkNDNdTk7yXQhLzPTgMybPcf%2F1gr8yQhDHE3helcW5MbdaUfU%2FvRdYzWXaLqQ3DDauk7GQLz%2BsaIsDXAjTMphpk3m0M3iJckdBCUfKi93B9qN%2B0cKMhBBLe7t1CkkkUJiFyBIQkwdExTvqmFoqEFmOfOBCoQdOOmzfaE5FJKpexk6p3iRGeWhEw43Vz8nR2e%2F%2Fwuk0qeifgva1DDNjZxLLE1A%2BqBLzmr0MF%2BQdrBdkEvap1ijW7UBraZoCtPhF2bMxQ3GpGIDmP%2FBlJt8MmaAR4hX8wzYe6tjpvqOb09nz%2FeJQMDWqokUmb2ctqgDGxI%2BI%2FgJc06NEFYqEZOMCC3k6FMisvj9KDZPzno9k1bq%2B4rKRrNPlFAEaglHr4RQvWIdrGTBi6A7LcMWN9dXYXwbWLZwnc2yAy70%2B7naDsRnimnPQDtwXQWRcxQlQw0y3TCIuvaN5DcuUSFoiX9SF2Vfe%2FODGfl95JVKgA76FxJh7hxJ3MhVSU7LnFNRDpYceqCLh3vlaq9ax5Tn7mTTS5JNTq1%2F8M%2BAJ%2BLqjCtpq7OBjqkAalke3DG7UEBYK9CyaNIkcUxWe%2FL0EXY9f4w3O2Nfs48wAXmAIadX4BflMMup%2BQGYF48PgFh0vn93eT%2BUzXXurPVOYuwuHie8N0a%2BPSIo5JCn0jm2EupGwr%2BVSfjgCxCWUsfIvFdRQ51ibouhwlwzykpy6HBjOZ8QWsRV063JP1yk%2BIQsya9XTVN8QIXpaBjvtC8eukJSCBJZH2P6cClnuAJ0s9v&X-Amz-Signature=aecad53147f05484db417137f39a85652ae4b1871d507043d5c0c0eb9d70336d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUO5LRGR%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T095134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQCbxW6pqc1g8EyX%2F4BqPiDbS5KaQ86e7uG3r8F2uxRd2QIhAOZsUaEx%2FSF17KL8EmXFKwc2TAfIEF2GLUM38ZFdNz0VKv8DCDsQABoMNjM3NDIzMTgzODA1IgweJlgTgJpdKha3np8q3ANyhJG2RGi%2F0Xit3GMB1o7Olwx6sQrTyvHSAPu39Z7LrY0wZCrBMB3jdqVasVe%2F60BwvZuJyvKl2vWjTJsHJga9H5iWsuJMhs%2BLpxiaGV%2BAyKE%2FhdmzWKm8%2B5hxvavPq0dgDNp%2Beyanp9sM%2BVzwmcnUiUIQ3x%2BIpEqrwmwgmN6z3Ma5U1mAvSKV1l6o0gLIqjOkehS9auNvRoKzT8x%2BcNucVokfxuoh%2FEy09dZBpiE6xkm5Rwb8YUgPokcKF28VvE%2B4bwrxqvoJKRAZT2ENonQmt70hsjyaUUfhZfEvCUZl3a6UZBuTw0WtbYWiph%2Bs7w%2F6cGKSzW3dOk%2FD252zdswX7UEHW2sprxa3urBqLrkSIH5iwV%2BCVCq9snzrkG%2Fpp69LnuVqzK8kBtll6kkLXW9SqbNS0uKt69PChWj9RDRAiYARkECJq3LcLjfDJRpHCjQ8IdsNjJ%2BEwtBA9N0O5gK8cH3hWESH6w7KKHqOj%2FZLp152dqju5oD9ASMAeEbWPTJqzb3pTCF6DV3UcsY2BPHqaVal01utXco6Y%2B0mwfjfa0imMbRyk7ytiURq4QSnYBpUoBqD6NQQJQrVdfoUOZT2VjYN%2BF45u4FqeJ7naYBkWF6saYYzIN8ilfkpvjDOpq7OBjqkAc%2FIyzZCv569OhBYiSAETWpn%2F%2FTv5zpqY86IeFgF8cuO679zAZKeYiIC5dTP%2BoFN2uxUwVNoQRv3R3Vl3IT%2BAFBcmfTN6vwUIif9aHL7gWrizmYm0aPUj%2BDs7PdBikQxJJxyAT2XB%2Fmm3BJGtsw44EW%2BzGl7z4jf9bUqa0my2lk828RcDrno4qYbcoRw2LlNPHYZcDMaOTZ%2FHFIRARbihCTq9M3t&X-Amz-Signature=3e2f9ef09b3f56e55c6874dce8e0a72d0d0e0a69541936ffb559a48fd24388f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

