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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJJYYQLA%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T201952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG5H25gSoqmJw6A1Cd0WeB8TdERNZdDM57HJ7Tmx4SJnAiEA4SBmH33Hf4T9aUxWNcuRo7tlKkE1oBSGeNpcgAwUaooq%2FwMIfRAAGgw2Mzc0MjMxODM4MDUiDNvV4%2FY7nuMvznpwSSrcA5fISwz%2BkvjHJmua24nfzfmbmXd6q7BV6lhzAXmfyXf%2FuuD%2BqP6p2tHJTj83Ea%2FvObIaWwsdRzRzpJAnDsHkqHTZJEiChBeloDVPgKWXViSIdmHG6pQqeDyG4Uvf9pjlCJW3385mexZXFqz%2FxRiOsVdOXcjkMSubAcxKgrncRYouEt34y5zn7K91SPJ1zh%2FqpYc9JXSQW1wU%2FkFQppBlZPeRnvRanx9PE%2FO0WF8hT66ZEjZoLk%2BvyufwOZBqMV6brkCAcwJYwBeFMPEoeKJ3oVCFNbugxmUXh0NmO0pjqZZkxruiNDB1mrTRILw%2BU2J6JQbikB824vc2tcjrYQdmCt6NwLlfTq82TuIk5yznlywbM%2BKpsECIc370UHJETAxKUbo%2B7M%2FLEGU9pOGdwknulpDThXl6do8DKnkpFdPGoCDuIEwAr%2B9uTiIzUCCd4UphHKDsc6gzcqwoovTGb1CA079SlNyQ7KLVHs3yBvxH3pujPp2lpVmYwJqdI6wcxkryE4cCLjmCWViPsLt1hkgaH5nzzXy1gUDBOxRLrqzXAmiWhzFFHHgCN5J%2F%2FhLJVk3QuFEsb9jFiIy5d8u3G63okFfOCLrfmTgkrt%2FfujFpXA2fStjt%2F5pg%2F6P4kybHMIaszM0GOqUBSl1T4XIDAMgsQy1vi2DwPcoSBKT7JfFfdtwe7%2BF5o2l1gD5uFZ4jz5pu84bODtN2F%2FpYN8k5tFdbjzN37b1GT8FooAGzJ58rMKb8ymzUU83pklOrwnx%2Fc8PUsZ7L8jJpyS82k8GL1l9eSBrujE%2FUC%2FyMkir2bMeU3r9xpNqTYpK9evRPs%2BSEJMDtyG4Yo85GrfhIYEfOdi51DMO2gmL2DsBn1BQZ&X-Amz-Signature=6091a11c0b0c07ce970143cd921b0ca5e9efe673b9625535d254ba12437bd0a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJJYYQLA%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T201952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG5H25gSoqmJw6A1Cd0WeB8TdERNZdDM57HJ7Tmx4SJnAiEA4SBmH33Hf4T9aUxWNcuRo7tlKkE1oBSGeNpcgAwUaooq%2FwMIfRAAGgw2Mzc0MjMxODM4MDUiDNvV4%2FY7nuMvznpwSSrcA5fISwz%2BkvjHJmua24nfzfmbmXd6q7BV6lhzAXmfyXf%2FuuD%2BqP6p2tHJTj83Ea%2FvObIaWwsdRzRzpJAnDsHkqHTZJEiChBeloDVPgKWXViSIdmHG6pQqeDyG4Uvf9pjlCJW3385mexZXFqz%2FxRiOsVdOXcjkMSubAcxKgrncRYouEt34y5zn7K91SPJ1zh%2FqpYc9JXSQW1wU%2FkFQppBlZPeRnvRanx9PE%2FO0WF8hT66ZEjZoLk%2BvyufwOZBqMV6brkCAcwJYwBeFMPEoeKJ3oVCFNbugxmUXh0NmO0pjqZZkxruiNDB1mrTRILw%2BU2J6JQbikB824vc2tcjrYQdmCt6NwLlfTq82TuIk5yznlywbM%2BKpsECIc370UHJETAxKUbo%2B7M%2FLEGU9pOGdwknulpDThXl6do8DKnkpFdPGoCDuIEwAr%2B9uTiIzUCCd4UphHKDsc6gzcqwoovTGb1CA079SlNyQ7KLVHs3yBvxH3pujPp2lpVmYwJqdI6wcxkryE4cCLjmCWViPsLt1hkgaH5nzzXy1gUDBOxRLrqzXAmiWhzFFHHgCN5J%2F%2FhLJVk3QuFEsb9jFiIy5d8u3G63okFfOCLrfmTgkrt%2FfujFpXA2fStjt%2F5pg%2F6P4kybHMIaszM0GOqUBSl1T4XIDAMgsQy1vi2DwPcoSBKT7JfFfdtwe7%2BF5o2l1gD5uFZ4jz5pu84bODtN2F%2FpYN8k5tFdbjzN37b1GT8FooAGzJ58rMKb8ymzUU83pklOrwnx%2Fc8PUsZ7L8jJpyS82k8GL1l9eSBrujE%2FUC%2FyMkir2bMeU3r9xpNqTYpK9evRPs%2BSEJMDtyG4Yo85GrfhIYEfOdi51DMO2gmL2DsBn1BQZ&X-Amz-Signature=6091a11c0b0c07ce970143cd921b0ca5e9efe673b9625535d254ba12437bd0a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2MP42L5%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T201953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEv7GiA2L1VDULdfJ2CpSfbVJ7SZhTj4ALQE4icUkzPqAiEAib6x3A78anDLC05YjthXw2aq%2Fhy2u%2BK8pOVGHoNvjBgq%2FwMIfBAAGgw2Mzc0MjMxODM4MDUiDMNGyn5AJGomad2dlCrcA11%2Fy8tApkCKxHAhr1Yp79ylOqsela%2BfXvkdt3cKI95rWICv1rxbxaySEiu4ZzCnHN6629e%2B%2BZ7WgR96lXN2vIw9sqOEbl2snuyt3%2B%2BTyORcx7opHZZCAdgMNmvHUBgh7JFIIBt3sfoCTg4%2B1SfB8pKYAiGW75GrQcyo0OxuRshd7nkvsODzvIENRrCcQ6Xif2FXXiyDN%2BJEJtDndFoAp%2BDNNPI0SRdY%2BemPlRuRC9JnNPye7YhLo5GuUH36dB%2BrkJmoGBDpwqOmi8hNxfS%2B80sqLL8LCYeIN7xOhFEBBjDtQk2QRtUuOGIzfZxXivuljw9XGW7MngzBQUdxIQU751X2g1EEuh5KBCwMzLNzt8vo1LQkq0fROCMNdg5yxYqmfkmTgPcxX811jnL8tS8P%2FTg9fuPPDVw2E6SKJPRcMXxwns8zGG5%2BUt99T%2FFLeGcgtZW2n2ytfPT7Pzl3mHKK2gydaI9vu9SRCI8TLoFI2seENQcuhxs7iUXl5QvIsqvTsaORAJ9gJ11OWra9zMts%2Fp8j5%2BrVTejSbM9Jhc8sfXdERvk0xlXjr%2FPOcBjzakFI91TVMe%2FUl1vza%2FDPQMdGSsdWLikxDgvX2tNRv%2FxZF1OYJpqoqPXGBzSb74JrMMKLzM0GOqUBQVuyW5TyVC2GiLy2VezcrSEr2%2FYUiEsl5KV66Jq2yeqliwPbY9glh%2BIP%2BHkVCgZ2RcoYnOungdHtvNJCl8EFgZYogdrbmmYXlsoadzrG5e658xFbpOYWbGqMpk3N28T%2FMFeqlP0FGvqTkCePvfy65rQzMc4diHUlaPcaEt4kmAMYlN3%2BRbH77LaW6RxW2M5sdnJW5EjNTS7rNhJCfeH7SZ9uXRcR&X-Amz-Signature=b367460fda8d81933416e0bafaa37c8fb61f87e9bf1e584632cae8e73ed7baf8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXFJ2GQO%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T201958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDVXaVY%2B38YcBFlPSD47n1Y5rCtFMXl9bfdwiyS%2FUk0LwIgOeP6wIF%2BTFXGpIhM3xnt7Uzs05T3pMuhlYJ557%2Bv0pIq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDGUenSrErtkHC3wSFSrcA0uDbh2u700L4vlmDteB7PpqjHmUkSf54MXtQ1jYSiPS810RMrfA%2Fd4B%2FTxxdFrns8ark9BRIpRkF8ks9GW1b%2B95uXYWsEjFvE78qw5fMsXQ8V5UxBJsfT1nBiAI3Yw%2Fbx6auYdBLaZf3dkzHUCr%2FadcL0ThL5yyRUO0blkmlTiIaEF8aPX4ZxKpvf3fvzcgSD4mofkuWJLqZh9vbLiGCvHpzZFhL6lq1tqyG45Qgy7%2BMm%2FdqO2gTHUpfLRO%2FPlOaqElxUIy%2BL5BAA7P9Vry1Su5K41FPhN7x8bPYvj7Jg%2BcG5iKJmxaywkt5f43jW8W%2BmXAemfgKevTm8SQmDanI8BPXy%2BSFmh8gZjpZ8rwhXVg6039DZu8rntOoHJfvuIQ6IJ8QF39rbQ5IKL28Qzlwg3pHay5PN21sp28Vao4tR%2BFp5VXh%2BI3KhmxRik5Y5DtO71RMXWl3NZqi1SwuehkZEOXPKLKQavwGMfVhV2FqXaCRZ0CVIOjW%2F2W%2Fk88cBciFNW7L6qCGRTjP44xoMnofFi83dam561tdLiPNevd5%2Bgjvw6MXtzplDAN1xEwusZ%2FShEO2uaLhMvY7eiRRKmo74k1taYwMNYAP6VN%2F0o8OW91AfVmZLbAdaT98YQPMMPly80GOqUB85mpC%2F31DSLNlrICTZ6I59pf7MsfwUaFakaTtczL2skVIc8Ni8zB3pqrE4r4DjnZZSa7vHw0UE9NDY7v3jxvUnupuUm62s4X3aApKqlDxU5km%2BmlRumej1LuHBgCEW0YY7AXDLKhvjVdwNr0a9cg9DySFnh%2BMdte0OchPJ97yd6KMyWzqBguTuocb17tjkhi4MOlumz1JxgTHRXwPUKfXOKBqbNX&X-Amz-Signature=bef2480c49d9e23a4565f2151938178e53ff02283b95a6f3e70e2f4628e34d5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXFJ2GQO%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T201958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDVXaVY%2B38YcBFlPSD47n1Y5rCtFMXl9bfdwiyS%2FUk0LwIgOeP6wIF%2BTFXGpIhM3xnt7Uzs05T3pMuhlYJ557%2Bv0pIq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDGUenSrErtkHC3wSFSrcA0uDbh2u700L4vlmDteB7PpqjHmUkSf54MXtQ1jYSiPS810RMrfA%2Fd4B%2FTxxdFrns8ark9BRIpRkF8ks9GW1b%2B95uXYWsEjFvE78qw5fMsXQ8V5UxBJsfT1nBiAI3Yw%2Fbx6auYdBLaZf3dkzHUCr%2FadcL0ThL5yyRUO0blkmlTiIaEF8aPX4ZxKpvf3fvzcgSD4mofkuWJLqZh9vbLiGCvHpzZFhL6lq1tqyG45Qgy7%2BMm%2FdqO2gTHUpfLRO%2FPlOaqElxUIy%2BL5BAA7P9Vry1Su5K41FPhN7x8bPYvj7Jg%2BcG5iKJmxaywkt5f43jW8W%2BmXAemfgKevTm8SQmDanI8BPXy%2BSFmh8gZjpZ8rwhXVg6039DZu8rntOoHJfvuIQ6IJ8QF39rbQ5IKL28Qzlwg3pHay5PN21sp28Vao4tR%2BFp5VXh%2BI3KhmxRik5Y5DtO71RMXWl3NZqi1SwuehkZEOXPKLKQavwGMfVhV2FqXaCRZ0CVIOjW%2F2W%2Fk88cBciFNW7L6qCGRTjP44xoMnofFi83dam561tdLiPNevd5%2Bgjvw6MXtzplDAN1xEwusZ%2FShEO2uaLhMvY7eiRRKmo74k1taYwMNYAP6VN%2F0o8OW91AfVmZLbAdaT98YQPMMPly80GOqUB85mpC%2F31DSLNlrICTZ6I59pf7MsfwUaFakaTtczL2skVIc8Ni8zB3pqrE4r4DjnZZSa7vHw0UE9NDY7v3jxvUnupuUm62s4X3aApKqlDxU5km%2BmlRumej1LuHBgCEW0YY7AXDLKhvjVdwNr0a9cg9DySFnh%2BMdte0OchPJ97yd6KMyWzqBguTuocb17tjkhi4MOlumz1JxgTHRXwPUKfXOKBqbNX&X-Amz-Signature=742f5606792f2f6733c61534f217ba00190fb8a2e89b96df00944a140209e2b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2LDGKRV%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T201959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGmq0dirmCQlrDnU0jxVAxUqwhzzE5d7V21S9l5kNFgFAiBQ8L1Ny7DagvAY8vxO0ZvOneSH5BjV7Rl4MHEI2oZU3Cr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMEfFNs9lwMMbWuXm2KtwDgYM3Y9MKfc63nj%2BDbYHqbhBxlBVu8CnqBuROKyvjbcQ2Ai7AXAw1RJzBXX7gc3ZacxVDXKOA3b9QBSn8DFNqJdESIdSWmw282QiixFagCIzDYVS8gqeW329yWLmGiM%2FU%2BDpFwc61IEmA8qHVrP5%2BMkPYIi9d96PHgPotkHzKkIRGuXn%2FFNpv%2FnTuVSGNKGA8nyxOXNAzZVzrE1rzNefHArjLd0W7lKbF266GRy10wX%2FIlbRV3L3E%2F4EHrD8pIPKmLPmhbvkJ6h3ZZ3es%2Br0BUR3bi27%2FYQOope0I5dlXx6bdkkoktBV%2FyhvXuMyJIlfHL%2BN7CO7qwrLwUqylSIoFr%2F%2FeFIO9UPABuEcQTV911YHCq248aF4irreQtz%2Bc9RD79kBnKBPebVWXP9E876vcjXIfVcmCOFtV%2B8Qs4dSDXahB5c4ibTn05m6wA2Nj7IouVVftaxfK%2BWBjjPNj96B2l6KUUXhcaonolOsnaz6NY4z5ZNuqwZmAfZNI6YhJDZOxu7G33GhcFjMHSGEYluLNCR1TUW0yCSQpzmpGAuaR9DYLMxEH%2FwhTkikSUNCVyuj85vme5Z6Deq3N8zCZ6l964xGKDPZNDWD210kAaKwaRnoa%2BSNJK0KwEz4ylHYwj%2BXLzQY6pgHze2h%2FTMlApUqK4Kl7kN5Gss19dRrQHdSdGCoFc3maE89%2FORLhwSwbluYMaqScvAQTGN9TeYpFHRR0Df48EjWsosj%2BaTb1CF5aYFa8%2BTvOxDG6EyXzwlj%2FmdNxyL%2FSuuX5a92hJqz1CdZqvFG0PeysbIYi66V4EhoaAw%2F7ADeXkshh4%2BYWwlXVsIfFeI9y01XDOmq5xJl8Z8QMn%2BMToAaIpvqLVCiq&X-Amz-Signature=5314527ca6fc80b827b93b2889461a6fe06c38ff4909792da2ada66581b0beb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665U4WOQA6%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T201959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDcgeN7N3AFAd%2F9NYTP02YqBcSq%2BhBKMf%2FCGOM1FI9pigIhANfYGmgJ57I5BNGU8DnzUFo07QpWlwAAiLABX6EEIwVkKv8DCHoQABoMNjM3NDIzMTgzODA1IgxwjsP2NtIYcTEb3kUq3ANpt4SajNCkkMcrslbFQ1e2NZ1mo12rb3A3U1%2FaSysQT5TB0GOHHVt5VFDfJ5K22PWPJAg2xfJQYBgSikj9RVIKbAOBZ8qYXfUp4Yu7380XX4oA8EWHk40TSnowib%2Bl%2FIoi7gvF1CWc1LRsvb%2Bnxo0roOjzCzCtErEO7F3kQH6uiEvbdysnRJMIU5jWt5Xk5%2BGQyY9LhcOYgzNSwS6vvEiRDWtzbg7Gy0Lu68Y4l8gPQ5I3WG13VJWvkNoCYAag37UTDEDplGtVuAsdlcOzsXsFfLlUvs7FZl7B0rqQvrhR0NHmc0VtUun7iz%2BSBqAg34drtexv9Oub0lNiPGcdn02gnpfU4onvsC0spYNvO5F012tBKMSgOmrC53ye%2FUzY4ZQ1wD4gf5olX87BQjx77fIwT0m68f5gKk3TdHWnt2vgtURLnZzfyzHIayMjigb3PlyQPl1w%2BJSkjSSXqWADEPy1r%2Bu%2BPZDV0viYKlN20o3K4sYgOjwpPzXrcUHfOSqRPN6aAm5KCiPXUtDJ6y3PbD3RzDdWfLU7FUbVwIGoB5i7TVCh7qn21wh4BMnkWTNfIwLOWB0e33PrN7TPfiFvUqhoW1rUDYLV6ksk1OaqAuH%2FgH3ACH5FIoNpLl0JPDCS5cvNBjqkARmGKTNwzxc7zGvUvgSxn91Tgs1UtwMxokI5S%2BJ%2BYkz3b25TSxqCsmfXnPS3bOHVGkGLdtb8zRIJo6zsQpyk5PXRmG5QG8ZGH78jxBD2gsAO32VSAg6mHylif1zqqin0EczSLgbxwMRDjLzVJJnOboDon7QSYwAKaOfwR7oL5dPYqbbWkExg7TMAvwbXrYAjj59bn9qG2ahK848tGH5W0eXHFGLw&X-Amz-Signature=580ac1b21c820fa71efb634c602b81d0d120a4fb309e8f7cb6f984d389cd5d5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMRX4C72%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T202000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHHXnmz2N3TUKjWw4CsnKAW7YNm%2B4%2BERVcl2fyYz6q9tAiAxiZpI%2BwXlRt%2BeYfb%2BudZEeLLbS5trGZfUctM7zDNxqyr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIM3T2ubEDgy0ClQUzaKtwDf8IAHihpdbE4bvYrQAIZJ6XHlHAVevErm5nB4exHrC6B9e3X26JsKypXQo%2FXT%2BnwpBfZUv3XTmaQTbyvHpgI0ik%2B9QTHBUfLGJDG7KKt2xhUu6Tvxxph%2Fwp8Kv%2Bz5o0WYjga0bF02tfsTHC06qmeb7wwhnPFYGe0%2F7fIbhj21k%2FNuVmjXKIiWbQvlol7Bf5gHf5GeQ%2BRNU9nI8CRnJw5ufQZQIpaOm%2F3bKmntaOVzb88UR8dSiuvW5KzHGk1M17ep4bsqQ3T8nPSriKqJVa1rkrRXeLMh1NbvhkK6c6s%2FHOJ7P9KkKfygOGWzc9MFzEN7n3obToDQyTeto7yPkizhVTb6%2BjbHs7X%2BPcAYB7e8R3wsUY4vZigE6ZNspA8HvTd2OA9Vjt7gGMLjcN87O1aNfDG3CUS0sziKLbtgJ%2B9rPEnx9AMRbszPVq4J4bPs75dpkaANxKDoKS2qvdEl90HK6UGkKB1wKX8h4MWCLlJDC3Kk56Jf%2ByR2z6UsHCLa88xrpmnyPOGyX%2FOj5kXZvcpc%2FI7bpXVjVWiTcRJXkkZisq7Te%2BxaaGYk1bRTrGU%2FCwj1ouqdsGpjSCSmJY7wR%2B4AvoVD1N1YHMMPwrLYrfH%2FPjdv%2BJxFlRD65JuNDcw9uXLzQY6pgFKcWaNL2YKOuhPMN2p9mYOvsSUtRHieafMiig5gsahU4evLm5NMM%2BBihNvjoEqmRqUHwWP5DNn31KvOYK9VFvfD6IVM0Br9idAZdj8IftbTzW6uTRKhsKQn9T8WmUWXtsVq0JnGJHyWV6T7tSfIpF45asy9QFBXmvzENogA%2FzBiItTEJCXc5KyZNXKJFVP47yU67HQI9w3duUq5ED3hf4CPCcTiZRs&X-Amz-Signature=1e9196c0468b349713faa81ab13f077feeaaa03d9f98330b2136822c851cc9a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TSRMGZM%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T202001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjcRwAw%2BuFKHwCc9E%2BzWXjPv%2BkoDJ26oPqJDKLBn9cTAIhAITpNlclmNpA34plNkM%2Frh%2FGPAb5nE7JEmED7%2BwuWnUCKv8DCHoQABoMNjM3NDIzMTgzODA1Igzrs3aJT%2Bm1xJzjDvcq3AMmsUKwim38EdaOj9xxDJflK64nc1TAyDa36wEt%2FKukKsYT6oVDrjt1RmC8bbm6sSqG44Qos8TrrMqRPmFV2MBKdnVM4rxUuw7kR91x3ttGIPlanx0DLaBZoAfT5ebmiHb1buOCK1jFYyGShU4OhvtGSR2yFhdEg%2FtG0tT%2FYARH5gBrI0gNgMVm6jzMCArJfmcxHWehbI4CUXF1kgQpiFLrWSHTcKeMueSve8LURwPU5Wjc0WqXiFPtbv2NMOM05mAc0Dv6zfqifEGb15sQ2kipBxDCcFeqSE3koeOmPKH0XvGdgvq4A3FTddtJg4B83J79cq5GnHFblDg4K22dRv1DEJ3Y1K1ypeiksOhZbISEsN2vPtFYhNFXwlAF2fzJIY2Ila0QdmwFBH5h4wCghZAxcQY%2FJUf%2F0KuumUw38UvTnBd%2FHtZpLwO4GMC8BBVkkqJlktqcjM4V5Zca9PURkyQ3sz2tb9tV%2Bjxs20gbe1AgoHeptI529W%2BKHCwdmqHDAIdEqYWy%2BHHhispWqsifCgwkq4AVaFknfRovl9yIBcLG7cW2tRW0D8uaJqidrJlkBFHCTl8xJE43n1APl%2B0EhJWDz0f7ZrlvFcA2yUnLUmyfp0htrJeuF85HeTRGfzCs5svNBjqkAc1cRYqnbekZxjS%2BU%2BjSivnR5%2BGf%2BBpMqkvZm1FTjCMEUDNQpGfAj6Rf8m0DPe3imZ%2BvfaaNcy6ER8nBrJ%2FItHWbnz%2B%2BSjoChKVIR2lIQl0YtkUmhBwqJTVd3EGPNXYB616YegNid6a9o9RtadkYd3qErFNBFbVIKA4znoFKmsEdwI4lOqf4gZ%2FkhfQN%2BsmEpbVRhJQO1SwwwUNDGC4ROMElOKVY&X-Amz-Signature=e5a7abd05be9916a71e8221e986ba8e38d3d12b613b69ca4bdb8592636708d29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TSRMGZM%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T202001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjcRwAw%2BuFKHwCc9E%2BzWXjPv%2BkoDJ26oPqJDKLBn9cTAIhAITpNlclmNpA34plNkM%2Frh%2FGPAb5nE7JEmED7%2BwuWnUCKv8DCHoQABoMNjM3NDIzMTgzODA1Igzrs3aJT%2Bm1xJzjDvcq3AMmsUKwim38EdaOj9xxDJflK64nc1TAyDa36wEt%2FKukKsYT6oVDrjt1RmC8bbm6sSqG44Qos8TrrMqRPmFV2MBKdnVM4rxUuw7kR91x3ttGIPlanx0DLaBZoAfT5ebmiHb1buOCK1jFYyGShU4OhvtGSR2yFhdEg%2FtG0tT%2FYARH5gBrI0gNgMVm6jzMCArJfmcxHWehbI4CUXF1kgQpiFLrWSHTcKeMueSve8LURwPU5Wjc0WqXiFPtbv2NMOM05mAc0Dv6zfqifEGb15sQ2kipBxDCcFeqSE3koeOmPKH0XvGdgvq4A3FTddtJg4B83J79cq5GnHFblDg4K22dRv1DEJ3Y1K1ypeiksOhZbISEsN2vPtFYhNFXwlAF2fzJIY2Ila0QdmwFBH5h4wCghZAxcQY%2FJUf%2F0KuumUw38UvTnBd%2FHtZpLwO4GMC8BBVkkqJlktqcjM4V5Zca9PURkyQ3sz2tb9tV%2Bjxs20gbe1AgoHeptI529W%2BKHCwdmqHDAIdEqYWy%2BHHhispWqsifCgwkq4AVaFknfRovl9yIBcLG7cW2tRW0D8uaJqidrJlkBFHCTl8xJE43n1APl%2B0EhJWDz0f7ZrlvFcA2yUnLUmyfp0htrJeuF85HeTRGfzCs5svNBjqkAc1cRYqnbekZxjS%2BU%2BjSivnR5%2BGf%2BBpMqkvZm1FTjCMEUDNQpGfAj6Rf8m0DPe3imZ%2BvfaaNcy6ER8nBrJ%2FItHWbnz%2B%2BSjoChKVIR2lIQl0YtkUmhBwqJTVd3EGPNXYB616YegNid6a9o9RtadkYd3qErFNBFbVIKA4znoFKmsEdwI4lOqf4gZ%2FkhfQN%2BsmEpbVRhJQO1SwwwUNDGC4ROMElOKVY&X-Amz-Signature=05cb20d5a83f71cd9be496f02599e2b647a063b744a70fb72ff21fa5d8bf22dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7P3ZQV7%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T201950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDD9kh5TudXrratH65tpsq2GnT63YxWuWYt1S1yvghu3gIgNkZfA8zcsSClym%2For9J6p5iQI04uwMsn8wTZxKks9V8q%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDB2g6q4K17K4RaSofircA3hH9nww%2BLNMasGEJWfD9Nz3UYT47IQNdCp%2F5txdB0kJBX5fB9LsKMtTRxrdpYO2WF4aUP68zXux8%2BtKrywW9mlORkPL7hSBTjqf8TumR9Sy56Sv44DTlC6yay3ol5hxOqMC8GEO4R15qxv3XL5g1GaZsbvc1hCVbLGsIQHssfUWWAbva8uVT8OQ%2FgTO6cUsY5oGl6ctWnOJKM1GKdS5UPFiNz6KI36KAUlxr0jnBWYUSiCF16c34SyUcYVnzZsi8Kq2pnr7DsiDA0Wd9dc%2FqkJAV6ElmBUFmFOQ8StuszEPMvrdJQdvwFdTX1VfZzewSb75aYN3dyvmzE%2FQsyBvC%2B77eXxjQAmDCmNAFLgZcMIRX%2FGleZBSsm02rNt9lzw%2B5lSGjBKNkDxTKknB3QoPYdIs1%2F6anhzv%2B8SXzIppioLVV88gMYCgSuJsZs4v7S%2B%2F6bKWfjpX0KgMeYjoAu26JXfXAhRdX7RByhIldF0Vvmq%2B5TZ8Pl49wzSWt%2Bs8Aem5CaNQ19L%2FoZuOVwSPa4EGBOtOj%2FFn4d1j%2Fo6iFVsOSm43CbJhrRXVs4yDA86wyryVSqDcPiUTLDl3vGPrWt6A8MKtDMyHYrS7DnMkc7IquGhUw9MeqAJVr01CBOKFMMzky80GOqUBd2EaRcTbCSx596Aqacb3gogXolrRbXLE9oGoFPIVmq%2BZi9uKZS7A76UrIkJrig76P7ESwlC00O2e8WT96%2BYv1EkpPRyxXWyOUnaEMnjJaT8t2%2FlMUibLIOti5JtiHWnzPlyYZwMdHe%2B%2F2kiNqJ7s7cLMCDXYHF9RwWk1RgqyOZ8BDqEyb9NCcmH5M54JDSHjkU8%2B26%2FmaPUoygDz7l2UNUvPlKvI&X-Amz-Signature=62230daf2b3ef3b5c3aca516b921e22f7693630fe97c78b4ba19ebdd197a42dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AQXOJMC%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T202004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHMM7puXlSMRXnjDhO4uUCPxC5XlTDAU7KusSC1EFw%2ByAiA9DvfoZu4wtNhHLGrCzoO7hh%2FRGnRvXa7zwytcbdNy%2Byr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIM10ecPtq5o61UOU%2F%2BKtwDbj%2FFR5RJZL4TT8S8ZtDEknAcKzOVNQ4UB0nQ1tGfY7hVXdUSLhwSUsipCRQdBt5fQy%2F98MumFXzPJ2aAf0DUTFBg84nTvlYF4TgSjkwrYFyYudQNdZKS6%2BnG1eGEHuBqQ3SQmCbGFqAjFQ5V3k%2Bb0NtfpHyGc3T3TUUDXbbnhXchq2Nt9CdZUVC6AvMHQeiGezihUjKnpZPF7l8TpR0FYCz97JZKqKpVruLoM0zDqq11l7ud3JIdXiluh8XywkHnQfVlRQJmSdK%2BnZa54OPgIwKaBmG9iLg3hSTRrU32EtXneAbYzs%2B%2BxhCeJTZZcPhDCO5TkNA%2BegMASF5nIAjGb%2FIHFHbWjQshhA8%2FV2xOTx7Lq91mJ9KmuElqXcwAZ6jy7mlrv5GkgKtLrAWca%2BtgBF26Qow834aW8VaV9OCAxuXbHY8Kevt27dMXq%2BVUXYOFqf6ly9bxMuN6CDT1k42PxJfXxznJiDVfIDhcXgEtQJ5jppcUxINjVG4azjpR6AXJtONoSWSElpIxjbOSW4u3kVkFiECE0bPz2Tc88QS0cIOFI3aJ1SgSyFN7ZtONJBAP2lfynnhImPYpRTRpdxEQv8FahBFiZGr2v9ZPsq6EXwWysPhAjqg9A0nSOJQwuuXLzQY6pgGxrC0jun2KET%2Fy3m2lifWqSTm5Puhn6B86lUWFg8Hrj1FCHhj21aNBVGBZlbo5c9inPMPzM9ZNO%2FP2YG1Ec5cCyw6VYiesp4V8KRVGm59ubULIEXq1A6IVJoAupA7u6w2uKYpj1nJPEVvbvt4XGV0JH1peL%2F3HqZHu8Yxle%2BOPyTBI4%2F3%2FHtWry2sloCwmeS29vMMU9NQh0DspvlD30Mw%2F9KOCMFia&X-Amz-Signature=202973d4084cd4d58956c744ee0f393cd501eae59ecc8b4083ebe239b8cc9e47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AQXOJMC%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T202004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHMM7puXlSMRXnjDhO4uUCPxC5XlTDAU7KusSC1EFw%2ByAiA9DvfoZu4wtNhHLGrCzoO7hh%2FRGnRvXa7zwytcbdNy%2Byr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIM10ecPtq5o61UOU%2F%2BKtwDbj%2FFR5RJZL4TT8S8ZtDEknAcKzOVNQ4UB0nQ1tGfY7hVXdUSLhwSUsipCRQdBt5fQy%2F98MumFXzPJ2aAf0DUTFBg84nTvlYF4TgSjkwrYFyYudQNdZKS6%2BnG1eGEHuBqQ3SQmCbGFqAjFQ5V3k%2Bb0NtfpHyGc3T3TUUDXbbnhXchq2Nt9CdZUVC6AvMHQeiGezihUjKnpZPF7l8TpR0FYCz97JZKqKpVruLoM0zDqq11l7ud3JIdXiluh8XywkHnQfVlRQJmSdK%2BnZa54OPgIwKaBmG9iLg3hSTRrU32EtXneAbYzs%2B%2BxhCeJTZZcPhDCO5TkNA%2BegMASF5nIAjGb%2FIHFHbWjQshhA8%2FV2xOTx7Lq91mJ9KmuElqXcwAZ6jy7mlrv5GkgKtLrAWca%2BtgBF26Qow834aW8VaV9OCAxuXbHY8Kevt27dMXq%2BVUXYOFqf6ly9bxMuN6CDT1k42PxJfXxznJiDVfIDhcXgEtQJ5jppcUxINjVG4azjpR6AXJtONoSWSElpIxjbOSW4u3kVkFiECE0bPz2Tc88QS0cIOFI3aJ1SgSyFN7ZtONJBAP2lfynnhImPYpRTRpdxEQv8FahBFiZGr2v9ZPsq6EXwWysPhAjqg9A0nSOJQwuuXLzQY6pgGxrC0jun2KET%2Fy3m2lifWqSTm5Puhn6B86lUWFg8Hrj1FCHhj21aNBVGBZlbo5c9inPMPzM9ZNO%2FP2YG1Ec5cCyw6VYiesp4V8KRVGm59ubULIEXq1A6IVJoAupA7u6w2uKYpj1nJPEVvbvt4XGV0JH1peL%2F3HqZHu8Yxle%2BOPyTBI4%2F3%2FHtWry2sloCwmeS29vMMU9NQh0DspvlD30Mw%2F9KOCMFia&X-Amz-Signature=202973d4084cd4d58956c744ee0f393cd501eae59ecc8b4083ebe239b8cc9e47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2257NS3%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T202004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAC5Ni14JTVaa6gegGAwBuzLeW%2FuSrZpL%2FGYdNGpejk5AiEAzlPdvt8cbIv2ryFwhiEaU%2FULSy3n5tddBDGqOP%2FumBcq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDLC5IyLZPM2B2xwj0ircA65FnhKvgZikcbDo3JN7Dfz%2FZPgYvqBrCMoRcwNRP3%2BZph9fMnYdFuizmR7QJKWxFYp%2BHkaV85KSSUR7nHR8DyXBwTDMoRc9hWHeWYN1KidzCD%2FYDCHLdzni0%2FIxFmNTWQaL6r66TXsKyjyhB%2Bi6KUeXp0At1HDNOO4SiS5X3ISbVmQlgJLYuXglHx7logP7pveIk50rGu5F8huRiDePzVVFIKDCM0OlVEWEJmiuTycip5TysbGYLAqh7CbLmF2y7PY7ErgDB3JrgTJEeUKXrlInPtDegVB7IBTPLGuXrIXecc6CJl2g5TESqR643pSFd%2F9pBd445OZsbgSfWcSvgKrr3eiNN1XwMoFZNkFVaz2y5%2BCauxRanztCZ1fk%2F8XEBQSZB5s643Wv9xeOWgn9y0K9DXvQuHhllckF%2FxFZyQoZfmzlqD0d12H%2Btn8pzD6cN%2BanTmpjaJAwPmJWkKvMnJHfwSNIOwFYBoVHMXkuD6DT6AeE4snpf%2BCL9Zl8mJHGSUCXRwrihGafenbOQqJkbT6xDAThvJXDlmKKKDGVJXzRKqvtLBMsyxjHwuDIN%2FxL1AtVGPelj1vhwifiSOpaItUqzfgD9%2FLTVNBqKiACrh2viOetbFGAmlq%2BVxyoMN%2Fky80GOqUBLhs5NJYbFwQwyYcfrmJQ%2F1BZDbYljQi1GBhmvsBXTF%2BnlrGSz01qFZHOeFTqfKKtcs3%2B0MK6t9OxAu1ZYj0LnbXpza2Iwd9Wr7Nk5XZplajaKUdSVoiZ8zeoFIIElaTFTGFzgvVdym8YfHyk5wYy%2F7v6Hg%2FG%2F1081vQ%2Fbc%2F5inxS6YzzJ3%2BzXXpXPBFdoM9hUNrcaQrEK3szM61vRraFX9q9imKc&X-Amz-Signature=b3d951648b24110725f99a4b8770c5c05ebc27db6ac0c729409f86ff75da18aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

