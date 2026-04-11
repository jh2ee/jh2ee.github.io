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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULIIWO5T%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIFggWQafc76NhdOXDrD%2Fg4Mu6Jf%2FeLQUrjIICHJ%2FBNxbAiBHvjPoRtJZwHj4G9PQyMbiBK6uuArkcm9HGds5kwhRCyr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMuBSju%2BzwZuXeK7tTKtwDwRh7oM5T%2BdlaIn%2BPPxaC1aX9rYxuweM96WUgrTpQUAJn1rsUpS%2FwQy12yePg9FIcj%2FRkZbS1lQ0r3E0A3S9ZWg0C9G0akjeAwzJizsmquhAXQl315pTH8CaZntZ4oYCsobVNCzJkQHwu0N3RBN3tYE9F9PTNRtK07ylXRrF2DMY13mBKtbIRpW5gxBZfhDouDtQYz%2BFNYe4zctk%2BMV6ZH8%2BEcvH5%2FtJqA0AVmdeQqSh9tMQbvFq9cr%2Br87YH52%2FxS2Nuruc4aF4HWnRHt7ce7C2cLRJEXAediKNoTb%2FKI1vF%2B3gJKpy8Ge1Jy6mfBsT%2F0JLmyAfk5Se4DfU0cMbCdNxat%2Ff06P4utvd%2FhHZDGqdo4gnhk8cGZFAEIhuvCfN3z%2BM6gDUML7pzmLJbuf9AiOWPMdp%2BQDv6Q%2BHh%2FNWAz1mEyYj3%2Bxy4ka%2BnpwTrqU4gF3Djw4Fu4WxRbCb2Wm7m3uupdB11sP0XZWgOStcumUjdwhd897UNS%2BFZX55xIJ7%2FzF0hkYp9yzjm7XVLZOFDKUeH9LUg29dAmILADazlmH5YAMNljtTsiKX0WIdmibpAmKUJZjhM%2FNIFBm4H6vaN5G7O5%2FAY5%2ByTn%2B59C0zcgP0FTIx9TJjJhSwyzgEwssLnzgY6pgHEtCxU9FyXiFTgDLXB8odDO2FahG7xWM08yy4H%2FS2Ec9r5UceNzahdRp6yakYsJnwv4FiN9GUHIKBNvENGsVrFJ3gjSKHL3mxL6IhtII2sX9okXGD3qVp1kIm04MNOzg21aL9nRlbEobWoRm48PdwVMIIuuaFJq91NSNz6kTFt8OUuaBcgc3Cz9Q5xQ0ojMX%2Fe4Rn8AzGKeKnVOBYOXhfobtyx83dK&X-Amz-Signature=be74f0ebbb89443bda4161ea3720cb439cd316a9c185faf376cc04aabb8f27e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULIIWO5T%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIFggWQafc76NhdOXDrD%2Fg4Mu6Jf%2FeLQUrjIICHJ%2FBNxbAiBHvjPoRtJZwHj4G9PQyMbiBK6uuArkcm9HGds5kwhRCyr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMuBSju%2BzwZuXeK7tTKtwDwRh7oM5T%2BdlaIn%2BPPxaC1aX9rYxuweM96WUgrTpQUAJn1rsUpS%2FwQy12yePg9FIcj%2FRkZbS1lQ0r3E0A3S9ZWg0C9G0akjeAwzJizsmquhAXQl315pTH8CaZntZ4oYCsobVNCzJkQHwu0N3RBN3tYE9F9PTNRtK07ylXRrF2DMY13mBKtbIRpW5gxBZfhDouDtQYz%2BFNYe4zctk%2BMV6ZH8%2BEcvH5%2FtJqA0AVmdeQqSh9tMQbvFq9cr%2Br87YH52%2FxS2Nuruc4aF4HWnRHt7ce7C2cLRJEXAediKNoTb%2FKI1vF%2B3gJKpy8Ge1Jy6mfBsT%2F0JLmyAfk5Se4DfU0cMbCdNxat%2Ff06P4utvd%2FhHZDGqdo4gnhk8cGZFAEIhuvCfN3z%2BM6gDUML7pzmLJbuf9AiOWPMdp%2BQDv6Q%2BHh%2FNWAz1mEyYj3%2Bxy4ka%2BnpwTrqU4gF3Djw4Fu4WxRbCb2Wm7m3uupdB11sP0XZWgOStcumUjdwhd897UNS%2BFZX55xIJ7%2FzF0hkYp9yzjm7XVLZOFDKUeH9LUg29dAmILADazlmH5YAMNljtTsiKX0WIdmibpAmKUJZjhM%2FNIFBm4H6vaN5G7O5%2FAY5%2ByTn%2B59C0zcgP0FTIx9TJjJhSwyzgEwssLnzgY6pgHEtCxU9FyXiFTgDLXB8odDO2FahG7xWM08yy4H%2FS2Ec9r5UceNzahdRp6yakYsJnwv4FiN9GUHIKBNvENGsVrFJ3gjSKHL3mxL6IhtII2sX9okXGD3qVp1kIm04MNOzg21aL9nRlbEobWoRm48PdwVMIIuuaFJq91NSNz6kTFt8OUuaBcgc3Cz9Q5xQ0ojMX%2Fe4Rn8AzGKeKnVOBYOXhfobtyx83dK&X-Amz-Signature=be74f0ebbb89443bda4161ea3720cb439cd316a9c185faf376cc04aabb8f27e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZPVF47T%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQC5bGD%2BJwGMfdCPqat1VkBOoflVaw17Uxg%2BkVzZX%2BtUvgIhAILaGl7srMf%2B1tFe1UjBBwaPuTsLuJwWMWVpH%2FwgwDytKv8DCD8QABoMNjM3NDIzMTgzODA1Igxpnuefo%2Bw1dS2sSl8q3AOq49Z2JdX0lG0dyR5vtGjFkBXfO10%2Fus6sI9A%2BWKxfDved0sstSeY%2BqLmru%2FTtTvHrhxRmbd1DSc9t98CWAwfEPPbXkWuRaa8duF1oBWGYgkON7JZCmPmt8by5Prq3VozD%2B%2FhbLtfskHXVizUD4OXe829rRTH%2Bs7LivbnwzX%2FHJXpznI7o0z1ipKjkvScKzsA4axRZvLy7PYOgMaTE5MUOA%2BfEcxBL1kCGpgoouzHU7KgrOy88JuuURbfVJw8x8rs3oP2MONgVVnsYY887oPw%2BDRQ%2BA81lMfhdk7QzKOxDaZTlTAdrh7o33yVHfTLgC3ufnYIsOkDWS7FaEQ5bMxhS9Q63QsqcCyeIvsyAiENqeOF4lVy4ZBmg9gNjk63ukAAr%2BnonpQV9GjQB3ImW8rSC%2BvKJRtUFAJy8dOYfLsUZGhVhGJhPGjMRe6OjpIi8llA8yIP7%2FklRJO0FvYMqQJ2NvsiAfcOvklYWJYvXZYsGfaaREtBqplnqGkm5IIVY%2F8K%2B1sUzokBww6R80nKM9d7mohEcPgHQmWVmsFk1RAF00FfmVD1YKSQPEVGzCF0KZAPbn1876NIj2y7rWC01YRkCxP5ks0UYYtk3ftNaunVViffwieuURYVOzubhGDCgw%2BfOBjqkAcXmx8HgBfOeXA7igGJiKt4Od9wHdz5bSl98CRs6Qd4l9HxqSlfoVmRfAqJQdAxPk%2BSC%2BEAmK91%2FsayNB3DTOvg4TzzQL1v4D9%2Bo0BFVtG4DiwYG6bsmDG%2BbheBp1iEz62zdib16MDiq9aXlL4RA8iTOORR5u64%2BNla4iiGKu9LpTuBuiCKXy5bS%2Fcrmi7wY1MZ1vnyy%2BWJrlVOtEAz6Q1KqLmEj&X-Amz-Signature=c58603ed353928183048ecfb7e100bb225854cd58d768fa26796b5fbe118aa22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QA2X5XO%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIEnDz25u3bvohI%2FYSMLC2do64s73kkFPYpQkIYZUNPATAiEAryueVLmVdBmGfxn1C%2FZTFasSHXVFDAkZt4fJ8CeZ1Noq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDOjBapQL0UPnu91JXSrcA7HbwS1nFIT45xiFmLE7vlGnxIqgzgyC6Ot50c0uf9R8Hu8GBLBPuk7TkdsEe5Wb2buISicaqVLNFnAiSsIlVWLZ19MeTmbvt%2FekeDKMgKJ4dbWzXBqMNZ9jF9OR3FydlpG4H8uHYcsTJi3GkpzZ7%2BEaDKcbIWuHGTbjeySTHF02kIVUenYrYsBm94lUbx6g%2Fd%2BkAWFP%2Bf6a1Qg3%2FUjC6UVNXFI1tgnurTXWnisiS3hp%2FCNv99Njd93xeKmBrCHa0I1GgqyIScryPpxw1VNC3mi7gJxtzIh%2Bl%2FMKXAY1dGY9SRX3rkO5zTngL40185Xamkz0AN5zh%2BXL0zyjASsmnd87m9Tj3gzL9bZB28ttaLl98Hvm2Ovh%2BJ43XskZHZL1%2F9ys%2BNhYfMpB8J%2BQ%2BiVHYsU8QEQankIERu4qQrROOBmQMuA3C5eNtySNOdmlNQ%2B6QC5NXuOAfv9Z8ETPRLzfZQ6NgQBUDnUYIrkYluwExuWeBKTmBPGry%2FGfcm9HLrK9%2FeztGiVzD2eQqizcf1fIa3xHvuS9l93egasDXYE4k1XqeqKeh1B9tb9mCR3GUPe3J6KRE2xBi3hiAtcTY6xHILPVbpdmgxmsnPdzs0o5rnuDTOh30052nAAVz%2FqhMPPB584GOqUBVfOpCuShCCC%2F%2B0AT1S1YE9niNxWNNP7sVPO7t33cynFumHt9%2FQ%2B3x5Y2%2BJARt4bbLDD5OwD5EgqmY6kifIn9%2B4jpuBbI5qIMw0oIWyoAeH38SdXnXwWMd%2BfDUCRPfb7lCYTneKIYqfDWXwirHKVmzm6Wyd%2B7%2FGDOon%2FEzRzyqnKQeBpKfJ%2BOSHI%2BQcMOzabSkdUdmrGfJHgdYrQEGehcxZ%2F8BKKE&X-Amz-Signature=754d745f37098dae3e612d8dd7f7a38e359c944bfd690f1a4efbb072ad217956&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QA2X5XO%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIEnDz25u3bvohI%2FYSMLC2do64s73kkFPYpQkIYZUNPATAiEAryueVLmVdBmGfxn1C%2FZTFasSHXVFDAkZt4fJ8CeZ1Noq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDOjBapQL0UPnu91JXSrcA7HbwS1nFIT45xiFmLE7vlGnxIqgzgyC6Ot50c0uf9R8Hu8GBLBPuk7TkdsEe5Wb2buISicaqVLNFnAiSsIlVWLZ19MeTmbvt%2FekeDKMgKJ4dbWzXBqMNZ9jF9OR3FydlpG4H8uHYcsTJi3GkpzZ7%2BEaDKcbIWuHGTbjeySTHF02kIVUenYrYsBm94lUbx6g%2Fd%2BkAWFP%2Bf6a1Qg3%2FUjC6UVNXFI1tgnurTXWnisiS3hp%2FCNv99Njd93xeKmBrCHa0I1GgqyIScryPpxw1VNC3mi7gJxtzIh%2Bl%2FMKXAY1dGY9SRX3rkO5zTngL40185Xamkz0AN5zh%2BXL0zyjASsmnd87m9Tj3gzL9bZB28ttaLl98Hvm2Ovh%2BJ43XskZHZL1%2F9ys%2BNhYfMpB8J%2BQ%2BiVHYsU8QEQankIERu4qQrROOBmQMuA3C5eNtySNOdmlNQ%2B6QC5NXuOAfv9Z8ETPRLzfZQ6NgQBUDnUYIrkYluwExuWeBKTmBPGry%2FGfcm9HLrK9%2FeztGiVzD2eQqizcf1fIa3xHvuS9l93egasDXYE4k1XqeqKeh1B9tb9mCR3GUPe3J6KRE2xBi3hiAtcTY6xHILPVbpdmgxmsnPdzs0o5rnuDTOh30052nAAVz%2FqhMPPB584GOqUBVfOpCuShCCC%2F%2B0AT1S1YE9niNxWNNP7sVPO7t33cynFumHt9%2FQ%2B3x5Y2%2BJARt4bbLDD5OwD5EgqmY6kifIn9%2B4jpuBbI5qIMw0oIWyoAeH38SdXnXwWMd%2BfDUCRPfb7lCYTneKIYqfDWXwirHKVmzm6Wyd%2B7%2FGDOon%2FEzRzyqnKQeBpKfJ%2BOSHI%2BQcMOzabSkdUdmrGfJHgdYrQEGehcxZ%2F8BKKE&X-Amz-Signature=fe435bdd08cbf5be76b8962735f1e8f4690042fa61c7a0d1e549208395897fd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HRZYOXA%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIEOijnQ1pdHO8QOB9vt8sMhOcy3sqcBpnrY88Fv4lZY%2FAiEAm5zXe7VGQlR%2BYtFP9Szx4foKTfkCPzsfOQ4NHOSz1Qsq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDMXY4yTYjocyY2%2FOUyrcA%2FXHvG6L7XVna83VCNg1xZ03eneUnLZgf800KUhOMjuVOfrpVUWlsmL0L1%2Fwn1R9oQRG6qjFdpK01cZqjGjtsK%2BXWANObSKMtfyZF8tYO8AVp3bvo0YQGqggmQ4n8RciCQ34Y%2FkJT6gnKyY55Dq8gUpm71jWixFidh0CvBb9LScQNH7T9TBS2%2BNzQMM8iYfBXNa6HoyWH5aohYu%2BPiLlKbA1Ac6lDot0L8IgoJamaMAgYH5BlU6Sre05Dhunz%2F%2BXOPN0V4DkmsCNni%2FQ%2FfTjXv0XfjMe6qF9yz9vANdZkCVYGvIsmqdsZMexQ7ldQNWCwlHI2E5N1tfHrDzZ%2FgOTIujbJnV5mvj37Nw%2FeRVW81zXcipvxWFL%2F7yyCBuXyKWoZDX82Cx%2BK6Nz2YS%2FXb5VOqvWpbMU9aTO12Oz64lyOe5hDiW4iQE3DIbPPYJCpXR%2FNybumzDn9duNKVcWKSHFll9WtZ5%2F9%2FkVvlD7mq67mnu9z5S0FpYRGo7KssIjwFIE58j8kdIaOW4wHXpLRA975G3IeT97tFFGYC8MKXTeOnTLrAE564lepI5qIeRRNHEcpYfbjnBFW78ZCwnZVLv49IENAX63ij67ij7UiLeiVc%2BXWP3bchNPEpc4dB7YMLDE584GOqUBoVuB0MBw1mGFhAgNyH%2B4SkdlOUMkEGTcs7Zr%2FnbWGGTqQk0TU9tgbljpXUusFqcfNpJG7WGwFFudfX0QXh7%2BIiFac2ANJ4B5NHdnCWH6xAyUGMAbUe8wPOoB8P6Cquz28R8UFoKckSTSr9XDzYp6YXnd7MeRn%2F0ezHZllNA7GYB3XMQS5OGUvpe9Yv5bUEEGCdRHNBLruxfOiDKR5%2BQfXrYgY59E&X-Amz-Signature=a0020fbc1c173a4fc62d500ec5fb8adcae4f0c778267a103bf6947a877504f86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVBJ3FBE%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCID1nVzYRoafoVVk1Fl6HaduRLLwRwkVTNlWZkkXeQqvpAiEA5SdyzUpWItEtREbbhkPz6eg%2BxqK4DAgxgNM13ymFWCQq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDItGdkOa9%2B8BXL3W9SrcA6owVmSCHVWGMwgncSLCDuKSF1IwGy5mjPJsg2HRYvmt4AyuJR5QC7FYwbBtE8AvC91npOG0PY%2B3ca%2F5y37Phxohm0h1lyaBVVr4iMJTdo3gcbRF%2BMcwpZQ%2BYkKZfQiEVOuPs67UW8s6Hrg1D3LDJpPGnjxnuZH1tv5iCJQCnR8%2FhLFCsV69wLLhX1Llh5GAnGbg%2BTg8e78ycNBMycv%2BXh3us0hbhjO2UosTFM1vYXL15aaeDee1vsMwqs8P%2BqxH%2BQYzW54%2FZT%2FQ%2FNTh8%2BE4FTe2YzDJ8egvCnMsX1wDNg2IbO2ZEV6K9tWWOLYAd5itkqKffc7Bdqr4HiNohiHTtQL7RPRWVnW9eAiN4HkAUjkj%2F7FM3faB9XUSMGASkt9zziNVRV45lPcB9nOrgn6h1YFmkGEMj3PmEzORsf3f%2FDK3PZEsfLy5tbb2NmCUznrVd7AQEAKican8BLYX5SCl512DKVdqdK4xKN4K6iuMnpgQ1oZgwjnNx5zNrLkuvBO7YfpuVJorlfOcswq7K7NHUkVvZa%2BpVGXfZxyVle0Iq9sXcSB5UJrbh6zftWniITsWBjbQeQFRlzB7JfLLYBcAh6l%2BRmD43U%2BFTKWdQZ4g6MpsU169W03qDpBH2r1vMPTC584GOqUBxWEnDQvtvtwnQKL10nSuK97N%2FjJ7juiEP99IxUgb%2F0tAvhVCgCvagVyIcYciky3LGPlFtWzUgsP3bm58rLhoGRb1NeDc3qBgmcOYRm87KrZllYH9nT%2Bl2DG4M50OWZDu1Ejk2n2O2YZxth21HC0QF5LpJUa%2BtVTBi3vQWWslTO9NGxbntpae448%2BtlYGVMfOVXXFOAdczEeRYo7mMSZMLDRllk4A&X-Amz-Signature=0a0c26332f0f5fe4c168dd05f60ec80f93332fc2a8fde87840c874232a3e91ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRNPVQUU%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCF%2FnKaO8A2TB7VmcvmmHViwJOl8GoS1n5Yt3BNqo5TEgIgUYItLPiXLbLGYK2VN37uVS8ojPRCQ7dckbiTxFt3kgEq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDMXL0yYTylEJWLDMRCrcA7HtEu7phfplPqcQl86IzxRZqtRoQzK3qWpIOA03u92wfjnstMN4bMUQb29cxYWhn8ebDD%2B3wlZ6wSFqy1Psdc0QhORFY8XueHUpThLWfo3J0O5iDfzMCwqijlw3hkzBDxZM8dsbka0gIBnLnjNUajdJjEWzqEWK0YYdRWdgIJo0FxT5e2cXKq5yO%2F7EEb5dJe3YkKPJaofQZN86vSiCxCV7GADRkNqdjD4HaEMO4Dhjv1mXwwmUcftgzxZfezy4HbiD9fedM0%2B9TqpQGT9of%2BHhzvE%2B%2F9e%2BXUQt5NBEIpiPMRf4LvqS5zQLOQ0qwKqrV8RhFXyMrL41KVrhlhQZzeQRnF2FuMcWBjRqQsaZRGxIvrm5Vu6bWRE8%2FSg33N7Tv1qWk8AtqFQwN%2BfnN5%2FKVJic1yFsWBo6Y5xqC7Z1sII2PjYs3FOAqGdqdMS0BLID36YM1D2QZgf0uuF%2BSidDPh%2FprdoVfignqaLTsDL%2FrfAvF4uQUxnTfEjbUw67GAiVQl51hXtOGDbg8HYoLv8dba6gMTKTqQtFIoNyRIXYyOQ7%2F9c%2BqEROlOTq3KMfQeA7tHXLIPDxOfZ2hwF2%2BxsHtYxd%2BQZ%2B3QFSmneF5UXlJkTdW8hXfTM7qF62XgI3MNDD584GOqUBM9NqiFIFMtQFheXuJ9XHAzwDmIXmLaJtz%2FY5xuF4BBWsxGaMj7yQOvBoR1DgpBizOrqqRq26U04%2BnF0nVtzz%2BmAArTcsSoHo1yZdPmbpYIzwrgA2aEEjvgl63%2BjT5xqKQNP1nUmcyg8%2FRz%2BAIjUdvl3aqA%2BzDbrrDjOyaJW5Em6SfhM0Q805pKHBa4k39OhV4WCSMETQ%2F5qiq0VAQjOHtcPgPMxR&X-Amz-Signature=54ed4beea52533eac555d0724aebbac9efeabfb9f4415efe3e2e1a333d9d609b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCOQ5UXO%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIE8PIHh8I2IbwpV3rfAAYIZejTRPFOotHVGqY%2BO80FJMAiBBvpwofhmn7KVt41M8657eF9yGsCP5%2FC5gMGyTGakzmyr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMnoELFInW9HVka32LKtwDiTtcVsy8ylJWx5fAI3MXqfLBLtTHieC2xfn3eI%2B6%2FrYBdx%2BBWhGHCq7B9DOFbBO%2BCJZtjWvkKtkMSjv5jmM8t0fWTklopn9mVrgfZBtmwh8Ed1%2BX7XSimufCWYTm1UDK2LmFQaCFFMEeaNvsHOYyYlf4768qIqTQbBBhy3t%2FWX2ZUg3BZWEKD%2BpzxmjZMHG0JfjmbBYPab6pUWF0RO1QwEjBK3kkhY6PZHZkzAiURv%2BtTKyj6i8CELIpU4AF9JT252PckCbYMS4ZrwSdSNIvGT7Xg8u0sXUnzFW59ED1ECtZF%2Bxf%2Bxjs5m2oyungkasUbG%2FI6%2B6jiYrMRBbe0MEHkGAXZyKxm1N59%2B8BE6lyDLE81kXnn%2BtMBRM2Gjy3vfkJcXQ5zy4f0v4Shk0AI9ijA9Ep7%2F%2B2KwzCl5Meo9HWMv5Edt3UGNESty%2B%2FBgHXmpJMOILzacnw%2B5upg0qT%2Bw5YNYA8xW5acUd0gY2%2FnQhbVfEr5D7IwVt9bS%2BBQ9SWRRHJ5KoEV%2BgPBoc%2BTuLMIcwcwuT686k53rU9jbEle1FK0aqSQvWtS4SraLChLxFzJsonN8fiI5ewBvietx2ePGSQ8mkpQCWEINR3%2BsT%2BIjhe5vG2B2jp1H606xywCNkwqMPnzgY6pgHANBSykNfk8K1DndpjrbT87YoqGd%2FZ9sYI1U8o97lxPN7FFeLqWfMKkDAs%2FDOSc1rwg6qco6zH0Q%2FbQAIomXVQcvdYF6A56Y4%2FrGmsQWEDPR5c%2BSvJeMgS9ebnH2ce928YxBAz08q5j15JmvimHfK8Zc%2Fbm%2BfxpdNbWFinVE2oCmX0i9L6m%2FDOjUeZArZnm5hJproJ7CQKpBAV7qpW1CxGccNwFcEb&X-Amz-Signature=8595a046f1842ba06cabaae0922737928ad9b440b7909e0c6ab2dc618b3bb639&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCOQ5UXO%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIE8PIHh8I2IbwpV3rfAAYIZejTRPFOotHVGqY%2BO80FJMAiBBvpwofhmn7KVt41M8657eF9yGsCP5%2FC5gMGyTGakzmyr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMnoELFInW9HVka32LKtwDiTtcVsy8ylJWx5fAI3MXqfLBLtTHieC2xfn3eI%2B6%2FrYBdx%2BBWhGHCq7B9DOFbBO%2BCJZtjWvkKtkMSjv5jmM8t0fWTklopn9mVrgfZBtmwh8Ed1%2BX7XSimufCWYTm1UDK2LmFQaCFFMEeaNvsHOYyYlf4768qIqTQbBBhy3t%2FWX2ZUg3BZWEKD%2BpzxmjZMHG0JfjmbBYPab6pUWF0RO1QwEjBK3kkhY6PZHZkzAiURv%2BtTKyj6i8CELIpU4AF9JT252PckCbYMS4ZrwSdSNIvGT7Xg8u0sXUnzFW59ED1ECtZF%2Bxf%2Bxjs5m2oyungkasUbG%2FI6%2B6jiYrMRBbe0MEHkGAXZyKxm1N59%2B8BE6lyDLE81kXnn%2BtMBRM2Gjy3vfkJcXQ5zy4f0v4Shk0AI9ijA9Ep7%2F%2B2KwzCl5Meo9HWMv5Edt3UGNESty%2B%2FBgHXmpJMOILzacnw%2B5upg0qT%2Bw5YNYA8xW5acUd0gY2%2FnQhbVfEr5D7IwVt9bS%2BBQ9SWRRHJ5KoEV%2BgPBoc%2BTuLMIcwcwuT686k53rU9jbEle1FK0aqSQvWtS4SraLChLxFzJsonN8fiI5ewBvietx2ePGSQ8mkpQCWEINR3%2BsT%2BIjhe5vG2B2jp1H606xywCNkwqMPnzgY6pgHANBSykNfk8K1DndpjrbT87YoqGd%2FZ9sYI1U8o97lxPN7FFeLqWfMKkDAs%2FDOSc1rwg6qco6zH0Q%2FbQAIomXVQcvdYF6A56Y4%2FrGmsQWEDPR5c%2BSvJeMgS9ebnH2ce928YxBAz08q5j15JmvimHfK8Zc%2Fbm%2BfxpdNbWFinVE2oCmX0i9L6m%2FDOjUeZArZnm5hJproJ7CQKpBAV7qpW1CxGccNwFcEb&X-Amz-Signature=bf589f3cecb798630096dfe184b925f7c53b73abf30ba726d3428a1ae1e21b02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YMDCSQB%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDtapwwf2ZQhN8cMR1Ssxw6yyMsePSeMQQiWHsDqghnVQIhAJLs5sjimYi1Oi3x6c2y96MbtV8wUrZ%2FoNq8ccLWxe0YKv8DCD8QABoMNjM3NDIzMTgzODA1Igx281L1zzQOpTKQ2O0q3AOZih89T5AsgPv9F1p10J1%2BPjNXkBZQVPtRvjk%2BmvXkjldtozFVNjVtZcgwNNU38cFZ%2FVyWuI8qQUk%2FMKDA1DVYfxFtPFfa0IeAXHIhs%2BWfOaSbZfecFyA1AtfK9b2nwDmQ45QY%2BSbofpDNoMbZk4BKHyGZQvzfW90DIOlzXYUXf0D0RzCmlYKbD9gbrTYX3XZcF1%2Fa9cdhWo0u42i7sawEVGdPKL%2B9E4%2BTw6Kiz44U3RZaA%2FM1YH59E3%2BQUvifElWegAsYDAVHxMqCeEivREO7EEOoEs%2BJRvwBOIX%2B00mR2ZrHBt1ItGbL2Q2%2BArAz4IBvGC9Y%2Bji1gOeah%2Fkte9IMeUNm2mcp7qFvqVv%2F7g4MI1Bn3dRbM2TdObJsKLsJDEFcc3jPt7E6Rf2IiZUOQDt%2B4AoXljJrsK6ASFIBdb17WB1Hj2DPUMUCA%2F1JCwpdnq7XIZ5K8fdgGrSuSSpnvIJnJZNJJVnGTM%2FEU2VY1fPBVx9Yn6jVFpzdV1FmTubF6AtdvH7frTgxzm%2ByKlosMpbbdqNP%2BprMjFs0DGd6P%2BV3tmcTjOTPSpMXL19r1fcSAYyTrEQ6k%2FzhbZCeEzCG6p2j%2FLeTW0C8vGNS%2BUN13Oo%2Fgg3P8uuxSm5vPyrKbDCExOfOBjqkAVgTxDUzAUqgbC0GEOFsnekPIZAUP81fX8fSPsCqxrPMMC0ZcrfgBXsvxrVnNGWK6ddArpsB2n8HIRkaqNInctwwGITgQ3RY7NFiZUi7e1JLLxDOnaAAYJ%2Bd6lx461EuzoRXK8qPNN%2BtO6OHLJH9VgeDQrcqmCupfjT179GnP4mekZEGKRvNrUrDe%2FsLCgtbvPDNnXJU3K9V2IMEM5FiUpA%2BOMPf&X-Amz-Signature=11f113b28f93447bd79de5ab778a677f2f7b9c8a4f350905472a92410c83764a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIQ3UFOC%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIFoTdGkhObGEZiImy7%2Fdpucb7ZWKFw%2BQoXIVnRvxNO9cAiEAmpINTqCRX9%2BImf1g%2FrJ%2F45R8wMBq0mtiE7%2FdhnAw1RUq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDKEGnAtu0yk6Z9lHHCrcAzYVrboCNb84HZjOHIJixzDsLDIAyvjipfX0kYfiM%2FhEjk8Ie13TC%2BEztZ2qk8W0AAVMUkjmKyLugS8b0QX202UqW2HZVhS7IQXyZPh2lKVIco0gtGpK0yA%2FYHYPEifYV0vNu7W6%2FUdCih4btKYdLxE%2FwufbJ7XdBmHpmDRGbh%2F0Glq0clcKbbxLrTxVwGdx%2BnWM2fWEEsJEItdVWTBTqT5lc0E3XsyRADMVxWbWNCTQK%2B9GhHH8ZrZ6OgW5NWxsIy1u0DTXPHpdqKkfVoWmXBgXx6y5vKVPJvJ26csv0L1EdL0wGeUhe3t%2B8KyBXEHm1BT8pPGUQ2%2BxV8ZGBDNH1YpgO7U3np4xHmOzPhWxUXmpLk4GlYHucclYziP05AVywwDbU9JwznFib9fJia4EuQeXgdmdmi%2BtKlg7k2BmwZCtq8LAULuIqo3Fp8BeYU4QCw7W5%2FvuWBli3ggiVOB4Md9fnqV%2BorUWZtVzAOOTfoRH9LZb3Hq9MDzMAOoeO5exrQ63L0FcLsmDtB1zLWpRikCiaIE5kXSUJlJlkAw8ml29DT4jHlwltyyKosPsOq%2FYN9WwolCTCieVKS4BVj7rZlCfHVFCSMTxUEePmS138TUlm56pp%2F0ZCTtrUBcKMJjE584GOqUBzx%2BtsAZPK8%2F22l6LxtqZ9pvzDBu8JmAl8A5m9GVE32iFx7DtSiKzwjVxa3brUjKgvXU4aXmwZGLMp2MnvRsjahf3xyI5PbQQtNkXnzfp1XhEZ7JuNR6H6qoBft6jZdB3WsGjFJKiXXkapStgGZKs0HVgQ3okOlIl0%2F1%2BnHop2WPUsOUVZ2GBBWf3CEtTn7cyfMImVcN8I9Bb7yzJHlMfVYl2vg%2BT&X-Amz-Signature=45f1e4840c1a7651a024d908dd499a9248903709b182cda6ded4688a9801a584&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIQ3UFOC%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIFoTdGkhObGEZiImy7%2Fdpucb7ZWKFw%2BQoXIVnRvxNO9cAiEAmpINTqCRX9%2BImf1g%2FrJ%2F45R8wMBq0mtiE7%2FdhnAw1RUq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDKEGnAtu0yk6Z9lHHCrcAzYVrboCNb84HZjOHIJixzDsLDIAyvjipfX0kYfiM%2FhEjk8Ie13TC%2BEztZ2qk8W0AAVMUkjmKyLugS8b0QX202UqW2HZVhS7IQXyZPh2lKVIco0gtGpK0yA%2FYHYPEifYV0vNu7W6%2FUdCih4btKYdLxE%2FwufbJ7XdBmHpmDRGbh%2F0Glq0clcKbbxLrTxVwGdx%2BnWM2fWEEsJEItdVWTBTqT5lc0E3XsyRADMVxWbWNCTQK%2B9GhHH8ZrZ6OgW5NWxsIy1u0DTXPHpdqKkfVoWmXBgXx6y5vKVPJvJ26csv0L1EdL0wGeUhe3t%2B8KyBXEHm1BT8pPGUQ2%2BxV8ZGBDNH1YpgO7U3np4xHmOzPhWxUXmpLk4GlYHucclYziP05AVywwDbU9JwznFib9fJia4EuQeXgdmdmi%2BtKlg7k2BmwZCtq8LAULuIqo3Fp8BeYU4QCw7W5%2FvuWBli3ggiVOB4Md9fnqV%2BorUWZtVzAOOTfoRH9LZb3Hq9MDzMAOoeO5exrQ63L0FcLsmDtB1zLWpRikCiaIE5kXSUJlJlkAw8ml29DT4jHlwltyyKosPsOq%2FYN9WwolCTCieVKS4BVj7rZlCfHVFCSMTxUEePmS138TUlm56pp%2F0ZCTtrUBcKMJjE584GOqUBzx%2BtsAZPK8%2F22l6LxtqZ9pvzDBu8JmAl8A5m9GVE32iFx7DtSiKzwjVxa3brUjKgvXU4aXmwZGLMp2MnvRsjahf3xyI5PbQQtNkXnzfp1XhEZ7JuNR6H6qoBft6jZdB3WsGjFJKiXXkapStgGZKs0HVgQ3okOlIl0%2F1%2BnHop2WPUsOUVZ2GBBWf3CEtTn7cyfMImVcN8I9Bb7yzJHlMfVYl2vg%2BT&X-Amz-Signature=45f1e4840c1a7651a024d908dd499a9248903709b182cda6ded4688a9801a584&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BCIIBX5%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T074035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDZuFQwFBezFOLwohLHufN35O%2FSiYCIosH3Xono3VK00QIgGZxt6fq%2Fll7QLw5s2fC1a25ybfXEqXvGN1ifkcYXBwgq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDC3wanRxZt2DScro5CrcA6tVf6d3sG%2BN%2F%2FU1Nfy7XoJ%2FiIsWKp3ISGO%2F8DL6pY9sgTi5xK8QI5IF9nKqdWMTgHwwKhnmqui2aaYLzTlFdcNwMjxM70uig6VMRZlIRPZBWtJ6zuJBjdJGnVQN9Pgdqi0fxD3ucICvBk4%2Bi76jl4sXXuANs2bmOvCvGWmSpKeRxI0yVZFrn9P4BMC8t5fUpc%2FWUIihpfiacaUKHlQo3CVzX%2BVpP6NEQ9ep23SSj9dsQ1LMpQoKKzxB8he9m30lngLNmFzlKLLt7qSwzZsFOk%2FOJ9NRHGD%2BdAGgc4c9cQa6mdw5oySf7wX6kHzMje5C91Wdpu7d1IXYg%2B5SijTnmicB1nBOIAU6sp8clj7r8q%2BQkw4jmg9A1ldJLErGx3PzDaIRnJYMylUDamHGOiGFqm3jL%2BG2gyf7%2B%2B9MgaivSa5g6q107e%2FG5r9%2FiROtK25sF5GoIHIHgJLh4HVvYNcDe4YSayYQRDB0cEY2HNx91pdoOIir0vDLyL1yyD5UGr2LZJQewPxB0vuBiaovsN8hwo3s81j0PeK6pF5ZG6WAWwGP%2FHThicqXniwZbmZ6ntM9IBbio5a9sslETEDKO6DDZkWRIdbY631Moc607G3oUZr%2Bo7JuIySRZAk%2FNeaAMPPC584GOqUBdOUvCUxIhOIewgSMyMXo2Fi8mDSTO%2Bcnk29Xbd0beNPOPQBkomEmwTimxQZutpOttLtBM8ze8nTmki%2B5ceA1bYTFDidTB1LEN%2B5JY6KsyR1lCat1kb%2FAL5lGLbtwktg%2BRA%2BFnQZucVgfBVuK2yLwEkOhXfGNOpgonLek93oLtvJtCGO5Hz9QcDjPlRc75v8qoen5PWwwAjpWgIOF%2B%2BE9NbNwUFVv&X-Amz-Signature=4b7b84c9014c25caf0fc5193f991458a6bddc479ff7dc1c4b47c2fb0d52adae2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

