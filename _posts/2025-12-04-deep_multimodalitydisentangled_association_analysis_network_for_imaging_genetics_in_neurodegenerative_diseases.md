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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646B7CXPL%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5Mzfw5d0Ch7XbpVuo%2FvpD%2BLI1H4MAOTU7PPREyMSB%2BwIgCbaWH%2BdzLJWXW32W5ch9jUcfn%2BUqJ%2Bud463bFKnC%2FlEqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFj0%2BUUEMeylYEDg0SrcAzpKLlqfNWTLm4uSl%2FYUrX6PkxqK0%2BmIQu5B47Tk0jS5MBDkxWYDe7%2BYz2nTOdKW2G%2BKe74zgDiqtRviaR0zLY%2FjPwq0gJgC7wU1ZqBp5rZCIZXIzKOx%2B5BVgEroVPRleVopxKcNBfl5jFNkDesupjvnlDgINwJhQjKGtfC62zGmpJ4Udz%2F76rf1rcq2QKXXfKUmO%2FMymzTLdzt0YMZjQIDicSeiv55iau1zVPYAAB8zz%2FtEnwkX5yMIiu7pOkWKctT%2FCD8AjphRekLO2mdgAklTiAvm1PuXzoV43QfutIyWtUBE2XF%2F4GcH0jnS7cszg%2FJzps2JYoKuYNjVm7SDbjPnfqnqxP2%2FfbSopdqfq72fv22ksQfh0j%2BrGVZHBhkdPYrFcf5r4CKDowg5B19irZ7orjK2pd7ilr2Khv9B9TEUcZpYMBQM%2F%2FingSVHkTNrBDv9AoNZC18Pf%2BJFSHHOUxJthDnKBJxG0xdDwrQjp%2FIGtW%2BDWTJXfWRhV8sgMrsqU7qNmV5uOngkr06bl5By0%2B1XLz9%2FAfuXqWasTmYriCPI2GPLo8Lqo%2BJFZuUt%2FRYTM9Nozh9nP%2F7xAV4o%2FHk3TMIkUmFLgpHc9OvqG9lBMICo0ShnFEPpX8BWQHcnMKC%2Bk84GOqUBKm%2BlPt21%2FLWMP4manRzHlDuXDXA1zT7ZrSZ42%2Fp1vXLXq8OUgH4VR4oALEvmpdX9fwV62ORRFKOMXYnuTtXlQaGlM3%2FcuckHJarlH%2F4rp4npVAIz1JP%2FQ0phV5ydx5Jk%2BDcGHF9HyF%2FFJE9wwyHBNAJXsHub8mhgAL5cG%2BxlGIdt5TCJNN6dfyr1zG%2B70uTrdahFX2AUo15DoLUGkFMx5VRGc10A&X-Amz-Signature=2ebbf5f9f08aa37546df3de91e0c8e2df44d939f44633fbb008df09e8ebe6789&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646B7CXPL%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5Mzfw5d0Ch7XbpVuo%2FvpD%2BLI1H4MAOTU7PPREyMSB%2BwIgCbaWH%2BdzLJWXW32W5ch9jUcfn%2BUqJ%2Bud463bFKnC%2FlEqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFj0%2BUUEMeylYEDg0SrcAzpKLlqfNWTLm4uSl%2FYUrX6PkxqK0%2BmIQu5B47Tk0jS5MBDkxWYDe7%2BYz2nTOdKW2G%2BKe74zgDiqtRviaR0zLY%2FjPwq0gJgC7wU1ZqBp5rZCIZXIzKOx%2B5BVgEroVPRleVopxKcNBfl5jFNkDesupjvnlDgINwJhQjKGtfC62zGmpJ4Udz%2F76rf1rcq2QKXXfKUmO%2FMymzTLdzt0YMZjQIDicSeiv55iau1zVPYAAB8zz%2FtEnwkX5yMIiu7pOkWKctT%2FCD8AjphRekLO2mdgAklTiAvm1PuXzoV43QfutIyWtUBE2XF%2F4GcH0jnS7cszg%2FJzps2JYoKuYNjVm7SDbjPnfqnqxP2%2FfbSopdqfq72fv22ksQfh0j%2BrGVZHBhkdPYrFcf5r4CKDowg5B19irZ7orjK2pd7ilr2Khv9B9TEUcZpYMBQM%2F%2FingSVHkTNrBDv9AoNZC18Pf%2BJFSHHOUxJthDnKBJxG0xdDwrQjp%2FIGtW%2BDWTJXfWRhV8sgMrsqU7qNmV5uOngkr06bl5By0%2B1XLz9%2FAfuXqWasTmYriCPI2GPLo8Lqo%2BJFZuUt%2FRYTM9Nozh9nP%2F7xAV4o%2FHk3TMIkUmFLgpHc9OvqG9lBMICo0ShnFEPpX8BWQHcnMKC%2Bk84GOqUBKm%2BlPt21%2FLWMP4manRzHlDuXDXA1zT7ZrSZ42%2Fp1vXLXq8OUgH4VR4oALEvmpdX9fwV62ORRFKOMXYnuTtXlQaGlM3%2FcuckHJarlH%2F4rp4npVAIz1JP%2FQ0phV5ydx5Jk%2BDcGHF9HyF%2FFJE9wwyHBNAJXsHub8mhgAL5cG%2BxlGIdt5TCJNN6dfyr1zG%2B70uTrdahFX2AUo15DoLUGkFMx5VRGc10A&X-Amz-Signature=2ebbf5f9f08aa37546df3de91e0c8e2df44d939f44633fbb008df09e8ebe6789&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLQB3SWR%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD1LSQVDvcimTuaSHUx%2F79nhfAfGo25iIfLRtAze6TxkQIhAMvB0IFziWmkKRMjSihGEvmS8MHcYOhL7w3YDFbmgGNPKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw3qrOF2HBc0067Ov8q3AMpEwb8opa4s1SWei4aHCAexrJULz2xHjt%2BvUs9Da%2B2IXMgh3%2FqS3UYApRRuHX%2ByS%2BS5QEXvHLMJOlRwfMhIV1%2FdsNpl7vRIsgh%2B0r5Fu%2F0wjerdL5Nsm2iSOgZ%2BMrjSyGzLHiUL%2BDhSUF9Gvf%2BYfxmJ4PsR7OtjxQZvQOWzT5Sw2aD8%2FMkEmQtTgusytTjXvu42PeMMe2eWvUrPvYB2Oa0%2FetSrEbcVPsHV16sR%2Bn52BcbiVAFjENCaP%2B2qRQ1w7dOjw68MTT6ckPEiPlO5liHm%2Fx57uEvp0uHFbZ9XThp51N%2BSQ3egvEL69%2B5H6puc8S6V9%2BQO%2FKXfykcR5l4xvWi4o74lbTh3Yl5AhCDJh3Rh27SAXjl6ratU4yv2VBc%2FKCoVkPMJNRS8rLAKirrMT5GBfyieJg%2FAAAVkEdyo6aoFIvydPaZLy4Ov0%2BLfGnx88l5LmTHHGSRHxNXmg0dOA2oqpgbISzb%2Bpxg9VdfXXzqnH03g7m0w6JYJF28hG3ISyMVSNWBihZXrlY1OdoMZxqAYROjrgFqwbjbtWYDF0zTLurt%2FyDq3BBMKzC9SM8N5zGHAqF5RMMbxtGYxzAci%2FQC8bCXBzu28sS2iUwbVSlr%2B%2Bhjki3D16N892AbdTCPvZPOBjqkARxQDvuTVQCE7lba0rkXV0xfWqOH2kJEBTlVgOkV9vk%2B1xtmkB0atMoh8XjIEUDByYlVE0DLrsMgxmPRkmoyfqiZgSaOZucPo5xLopLO12tzTPdgP%2Fv04YHmZP9IFKZZhjizs7IA0ohs%2Bw2uRhPhY7z53HNIYCgcR8Z1cIm%2F6p6QCYdTjGnMwTsJUm%2B6bGKbD6wecpM79pcY0ahqRCRMxm6Y5n%2FJ&X-Amz-Signature=5f72d60c17c7df7fcb85cf4c316a75e406f8552158f99a17510db0ba7352e5bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3CD2XI7%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAV4eApRweKotyJYvleZ7Mjdxb%2BlRnsoETYuVosVaf8OAiBf%2BUTWjT2vf8vf42XYPEHB0rqHlPgxUqESMyuRwE5zeCqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVKM5RcWYPlBez1%2BWKtwDS3lPjJaYXAjoCprZGF46lZbtrSmwnUPm1RR1ELpqnFgwY%2Fr9P4%2FNHzllyr6LjVzxVrCzBDaHkZ0oOBofku7nkpAu0rK3nLaDIwZiL03%2FVlawag7PKhhlbkLyxLvSbhMKoiPSi4i0l2UkaokUbBHL5BRFCcyCOfGVC0mkaJ1LDdMyKoQotr0pHhNAL5KBOzvJy2ycNfq%2FdmN%2BltpqcXlzcZwWJDVZArq4q3MwGGFyukdv0EHJk%2BCKf0JAlBnIkWAeda3VmSWxTqU%2B66K03qtTfUdwBCNGy%2BiVsn7vb1Gb9K4NblzJ0By1HJ7haooLAeBiJ82kBwoCgw4S8yOAteL64tIipAZ7G9YpsxP34PZISfGz6gCbYpSSMpmfxU7UxV3FEO6DSf1bBUacu7Jy8dSbQ%2Fa6Ya6BBKs5mPWybsTcvUUcM3KMm6pglHg7b%2BCtf%2BcKVf8nd7cvw%2BDzdw7VsKcG6Zw%2B%2FhDhJUE9fUYdXDPgig%2Fi%2F8f8A3S5YKqT1ikKfdZEjzLlc3VCvOfJPt3z%2FU2UvfsrK3MaeO%2F3DgYJy%2B2zVLGvV9fJqqNpERYtsWTh46aStKh%2BEA%2FE8MMEvqWe8F3jEEM%2F9PXFxpjDdf1%2BZ%2BBrxQTXeGK6R9UR48VVfOIwnb6TzgY6pgGHNQby28DJFBaNsBX51pN8e3w9%2FqsyDumzIulsRyqaNTyAymTMU%2Fudx%2B1FtobEtkUR9GSkUkyqUVMC5zcKHehB3Eauv8CJuBh3anCFIygPbm8Otil%2F9lhW6qSowaJYHIzNGdNisWb%2F8UpjjR9A%2BLntK60HX8sSRXFMGAtlyaflZfR27eF7h3AGrYnC%2BCQ0Ky6HICxedSE2AAiy%2FW4g%2BIlI%2BkwSd3yW&X-Amz-Signature=5f462a64f851f10544335c4585b98d784fc02b3a8c41bb00c0511edb149d1e63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3CD2XI7%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAV4eApRweKotyJYvleZ7Mjdxb%2BlRnsoETYuVosVaf8OAiBf%2BUTWjT2vf8vf42XYPEHB0rqHlPgxUqESMyuRwE5zeCqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVKM5RcWYPlBez1%2BWKtwDS3lPjJaYXAjoCprZGF46lZbtrSmwnUPm1RR1ELpqnFgwY%2Fr9P4%2FNHzllyr6LjVzxVrCzBDaHkZ0oOBofku7nkpAu0rK3nLaDIwZiL03%2FVlawag7PKhhlbkLyxLvSbhMKoiPSi4i0l2UkaokUbBHL5BRFCcyCOfGVC0mkaJ1LDdMyKoQotr0pHhNAL5KBOzvJy2ycNfq%2FdmN%2BltpqcXlzcZwWJDVZArq4q3MwGGFyukdv0EHJk%2BCKf0JAlBnIkWAeda3VmSWxTqU%2B66K03qtTfUdwBCNGy%2BiVsn7vb1Gb9K4NblzJ0By1HJ7haooLAeBiJ82kBwoCgw4S8yOAteL64tIipAZ7G9YpsxP34PZISfGz6gCbYpSSMpmfxU7UxV3FEO6DSf1bBUacu7Jy8dSbQ%2Fa6Ya6BBKs5mPWybsTcvUUcM3KMm6pglHg7b%2BCtf%2BcKVf8nd7cvw%2BDzdw7VsKcG6Zw%2B%2FhDhJUE9fUYdXDPgig%2Fi%2F8f8A3S5YKqT1ikKfdZEjzLlc3VCvOfJPt3z%2FU2UvfsrK3MaeO%2F3DgYJy%2B2zVLGvV9fJqqNpERYtsWTh46aStKh%2BEA%2FE8MMEvqWe8F3jEEM%2F9PXFxpjDdf1%2BZ%2BBrxQTXeGK6R9UR48VVfOIwnb6TzgY6pgGHNQby28DJFBaNsBX51pN8e3w9%2FqsyDumzIulsRyqaNTyAymTMU%2Fudx%2B1FtobEtkUR9GSkUkyqUVMC5zcKHehB3Eauv8CJuBh3anCFIygPbm8Otil%2F9lhW6qSowaJYHIzNGdNisWb%2F8UpjjR9A%2BLntK60HX8sSRXFMGAtlyaflZfR27eF7h3AGrYnC%2BCQ0Ky6HICxedSE2AAiy%2FW4g%2BIlI%2BkwSd3yW&X-Amz-Signature=e181bce23cea3baf4ef8f2fa780e82ca208f686608a931998b158dba96e3b296&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRZLL4FR%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBQu%2BYlatarYNCHuUVcyEcsnd5YwQFwSv%2Bl%2FDOuwQ%2Bh2AiBJ8xtGEoBoW%2BPPGK8%2BcDRXRUeFIgcjknMe7p%2BaEdj8YCqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtwq6t%2F1PKcgFsnjSKtwDRskwsLxwglDewf9lhFHjpImf31buayKhNx2s0hRaS7vlyKbWFtYWa8KvAsJDgVYAJdlBbBJy1Rvx9I%2BqHTjo%2Fn%2BPKguWyMeR05dmheXObE4WoLbvJD5mC60ZwH6a0hN29SSsyjC3agfvBh5k6Qkk3cJeLqXLK0nzQBtYVy3uCfXsvdF2uBVfFiQkM%2BlVA87qyUT8NudBuXUA5eAm3xf5tlengTHxyZ9WId5Lbh1ny2r25rZpg1TpNX3MjJ3QJjtkIW%2FChazAVmJ8Gxlm2eIYyugbvcVl3V%2FhCHfj5WZkWQLF%2Ftbt4HuqVN6MAvAIIR%2Bj29abr2vMVCcLf8K1oWfr0fUGJifUoQqdInH6Xu5MBfco0AWcCvEQsRSG%2Bm9ZnfWbY3fI0zfgYFfxQTKy%2B1Osa%2Bpsm%2B0Qr4gSjYdMBOwZchdQ0npDc%2BUoKqGPz1P6n5alp%2Bc6hBaI%2F5srfaNdCMKiy7E8%2B0OIkLwsYqATZwnRIfc9WVMUqzlG1dIExvQxgQLyVjuD2R2QZtZw3THiZ2TYygb6%2FcmOFtNffJSbu2atto0NiP%2FPV8tPmfe1F8dCXYSggIerv0O6k0njYxwF9P4USBT7tqMc2Vezzc9SXaKxMXD55YhvYKLeGZT8w08wxryTzgY6pgFsFgYyB3cb70f9l71HMNWlGOMpZCPntDPeR%2BUyD47rmqyUSrgjDN88rZNR0ZJO4l7qZHpjobYLjS6qVZigtThG7QJC8D84vEFW47CSyaJ%2BcUbOUH1R%2B0omnN5Ag4K3pMJKhDtxftnYqEN0p6NkXO0Q3B6IjRTeMoE7uCVNbmKVKGntwrOSpoY3ABsRMAUjWKztJKHULDoe1cXTmZZTpq5FdAmQL%2Bpd&X-Amz-Signature=6fc45176c8eab6e510626223c4d9ee87c28a075072f771ee90e81cd5e3615b7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVMMBI3V%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDCc0fJB2hCbPvPy8TLzc8dZddA4UyLNBOK24yd8oubwQIgaIbP7CUISyc33Ls4oBhRQRqlH2V0cpDMaSe9ndy1bSwqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPB8KrxwUbDh30ujUyrcA1AQBjIN1e8oG2nCrbcN9GccRUqhAPPzUSFVpSeUZKzuzAPrDRM4Apuca68mTKvXAqaitfPzeabOqUds%2BrzuDq2QoVA7U%2BGypvxaxCMIwEISa576WYaYFlkQj7OBQ7%2B3zoYoFIkVdS4eiQrKQAeSUxOP%2BaiHBeiIRw%2Flv2JivOUWl9LlgSUl7SYywss%2Fduxpk5ADG6FvxcBQfhAE2otp%2FbDoAn3zxkG2MjYGWSzGliOf5ETaWN%2FpOlN6lFoN4P7AsUD%2BspPFzyBslIud%2FEh1f0GjioocB0GKmHkAjdc8JQY3pSAd0J%2F8ZEOhHdCZr9Rtb5hGmZ3f5k0Qr9%2FE0dtR0C8ZlRo9Yq0C3vo1flw%2FJFFcHYE8bRqVa2z0ycOgCHevcUyblpKBSGqF8fKHrUHbz%2FA2c%2FXA9SErr%2FoL15BTjoWENJ6Jxk3ApTEYNr0Y8%2BVb%2BCgRXHFyawGGJ7x9D0Y5OKF5uL8K3M5S%2FibICA%2B8IkeIvYgDN4smRzZ6E4Pn4mongNTf6%2F%2Fm7Itu7bt2HR%2FUdzJtkH8Hl3%2BuUnabcWYlvb6fka7iHgKhGIk05Xknkc1YSN8aewxzSEQkMeWOrt2Mo0Z%2BnO14LoGXdAdK%2BD6bVQqJrHlAyYwHuWDz2WeQMIe9k84GOqUBzG81jejaOSKZLDWMbT7jK9GkrYSXbZVZd1DfTDfYVaWfERBf40ODbv2rI%2B0wzJkqWOpc9vNpcMoUDGGAIrslCBktzn6ELNONQfUPbEgdK%2FuiJKFXYcq%2BMBROowPnluTa7yWYlIqGHWC1pi49vHCHNaglxwbGUBgEoJHoprYE8n3Y0PH5uawoxiVkebLYsh5aWM6T4KIDbgwnNGAt0z7BLVYu8HCs&X-Amz-Signature=ce762f6b4374f57ed38411022d2c030f253d8bc44aca0788759c3b8f37224be6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZ3ZR5MU%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDXMyCFE7GX34agY%2BKiuxPHv1iZRXJGX1B%2FRQ3kU3bmAIhAM4HevShsI7GEpn%2Bi8DX1mOaRddjHpbYb%2FtUDd3osU0dKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxinifzfxvcyaMlo0Qq3APTngwEOTyayGp%2BTe%2F8aOJGOzWXlpEnxHF672egqawh2QETlvcMBNnN6ynBLEoC0%2BYiDYXRbxQ0D4VKPR%2Fifj5lCBvKKcbWIdW9dmIoy2eqL7wzHT2ACBq1PMpJ2bto9IbMDpzQTyqEjdmqi91SSBgFvw1WjiBWxkHJPhPd%2F3zjhFyC8rDvXjNlX%2Bbw4iJqdlpt13auhSPqR%2BUTfn2GL3fUX6Aip1ssmYsuk4YL7mUf4UnkQUeRlhr%2Fu3VJ8sKHLRSfxu2oJS93XvvD00P9znLql0H1rCQnm4GShIlPNri%2FA3Z23EbfuQMCQrzqAXm%2BOGypUVZvHg64YP%2B1CT4w3Wsu0TtRZzwKwP58Iujl18zr68oNNO%2Fb3aLUeaSWHqMxcLD7l0wbAR%2Bc5MWp5O3recxK8WN%2F1kAwJVZ3yVdEGwRtwXqNKUhADqluaD1OQ2eQvyRrpj6y7Nj3GpIuGbZX1xkzFpvcDa75LLzcohzDnpl6R3a7e4jJ6qTLw85tGZsheskYlaaIcjIwP8hWlwnwFhsrodH0ev%2BN7dddDUdlEe8AbcB1jMABVr%2BKhdP%2BprTXkYy6ZtBJBIts8KFMKzV2FtPY6VgKi%2BYkAR0EYXvypjISyeKugyhmS9ehbYi4CDChvpPOBjqkAUHuVJ5j8OmIlkLC%2FxXW1agGFFkUSDpU4kbA5dvMmucPIXym9%2BK8BnWztuRxcjjVhQLNvdd1WY5ll6EwjrYL4agomJC52etbJt4Koh3sRhuSlzAIWzBVK1clmpyAPRierw9C3pB%2F34BnHTVN0pJoa8%2BtvLeSCsseIMXy6dIT%2BoIpmvlTQUztHpILuiBZCpeecPvivAt3LPdbJIecZzpg29cMm6Sa&X-Amz-Signature=9eedf2186f3306ca6b75bc4a173297d48dee70308f7f0d0c7aec091fb933f020&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCW7BSUS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDtRwNvMRJywIwSx9R5bHpPEDaq718o9EZSPCH5vMwhkgIhAMlEZNhjIFyTIncIyEfs8ZqR8I0t0DIsexwQuHuXkQecKogECMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx7r9z2UMRzvd%2FIGR0q3AOjO%2FtbjrfoMDGaHbyZ8DtANZmdxD9eLpVwZ2NBRrf%2BxZUcRdyDWBGZNjMbFgCQqNKXDFiSrNg0mi6og8JitlyWNd5ztkQ1lRK2HJNv%2FSftPesY3PI4feZOLALLnoSWVXt5oC%2BGYwwMWZPu8KN9oSZ%2BVtfpi3fbNswWVLUG2OwzhNadKd7uceGAUVc5FNIvKlVfVgGPKhSNK62s9%2FMwvcX1YxmZeIXNjnLCwR65iKZ5c0a1rhR%2BWE7P8W0dJ2bwR%2BKT624Gk1pYqZfV%2BPU%2BSSivU6zqGlsYbmS0NpmqQvIboJZ%2B1WxgXJ8hbYPfp6AgqI1%2Bh56jwQ8rbMnBh27c60pxZ1nGbdkzsVztopMOWZe0mgAvvpPmBNKuRVbNEJu2%2FQp2UR0iM26UVUO6Ue8FLMIm3Z7HEXwPFLIbYJjiCqh04W%2BeSOOlN1gdvCz3g0zs8xXccBQe8C6Hu%2ByLBGZgK0CegSHGWpeCSWGiDENd%2BqMLRRqi06Mkijgr9dhw51N3sWmYn1UtF6FVJ4ZISpRJ6MBwHZWzyaUFRHwAFoC4IE74U2LSorkNv%2BwmpRr2XKKAwHVFKZLHETMXOGoHjX1h8quFd7lkKdnUhCma79yIr0MklsQ%2BlAjqoVLdbQrBzjDRvZPOBjqkAamQge7sBIWgSwf7i%2BSBIIEeeVYdYpxYPmeIfwzJiYQlK2bsDGLjCweJRjRejJ3Al5xiD4Xg%2FzrMgVtuf7BEPq1lwa0pF0EA2K16HIDk2kwLrqZEQklluuOlaDkG8Msb17V4O2j%2BCbODgQw31LDXU1WRsZGqDOhF3kfTXUfZH3AqxsS730uS98lXSz34garc7HCGyJEDgv9eBzCAi2hpSPbXHWck&X-Amz-Signature=f1ce91320bca7f3ecde10247130c4025da8e4c55830b8774674aec10ebac9a58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCW7BSUS%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDtRwNvMRJywIwSx9R5bHpPEDaq718o9EZSPCH5vMwhkgIhAMlEZNhjIFyTIncIyEfs8ZqR8I0t0DIsexwQuHuXkQecKogECMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx7r9z2UMRzvd%2FIGR0q3AOjO%2FtbjrfoMDGaHbyZ8DtANZmdxD9eLpVwZ2NBRrf%2BxZUcRdyDWBGZNjMbFgCQqNKXDFiSrNg0mi6og8JitlyWNd5ztkQ1lRK2HJNv%2FSftPesY3PI4feZOLALLnoSWVXt5oC%2BGYwwMWZPu8KN9oSZ%2BVtfpi3fbNswWVLUG2OwzhNadKd7uceGAUVc5FNIvKlVfVgGPKhSNK62s9%2FMwvcX1YxmZeIXNjnLCwR65iKZ5c0a1rhR%2BWE7P8W0dJ2bwR%2BKT624Gk1pYqZfV%2BPU%2BSSivU6zqGlsYbmS0NpmqQvIboJZ%2B1WxgXJ8hbYPfp6AgqI1%2Bh56jwQ8rbMnBh27c60pxZ1nGbdkzsVztopMOWZe0mgAvvpPmBNKuRVbNEJu2%2FQp2UR0iM26UVUO6Ue8FLMIm3Z7HEXwPFLIbYJjiCqh04W%2BeSOOlN1gdvCz3g0zs8xXccBQe8C6Hu%2ByLBGZgK0CegSHGWpeCSWGiDENd%2BqMLRRqi06Mkijgr9dhw51N3sWmYn1UtF6FVJ4ZISpRJ6MBwHZWzyaUFRHwAFoC4IE74U2LSorkNv%2BwmpRr2XKKAwHVFKZLHETMXOGoHjX1h8quFd7lkKdnUhCma79yIr0MklsQ%2BlAjqoVLdbQrBzjDRvZPOBjqkAamQge7sBIWgSwf7i%2BSBIIEeeVYdYpxYPmeIfwzJiYQlK2bsDGLjCweJRjRejJ3Al5xiD4Xg%2FzrMgVtuf7BEPq1lwa0pF0EA2K16HIDk2kwLrqZEQklluuOlaDkG8Msb17V4O2j%2BCbODgQw31LDXU1WRsZGqDOhF3kfTXUfZH3AqxsS730uS98lXSz34garc7HCGyJEDgv9eBzCAi2hpSPbXHWck&X-Amz-Signature=8eab4c241ad1ba0410044e4ab6be3a1d622e2417ce382eb7819bf5b14930f538&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQNZYKZA%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWev3q19Aq20NnNsZ7j5g65KxLNWmIl6Tbm8ZD1sPeagIgPLtKcoUBWw3RjbtM2z1LT3FpefgNmbyY%2Fo9pWeq4hWgqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKy%2Flx%2BzddMvLCCXCircA78nmbkNOe3I5Raz2nC9YxIziOW7YqPbTbXFzBIpTop%2Fj0pbMhEqLVmioXkzRNZB5eCFLulnmhtjz7%2BWhN%2BhrBuqw074gqIZAJ%2FjG6RpObdcHIWKTWloAVN%2F6CP8faG3Megmb7EoCe0tX15bxiuyjgDW2Gey0mZeJPB4AdCaz1rAfW%2FwdOY8lTT2wzqokHP%2B6BJfxPpH36mLidMXZ4F3th1xp3pKUyzz8D3geesyM5d4FBJGiVdxFwhrii95ovW7Q7QICwr8kSLgojY%2FKXDvh%2BCAv5foeVq8jcg6893gxyrO2vlTunsfA2P64gNQYFzd8MMjcb8oulELOwpuU%2BjEzNbeCLKdWx6g67LlEoC2%2F2278zhfyljoDc7nILbriRrd90QIKyk%2BC6GDKtmwF%2BktfJq6h7HONHOPtmp3PAszjNSFkUMWHn98SIcMPKphAVPzM2PqWjbGu1VxndYaGeY3XASEHahizX1vImE%2BOQ22kHH1p1zvWBpkr%2B%2FLBS6g6NrsY4WAlJ3WkPCCNwqP7A8j6yZTTz0XoQeWLldZOy5l%2FgcLMI5JWD3bUoLrmbBioed1n0jh6xrIG83hIhNsTkKbXNJULsdmmyZgiBPKuVBD59ZzPkO6z6PxOjM%2F5EEBMNO8k84GOqUBynZFYpKAQqaK%2FYe0QpsXk7cWF218YQp12pkWhlDuT0HzN5kzyFlwz1Q5Lof9FO3zf4NZiN%2FJ7IHsNTxb7CM7ric06niv5AjT1GHrtSio5bXJwljcvV7hB260hWeqt%2Bh3O3D03GQgvlnk6nuMqTmFtr2jpoWFFltzCTYC9x9ZqBQSZKMcMxO%2FYBo65avyHxT3e6TIY4TtOnPngHg4ic1xDaePpI%2FC&X-Amz-Signature=af4aa885bef5011b4a9343e4f783b1f26ada137bc5bd78a28d005f362dcc3c8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTEESQLO%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6%2FpAq5zAaiXLGDL1goBUHHf4lLezRs%2BupONxvI4I2xwIhALZBZjJ67zyXF9U54%2FU99V%2BHsSB8T2kekD7zE1nSrE63KogECMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy7T45yz1KPtfUmg5Qq3AOUiQjPklrAQJJjV1YRSu%2BXrZ2hbdyv9AHjEha%2FKH8mbHHr7M%2FVGTfdNWlol9EsSLr2vtE%2Fhk2vBPN2UxQFCLEVu%2B4lOuNM2%2BQyccEulvQT8tv%2FPnPjYboKtKHAh8l8vMPsXBaRWS9m71C2Spo4Tw7FY8HZXm0vNEaVShLxVesKN%2FY2HNG%2FyPBBOW1golJGKdnIDRMOtnNSHyA3ZGa131Gttp8TulJBdilr0ok5UBNpK7suEJ81sZyLsDdhztlZiwvohqljoqYKK7UQduF53rKo%2FW50fYUkgiRi1sTo1xjXvIRIdRlxCdfAgcEcSxegnZBMyDUGzLPSXGKrayi5is7a%2FGofCaA9V9%2Fr0ln2Wt1S8InVULuS3S6E5q%2F8sCJBJfOI3Q%2F4tauXXiQjNkVDrfXQ51KMIhEK9%2F3RMnbjVmBl1BfK94%2FBStvXJEoazUstICcDzZWgzlP2FSUd7SsQg8Z7nBCbsuxURAnc12a7lOXCZdc90fMQRFmXxkk3H5Xy%2FoFE3X3I2TCc%2B99hjbxC%2BFCmpQuD%2F%2FFBMZCiYyrwfOMshDGjfiFBIlHA9fGebrRvCp%2F1I%2FAV2R4nKnC8q4kXbK0Psy%2BfajxFamUH7dc7QnGbPT%2BAIYpIeyqpe0OJLzCfvpPOBjqkAdrWvS0Tg4iFndVZGXkfN1k7ko1jpNnfZCRn4jHUsEwVGOnyK5HDlj6g3ZH9iyFRjI16HGzQ89nd%2Bxk7JDhU%2FTvsJz8mghFXOE0g%2FXqEs60tzriXppYN0sLPl0yFrccut9g4Pbjc0HY8I4RmvBtmykXVmROeKzDEPo1L8iDGn%2F5DezoMFLnPd2we7R0WwNZl1YpqPRR4o6bPZjY8DQgOzV73yONd&X-Amz-Signature=7b113efa88412bfc24b9b684d9d724c889948ab5f1da9d17aacf455868da33d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTEESQLO%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6%2FpAq5zAaiXLGDL1goBUHHf4lLezRs%2BupONxvI4I2xwIhALZBZjJ67zyXF9U54%2FU99V%2BHsSB8T2kekD7zE1nSrE63KogECMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy7T45yz1KPtfUmg5Qq3AOUiQjPklrAQJJjV1YRSu%2BXrZ2hbdyv9AHjEha%2FKH8mbHHr7M%2FVGTfdNWlol9EsSLr2vtE%2Fhk2vBPN2UxQFCLEVu%2B4lOuNM2%2BQyccEulvQT8tv%2FPnPjYboKtKHAh8l8vMPsXBaRWS9m71C2Spo4Tw7FY8HZXm0vNEaVShLxVesKN%2FY2HNG%2FyPBBOW1golJGKdnIDRMOtnNSHyA3ZGa131Gttp8TulJBdilr0ok5UBNpK7suEJ81sZyLsDdhztlZiwvohqljoqYKK7UQduF53rKo%2FW50fYUkgiRi1sTo1xjXvIRIdRlxCdfAgcEcSxegnZBMyDUGzLPSXGKrayi5is7a%2FGofCaA9V9%2Fr0ln2Wt1S8InVULuS3S6E5q%2F8sCJBJfOI3Q%2F4tauXXiQjNkVDrfXQ51KMIhEK9%2F3RMnbjVmBl1BfK94%2FBStvXJEoazUstICcDzZWgzlP2FSUd7SsQg8Z7nBCbsuxURAnc12a7lOXCZdc90fMQRFmXxkk3H5Xy%2FoFE3X3I2TCc%2B99hjbxC%2BFCmpQuD%2F%2FFBMZCiYyrwfOMshDGjfiFBIlHA9fGebrRvCp%2F1I%2FAV2R4nKnC8q4kXbK0Psy%2BfajxFamUH7dc7QnGbPT%2BAIYpIeyqpe0OJLzCfvpPOBjqkAdrWvS0Tg4iFndVZGXkfN1k7ko1jpNnfZCRn4jHUsEwVGOnyK5HDlj6g3ZH9iyFRjI16HGzQ89nd%2Bxk7JDhU%2FTvsJz8mghFXOE0g%2FXqEs60tzriXppYN0sLPl0yFrccut9g4Pbjc0HY8I4RmvBtmykXVmROeKzDEPo1L8iDGn%2F5DezoMFLnPd2we7R0WwNZl1YpqPRR4o6bPZjY8DQgOzV73yONd&X-Amz-Signature=7b113efa88412bfc24b9b684d9d724c889948ab5f1da9d17aacf455868da33d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWOCQ6RY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T083824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhyPL77AIhXFB3SoPjo9VE1IP6lgwkBuHkoX1FyncWUgIgAfP%2FzF%2BDTGMxXVm3lIYkmjt%2B6bnzoDjlvc9bDPg2qpoqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJuf1OfiKG33BYaoRCrcAwjcmiCvheWZCaC%2Bgnlco8mnYfJ1SV7qn8uwMnhLOlfO4uf2lxZCMb%2FRigk6PuffoGJAAfic84yrqw%2BSMxVV9EC2wncyHqrX0%2Fu%2BFBc9dioc%2BV%2FCaKj46zM6gFnjx3kR1glNvpwQfdU8xEojxMrU2%2Bjb9YM7JppWiM%2FICZWLIsDZ2ILaLOuTNxTgYN8eOz78%2BnVhIT1xOsM8DU3bJxgUy8I1362rjFp5fh54TBwVjESsURYdvTWrnTKKFujKDEdT83DhBq0rVqML5JaiTAJDG2bBvCzP8RyAUnAej%2BVGPgbtQXjhIjy8XnySHjwv7k7265TZLpt8nob%2BBGxGRBYmSqwaMsy%2F%2BJRw0yXe6wa9lCF8c8mELvZWPll2mewN7jb4cqfOP5gM1t2uuS0G4r7iGjCByOxEc0fZqWlhbYuv9qjJK8QCKLhS85xuF3FYszlMjP7KxhvMs7Lec3KATycyqit1hjJWIg4709gdp5Mbb3DQj5aV8uR%2Fon5anTFXRazyriTNsd%2BfPFVkL4xrvAS6T7rfhxwaTSX9mZ%2B9%2BEcI0dP2OZXybflk1Fl3lAVFtyWYYYCCknlPXtnfQyLVEgnQNW42dEEgGEao2%2FO5JLVDtjp9Xv0GqWBSDTR6%2BznsMNq8k84GOqUB2v8nGwoovm7rrabkwI29NsIMFm0KzzZ908ZkgjRWZYvKAtROIzVgC4gHOos%2BhTC2%2FGKlP0fSREt7kbR0akE4%2FL%2BFXb3axAYiEWgx5Jx2dDfBQU78uYXICR%2BVJWUFG1hH1nCUFstMTOwtJDOj3PKSjMs5XNx1MMdJDT3DazSEMOTTFq0ZhRtLiMdoVCv8wPzHs1SmwHyoVTyUAx60nM42MGH3Vr4W&X-Amz-Signature=12eb44111c9c8439db889e2b046cdfe55adcbefad239eeb79a8fd0d82aa9c92e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

