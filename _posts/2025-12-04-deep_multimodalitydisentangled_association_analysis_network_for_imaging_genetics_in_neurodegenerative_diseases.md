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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654XI5S7D%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDv2fTg3BQSHN4haOeHTF1J4Hzhjmj7LiKlxSh06leMFAIgXAWsyhSNBVUpd5xxGN116BV0jKWcGHg0dEgr7p%2Bu0zMqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDuGY2IcD53DJOKogCrcAxYqqPmSGBAQgBpI%2Bg0mt4waqTYsXxeBN3nKAxDJ0Rnib6Hi04CaVi%2FMeD80zo%2FPkabI8ukuSLybcZmcYFUNo2%2Bt2uiTgc3jj3DFJycmICdeu%2FObH%2B7cZSezO%2Fg%2Bbn52wVZheEpdsdhiFeQv%2B%2BkAKrcrGclAy0Zydj%2FHMOWhMzIhKZwoKkT5c1QB7r%2BfAyYqYYONKZyXWQY3TTbXGtiBPZqbuIliv5u8VdAGlFE1hpxxEqKEgwKun05YAPGWXQNZPlOkAnwelzwkk%2BM4Fg7TXTSNdODZZ1eoX2TGDFh7FOhhqyLlN94R4kOvD2SZ8XKPYu8VvAw%2ByIsaOMkr0ZxT8IGK%2BXiCK0oAhnVV%2BnVIQ1BKC0crPeMCQTJkzj9tqZFi3lLopmdwiYtus%2FOe9Z9bf9OH0mJj1NuEppujkPjcnMoe%2BiqFhUTmYLdth8%2BPX6tNKPp61pJYH1zstmZDDTNE5xoJuYWNpNEOqNWaz8Wlb8cNUqUoU8nbYKu6bBzBmCmPzz8zV2dgzYwyeokwo3FP%2BRBpM%2FIyYU2B2%2BdJauW%2B1JmPb5g%2FzsQ7e2UAE06NVAlMD15jiaTpjglgUXaGyIY5U2kYfkTsbpTQc4VM0tjr83WEosNZ2h%2BdAtTcIUMXMPmJn80GOqUB6li77qo5h12PJwQNlyle03mOmDqxSr8bYTaRDCBWC9DZtGpSkLsLJYp3SAgrrp4IDXyf%2FtdM2KhnPGRYdtmPAIkxBSMj6QV%2FLmPs0%2FKsRNhb0GecHm6okapF7m%2FNf6hykwKl8G2uGGrbRs7wQsv9Pkcen0hKzqdgrkxiJX8DmPP3jWbXXyYWnjBc9ayOm4qzuKd2PHtBDndKO5hX99oImexQjqCP&X-Amz-Signature=de29da643c68e376336c340a9a00e8241ab552a12ce1ae26c22ac226a1d061ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654XI5S7D%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDv2fTg3BQSHN4haOeHTF1J4Hzhjmj7LiKlxSh06leMFAIgXAWsyhSNBVUpd5xxGN116BV0jKWcGHg0dEgr7p%2Bu0zMqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDuGY2IcD53DJOKogCrcAxYqqPmSGBAQgBpI%2Bg0mt4waqTYsXxeBN3nKAxDJ0Rnib6Hi04CaVi%2FMeD80zo%2FPkabI8ukuSLybcZmcYFUNo2%2Bt2uiTgc3jj3DFJycmICdeu%2FObH%2B7cZSezO%2Fg%2Bbn52wVZheEpdsdhiFeQv%2B%2BkAKrcrGclAy0Zydj%2FHMOWhMzIhKZwoKkT5c1QB7r%2BfAyYqYYONKZyXWQY3TTbXGtiBPZqbuIliv5u8VdAGlFE1hpxxEqKEgwKun05YAPGWXQNZPlOkAnwelzwkk%2BM4Fg7TXTSNdODZZ1eoX2TGDFh7FOhhqyLlN94R4kOvD2SZ8XKPYu8VvAw%2ByIsaOMkr0ZxT8IGK%2BXiCK0oAhnVV%2BnVIQ1BKC0crPeMCQTJkzj9tqZFi3lLopmdwiYtus%2FOe9Z9bf9OH0mJj1NuEppujkPjcnMoe%2BiqFhUTmYLdth8%2BPX6tNKPp61pJYH1zstmZDDTNE5xoJuYWNpNEOqNWaz8Wlb8cNUqUoU8nbYKu6bBzBmCmPzz8zV2dgzYwyeokwo3FP%2BRBpM%2FIyYU2B2%2BdJauW%2B1JmPb5g%2FzsQ7e2UAE06NVAlMD15jiaTpjglgUXaGyIY5U2kYfkTsbpTQc4VM0tjr83WEosNZ2h%2BdAtTcIUMXMPmJn80GOqUB6li77qo5h12PJwQNlyle03mOmDqxSr8bYTaRDCBWC9DZtGpSkLsLJYp3SAgrrp4IDXyf%2FtdM2KhnPGRYdtmPAIkxBSMj6QV%2FLmPs0%2FKsRNhb0GecHm6okapF7m%2FNf6hykwKl8G2uGGrbRs7wQsv9Pkcen0hKzqdgrkxiJX8DmPP3jWbXXyYWnjBc9ayOm4qzuKd2PHtBDndKO5hX99oImexQjqCP&X-Amz-Signature=de29da643c68e376336c340a9a00e8241ab552a12ce1ae26c22ac226a1d061ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J2AETFG%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6KaIDFBdSuZ6bbXVNGERWuYXGjME%2B2az0U08w%2BcZJjQIgczOYz4Bz8%2BrwosaTVTg9pSSFwYr70m%2FlQcSSPlrRCLQqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGfx%2FDNNgSLWXU00JCrcA%2Bd1BAMV3iJn5HICll4HYAD%2FwyKlqlySPcw1OOoDLuxDVx2XCR3NQwNf%2B4M%2BTHwyTc6g7%2BrtUSE%2BGFIlCS1tQoryma5RPTx1XW9HFQmk5fj1CMK3ToqSyjD3g%2FT6O4IWwMkF6FK6hT2VKwuRaP2oxjX%2BxFQ07Ld5zkOi4EI5LYPrb3tVdJmHK99YLDc628Yf0dyDVam9V8bYK3%2B4wSfu6WNMf1u8PzKrEZdCxxd9INrha67QuS9Lu8WbZjnmbAUsKdTNbFp0YtpUipsiavwNWO%2Bzfq476rIcYgY1CkpxSWv88wLZyvgLPqpxaGT6g8Z1EHVpU5y9l2fCj6OF0N1OFGMWIvbzt%2BaenoRTj3iHZ9p1TYp57sKA6ReroDgmf3Q3q62kiQllFoxYJAPGbnv8%2Fq9GB2VX4edD2vOP56HkMiNLOkI8qq5eHWDxI305Do%2BBvLNbgM6pDcHksA5uPge%2B%2BWwdqwrs9IZ4BH2Pm2ULv%2B8Eltt3rYNBO3rAxHTJcEcbYSwRsH9s6h%2BdutL6vqU5kx7A8D5Og9zd%2FFVaOszuvnPbXOcwMRIV3Mxvg%2FUgMJEjf0w1wudz2vxtTyfpDuv6qdGVxhNxusJMhMoZHzZCiBeb2W%2FUfYQAfUXDeND9MMOLn80GOqUBZt4jbamIeVoL7c366%2BGg6Q7%2BpRXWIQjyXGXWW234u4NHgO7A4Tzam%2FvSlAa700H4OLX9e%2FgiDLPPf5VyCNMUFFat0H5X3E59%2BVqhAOJBksHyCGGcj%2BgusFkFoEOPHsM3Yks2tOPSDcHyxFPYvXFHWGnWm2xVbdJmaomMIW47bmaj7DxlyILCjh0u5IwG1ZIUi7myOJ43VmTRQ1o3w%2FwDR80b3NjZ&X-Amz-Signature=208df48d619976e8f682e8927780c0001d64745a934d9c30c7b35a246275e9e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OFITNFT%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFRkWzGPE13vOxFtPIZomj1497rMzYJ%2F2I131bcP0Sh7AiEAwQTtSY1hctCf6UMbWLbsLWgfhWHXYmww%2FLSHILS8d%2B8qiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKr8VfXADjSldV1RcircA9OVGKfh6%2BqqP4B19UQ9XMnxng1LOuAdJVSgp6ag6hR0HeR2HGdMmfWRZA4n9u%2BeGQCw44eRiyz7vD0NZJSHpw5R8LabHn%2BbjgTuZyf%2BR9fvx8olkCZJ7CaLORw66iZmWcfBOV4aCjO63NkyFIREqMRrx11oIdgsX9qAaemygTyTXNV6xUaKVhiH4%2B%2F%2BqfoUvQBO1r0I1bF5OyZqO2hgLqhNc0Jy8s%2FQp8i%2B4sXiWGTYsAcm41RhXfQb4A7mR4XkPFIma2t6nSn0pXIanuXDSaSO4d0Eny48ier3%2B9%2FlJwFiZQsFbK9lU%2Bqk0sIGwTdRbjuGSniYFhcxxiXgynAfpb6L6yPdhKp6pg29GaUG9oBPuecY17Y8hBwWl6b8rvCYngbTbEY%2FnsMENTueJ2XArXTNOVuy%2FfJHfEDMoIyVlazEYK%2BUjL6FBQFEEj%2FwAsGRsGZacVs2nJJXSJ70Q6TbFh9BuAC%2Bvq1N%2Ft9gvJfVBdkmV3kvKtnqL%2FYS9awALQSI6Mtcleid%2FG%2F6lsE54kMwzzHgUjAUbQvG4Ek%2BUM1qE1V8SmiTQzY5sAKJSeOHCkyykzNnY83GD9faxUdt6peCXln7%2FscV2tfBa3Fei1TWz9hSQw%2Fw%2FXhJCWH9IUCaMOyJn80GOqUB%2BkkW7dR%2Fiz5TLd0x6hJFBc0gL91oJjarQCSI9xWahIIoOgRmRgNTXupGTOF%2BWT95sonR%2Fco69TRXyoYfdyit32zqJ8gzkwlrAnvvseqhquu%2BTmp9nIgIglwZ32hQdf9sHdZFF%2BWPKWgXtjJRsj%2B1lO%2FPERemsvrzCUJtbGrwP0TQfsLygdssesIfECrX7TJFn6IbV70QelidXgog67b40O%2Bi7uxY&X-Amz-Signature=418b672b6c7426eac43b51d36d06688150175c73022906550c548a67c1c4c459&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OFITNFT%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFRkWzGPE13vOxFtPIZomj1497rMzYJ%2F2I131bcP0Sh7AiEAwQTtSY1hctCf6UMbWLbsLWgfhWHXYmww%2FLSHILS8d%2B8qiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKr8VfXADjSldV1RcircA9OVGKfh6%2BqqP4B19UQ9XMnxng1LOuAdJVSgp6ag6hR0HeR2HGdMmfWRZA4n9u%2BeGQCw44eRiyz7vD0NZJSHpw5R8LabHn%2BbjgTuZyf%2BR9fvx8olkCZJ7CaLORw66iZmWcfBOV4aCjO63NkyFIREqMRrx11oIdgsX9qAaemygTyTXNV6xUaKVhiH4%2B%2F%2BqfoUvQBO1r0I1bF5OyZqO2hgLqhNc0Jy8s%2FQp8i%2B4sXiWGTYsAcm41RhXfQb4A7mR4XkPFIma2t6nSn0pXIanuXDSaSO4d0Eny48ier3%2B9%2FlJwFiZQsFbK9lU%2Bqk0sIGwTdRbjuGSniYFhcxxiXgynAfpb6L6yPdhKp6pg29GaUG9oBPuecY17Y8hBwWl6b8rvCYngbTbEY%2FnsMENTueJ2XArXTNOVuy%2FfJHfEDMoIyVlazEYK%2BUjL6FBQFEEj%2FwAsGRsGZacVs2nJJXSJ70Q6TbFh9BuAC%2Bvq1N%2Ft9gvJfVBdkmV3kvKtnqL%2FYS9awALQSI6Mtcleid%2FG%2F6lsE54kMwzzHgUjAUbQvG4Ek%2BUM1qE1V8SmiTQzY5sAKJSeOHCkyykzNnY83GD9faxUdt6peCXln7%2FscV2tfBa3Fei1TWz9hSQw%2Fw%2FXhJCWH9IUCaMOyJn80GOqUB%2BkkW7dR%2Fiz5TLd0x6hJFBc0gL91oJjarQCSI9xWahIIoOgRmRgNTXupGTOF%2BWT95sonR%2Fco69TRXyoYfdyit32zqJ8gzkwlrAnvvseqhquu%2BTmp9nIgIglwZ32hQdf9sHdZFF%2BWPKWgXtjJRsj%2B1lO%2FPERemsvrzCUJtbGrwP0TQfsLygdssesIfECrX7TJFn6IbV70QelidXgog67b40O%2Bi7uxY&X-Amz-Signature=f3f6c0f66c89be684fc11a3088f3eb23157ddb95dd0c57b9dfd44823fab8b495&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MXX7PAD%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCYpvtpeJ7vGoNTv32Sa%2FdKrBaUXC1z57Wz4LkUu3hY4wIhAJ8mk4eETkKGgzwVP6Xa2MbdVntiHsWLfx79YdyZp4%2B8KogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzRqr%2BFKtO%2BY6%2BmKeoq3APuvyXucyAxs%2FhF1OqArRkF7aDQq0WhKNSxdBfRapvolLjYymJTnISw1AV%2B0Z3GJZXtnYiz7aEFkZO2cVRuvuYbeJwknsXQyCg%2BY4jFItYzTGORXvyWae8BuTjypyFW9ylMCcUY%2FRUQXLVsXpBFdtGAaiZF9eBIhm97RW1DzIFn7ocUKbz2YFdiyskiZvLCgkopy5Yq7VB0EwkBGcjjVSKW%2Fnu1VQxoCOEqbznPNrLuw5Oi0PMe5oUct1AXCTD%2FLck%2Bl%2Bj5yKmgfAWBRNiBstLIxK%2BH1ulhk5y4qeA0dNOEMQWVRHGzE6VOqowGosW3OFHJ%2FWYUJv4mdEURt2rKeVq0GIuBelOYd1C9oFX%2BaV65I%2B0Ihu4wjsDglqBy%2FH7R00HVa3kgswJRRDb6sEaHV5TKL0OZdCDd02uFUpdxPmk0pzdR%2BRt4tcSbEY6x5D76ARHw7zbmJq5o40f9%2B8pJ00x%2Fa7vKJg7C21M7VoWdzs8X6dPi4zwFIIWnRBqVwkJZ3nakk1fHPvEQKhreBlDWKRVw%2BEAZyYasjDNOzbCbzPVAmuM5iFSU9wmLMo7Nc8SJIwS3oxcTVqCVJumskc66%2BQ2UZh%2FInSyYCErdOmH%2BtsbUCTfKJ4PPIfKXxQy%2BaTCmi5%2FNBjqkAT8cgyY1SLhlsqDTTYCCxZKHOGl4lPS2WqAAF%2B8TPuiOi5EdzCyKDzQuZanEz9fZUyShXTzzwIa5Jycz1qczcSrVql4zAsdLXVxmx3Nt51P7tedcH2t0SSqMkX9TOPE0RXtQO%2B%2Fg0iD7VTa4MHRAp7p%2B3lpjOv%2BkmUSXJd8dcDL0FjlbW7sbGqor30VfkKYtUNQjOfxZiG9OPdhUfGSsWdVBBsIY&X-Amz-Signature=6aee28a75e69d1de18e14ccc43bffea70ae6937f32f8e0a05558e63e6219e8df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D6RHVKK%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAQEbbQG53AD98DMKGZCQI9NPHKU8F2VUexqT4NyaXDrAiAyGBjjQ3eAxLx2kN6lPQ9sbSqoy0twrcD%2BYl2iryTO4CqIBAiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMFBxVYw5CYkgiwsomKtwDUUnlG0Ga%2FEqY0kSTBYOlZQXFwXnDUAIyYZi%2BMc5W9HeX5Llik1XQsT8uId9Jpan7GEquxCAKHkqFf2knAGAiDSzif%2FokkC5ydVHlRNPLE1t%2Bl0MkvD9Iu0W2qLqMbQLhh1ZNBYPzKmpxcmzqjtbXYBONKl9r7LdtB6zfLRnigbU3yLa9mkN5qxHOASWdbka10WeDxgKENnQrpPsHQt8OlBlJAkozp42kxdOqZuclc5Wkg4oPRfbDIboPNZkmO0gq1SYcM70xXXD1JoY%2Fe5KyqIjVgyPXbXAyP9Cwmfp6nLOZArKWr%2FCHvM%2Fz61uM8L4k5Ytio6ZVVQNuasukua3fUozPB0v%2BQN%2F7DtApjo3tHCF5d2DU1FFZy3%2FbIGsNqqe9hqL0rnJFOHMgVll1vbxwzUkmV%2F8E666JRCORSsRIiuKTae4Chg6V3xD6ceqgwLsU2loh9pz7UhY9f%2ByBDo6pG95LXvtHQzqHsxGWW6wXZgOj%2FMe5mj78kc0lL7DmONkY5DJiEbdhgeh5DAssIJgtvg418YYRkRUmBuqTS%2FEpHua9rI7k9A6GXfGd1wj03wvIDCN9QZTgkZz0oUol%2F7qe2cAapOkZgbAUxh2WsyBtBbdSqFGtfoZmfn9yOS0w6omfzQY6pgGHp5uq6hrQAxd2OA%2FHkVGrRBRWvjlj2nwcs0U8kwSxk%2BwTqglqaylHW%2BWfUBGiicitYkVYWyTZryXT0A20U9u00iw2pO53HWFAKeGKd%2Bh8g72d4FXCeLa%2BkLaQmO2eKNEj9pq5LIGzzQdz1xj3K420Or4uCAhd25HV13jZ1AHOH8dqaug%2F0h6Vh6pR6EI%2FKEiN3CnasaPyQqZB7OtLdlDTQPaOerQr&X-Amz-Signature=2b2b0c89bc2b0409ea165bf0e99ae2dfca3437129a866d4072d20c9bcb1c0dfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJCWAAJN%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBd5OgjbAaMG%2FYEz3tE7hZxjN17189LVzvkAOT3bQyinAiBRh5z23vdmC4B1bRDPvYTOmnZOgOeLA7Tx1rNCeNBVwSqIBAiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlsTbbgfE6POpphlEKtwDdRfgkP0ArWcEXf0OiUxNk9zxbI1wOULeLG86zP9aj62oBJtinoksxFOARwdXsxa3lN82ka57btFeUB8DRwk0LkAwcBzs2lGTeJEqr5naQjRgUu5ONiVOny6zJg83iq3yzQkbBkAuA91O6oWZOqOT72ez9pKA8e3CUMemNNoI8BYHon0gY%2B5SbdF8yAuRHE%2F2o%2Bi86c9u1ALeokiTeNIb%2FB0sNZo5Y1bCy9eJTLs4Rzc%2Bc6ztmAqvYSMeA6QwZMFbk39eaiZOnfOeCLDWrE6Rtsp9YSYyNavkYe9W9Xo4OyldWZMDJZbl0JP2pLTw%2FpUxuzryZSJu6sSV%2FkYGLXDt%2FqyFBV8OMf0EA%2F25Le4zfCvlqBtpwkwnddhe8VEvPRSxRdnrY7jobxtNdiKTQnRTJ9Y4ket77nk9SZzC4yAKguOB2XvN%2FV7tBeXMhbME9oxZ9g8eekZhVXmsJkvqzeSvRA8Ort1fDeC4SI8H%2Bvjmk9v0hEys%2FtX%2FiYjBiF33m2To3hyMbEfF6I6O66LIDZ15YYtQgknlcNA%2FppbuYxng3wkqJDtzHxOSHvBG2bYSS4TqVjH%2FIeUIREPQwwh5d%2F%2Bdw6mwKsieNA118qIElMQV7aC7C4ch8kuHJTs43cIwmYqfzQY6pgEGb5bhITWKu1d3Gh5PtL42lSkoXjMadprV3qUnDpAY77E7e5QILPajB3Hkwz1gCJmoLZbmh67Yucgv7YpyWyOjeUxkJ8gXzXeoJevk9qXvb0ylec2RbJO31qnFmOz5NluOvHsBWjWn6xBELzGx%2BUp9ep8zPy0iu7x%2FmxqEbJmlBE1isu5Tzm4wVMNgud7fqEHgEAiuYj90hGQAzCK3sAoL5XZAZjrE&X-Amz-Signature=3bdb472ab1ca10f68a811b2fa2b09d9f1bf0a95e4055ede2341c77122bccc287&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2Z76INR%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC1Ym2ABnWoLaFCjNoLb%2FHvYYSw%2F3EOmC05DtdnyEFuSgIhAP6peZnUduyk73Jmmzz4cSh4iEJIFfw%2Brd1bhMCXYNyfKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwticz1Y1x55gcThwAq3APUTbc3JBR7d7gBsV6El8QCNpv00zrJuxaNqRfUe%2BniiB%2Fum%2Bt3cI3lKKCRvhQsHURJR4l2G6uION8Qpwyb51SfFLLPx1EXx%2BMjF5R6BQ%2FxLKwDd1WgRt5II2PiHtu8CRfYc3SEWJZCFfjolrOh%2Fvfb2rLAwysVJvr7YqboenLmiHe0Z6rztp8MM8bLB8XZ%2FS6p8zoyo7%2BaTwpgTUBV6aU4sdhpYXJuBuGXDc3fV9eTTJ9xgAz%2FVrMHOtA5E9s4S3S6gdl86jhBePLlbIRs8GKMXJrOu5681%2FAfrw%2FhN8cVBtOn1YZ3%2FkuZAfAqI5B3FAHzwtSTb3XbEBN3N6Gt5HRq3HHh922FMgb16OygSjgh1Erd3liSSYQRDugHRu2urN0GuiXL8LEub7E%2FF2bl4hxeYPX3xuF3OOfOHnk7I9KVCbBy4Ow67EM4uWHnOIvkpvsUfw%2F0Xpg%2FUPZV2ct5A6XcfPgh9HOdDxnDtDkRG2zdij%2B3WeRFVz2jfAbhMYrufUjUk%2FWrrdRJL0j0wgy%2BbIFjBPFhlZxsCWwyZLET46WbEs8mUIDiHiM04BabGMGpz%2BbMgW2kn08ku3UaqnDmejE8y%2FOzu2tG4xuppmxbmwxIym4L5zx7UGG%2BR6irSTC5ip%2FNBjqkAWr5jKfJ%2FfN3tUmnifWQYMyZxYxBOUQCuXCyEDkzxofM3S8GJhnqZFwC2036fZKxvnWULTJ%2FpscTFwA6xX4%2B8Z6xd9ZiNcW%2FOJ6EHP4sRFBwSHa3lmYPCAmwBFjomDOTScbt7v%2BZGBLc4DGbPlrs3gtLQQmOVQWU3CYusTEbzdcxx4PmBscLVD%2BwAAafvA2YvZjaGdfRVdT2%2FT4PkWpyUmjD8HVy&X-Amz-Signature=92abc9c0308857e60f09aac4d5f7535d1810bf05fd2ce0970efd13db2735d929&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2Z76INR%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC1Ym2ABnWoLaFCjNoLb%2FHvYYSw%2F3EOmC05DtdnyEFuSgIhAP6peZnUduyk73Jmmzz4cSh4iEJIFfw%2Brd1bhMCXYNyfKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwticz1Y1x55gcThwAq3APUTbc3JBR7d7gBsV6El8QCNpv00zrJuxaNqRfUe%2BniiB%2Fum%2Bt3cI3lKKCRvhQsHURJR4l2G6uION8Qpwyb51SfFLLPx1EXx%2BMjF5R6BQ%2FxLKwDd1WgRt5II2PiHtu8CRfYc3SEWJZCFfjolrOh%2Fvfb2rLAwysVJvr7YqboenLmiHe0Z6rztp8MM8bLB8XZ%2FS6p8zoyo7%2BaTwpgTUBV6aU4sdhpYXJuBuGXDc3fV9eTTJ9xgAz%2FVrMHOtA5E9s4S3S6gdl86jhBePLlbIRs8GKMXJrOu5681%2FAfrw%2FhN8cVBtOn1YZ3%2FkuZAfAqI5B3FAHzwtSTb3XbEBN3N6Gt5HRq3HHh922FMgb16OygSjgh1Erd3liSSYQRDugHRu2urN0GuiXL8LEub7E%2FF2bl4hxeYPX3xuF3OOfOHnk7I9KVCbBy4Ow67EM4uWHnOIvkpvsUfw%2F0Xpg%2FUPZV2ct5A6XcfPgh9HOdDxnDtDkRG2zdij%2B3WeRFVz2jfAbhMYrufUjUk%2FWrrdRJL0j0wgy%2BbIFjBPFhlZxsCWwyZLET46WbEs8mUIDiHiM04BabGMGpz%2BbMgW2kn08ku3UaqnDmejE8y%2FOzu2tG4xuppmxbmwxIym4L5zx7UGG%2BR6irSTC5ip%2FNBjqkAWr5jKfJ%2FfN3tUmnifWQYMyZxYxBOUQCuXCyEDkzxofM3S8GJhnqZFwC2036fZKxvnWULTJ%2FpscTFwA6xX4%2B8Z6xd9ZiNcW%2FOJ6EHP4sRFBwSHa3lmYPCAmwBFjomDOTScbt7v%2BZGBLc4DGbPlrs3gtLQQmOVQWU3CYusTEbzdcxx4PmBscLVD%2BwAAafvA2YvZjaGdfRVdT2%2FT4PkWpyUmjD8HVy&X-Amz-Signature=a96bd41c71c4a2057d2642c879a3faffd6dd9b32dd152882d2c72776326c575e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YD2SUPNN%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBH%2B0EBT%2BovshYuUH9iDzHpQ%2BsbPxYdvkWMmES5HXBwZAiEAu64X5X46QU0gfLPBpky31dlUT7DIBHRoHkQKLvw5awMqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG3I0Tfnyiqs0V8dsyrcA96JYvBtDn8hAqzV2UD1ZCm%2FHQga1Ym3WOhG4DMNuuYaAmwnuLn73FCqtsi55s5F68i38GeD20PS2GbOqBT14GWY6GJ0ySNtCqkF7KBdIQWX%2B2Z%2FpmFbCAz5JjOVmuTLRuxouepmAXMJqa2%2FkBWNV4mngN6DldsJQ8mewmbGX0dcelLurnfziQBxKdiLTN2DyHjdRQqbwk4InRRvlzij7xGdMdWEZFr%2B%2BRfpKt61kOq1oRbo3AbdQF0%2BE8CdPZi1bJMPwPJr%2FImGXmNm%2BqhhJPauFoTiKmgc5ucOGzTj%2BPe9QuAePK9OYFzN%2BlKsSTTlpLmTEKCvseTWf5I0C9n%2FPYPJXncU0ijz51CmxxlJCRIiC%2F34PJrrFHu1s%2BjdasSMzEdonmncOAIWlpuP%2FnoX0lsF%2BhCIUNYoy%2Bl7UpujJj3Uspy5XcAzA%2FlLXtCAVTWXhk1zdyw18EsXEk%2FP31DXPynrqMAsQt3p2gUw3LJn4RNC87NGoxswvrzKbeLVipTKmReIIcdv8Hc5qSO07O6I7%2F9i0HXgHyY7m0qdUSnaVN8hsZyUfF%2FPSKv%2FBk9vS0U2buHdzlmL%2B0GXN5r8YPCjQ%2BvibF%2B1P8gb6OPs53E2%2BvQJQgLbSpkTTDokvnkaMJWKn80GOqUBrI1xgByak5MDQoBImlNCFsakDl%2FWScCAiIsnYFiFGc7HybfFuY8D8DUp62enECnQCATmspAiRXTJRzAXEWJNOe1ISTRAstTKQW5slNuHD5ooJM6G%2BPJM1lEOo8JP0exeH7dkrNfFH69mR5vtHlbDexvfLhAEYeF2g6TQXEVXSdzbrmxHwj94bFlpEYlQkgdfTEzbz0YY0Ku5Fxjb9Z3phF4l2uKP&X-Amz-Signature=e9bbc9a0df6de40bae721152e045e1b1bc4b92ac69d4fa5cd7bfb485b37d53bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663THY26BF%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAzJX6VnjZ4z018kvIX%2FmMWYTlU%2FF3D1OTRV2fOqAnErAiEA7nsjOTTrnNqX5i3nJtQrUuBif02OgNQVkw8zSvAjm2EqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBkySu3EJ0LiobwA%2FCrcA0A2hD8EmKu3VhfhWDU0yc9aNaZGteqXL469nwb906wJBVu3Cbc9v2qbEjUviiqP6mWArimU2dGrzEVmxNv0%2FAjvQ3NTm4y8lMiZx4QziDJKD9kLIEeUM00GddphBW7thaDTaQX2Czw%2FhMz3VXJJ2qtaziTcNzkquHP1qy4yHtiBoxnC%2FDpjvZ%2B56v3PnTgEWhOg3qYrEXsmCaHd4MvCboFTgSGd5MKfGS97wBoWYHzQkJtb7yXDOUCpBla2H%2B2b4HGSZvLi2YCgc5skYH2vX4lNiRX5NkbiE8il%2FMzbf4L2DX062YgYSwUudpRG4aLYab6URGdfp0BSEJTQOESoBG%2FzIiHLrzQC6HCZBTj3dXyA79cw6Bpj8gHdKZ7rXgnLYkcbC%2BFXTCdtRfyCXIfzTxPRA3s5rGKHHojxnsFZDEVmIikK9mN4w6Nuq51Bhyal6mpmdiXpEtA%2BKEmgj%2BEOnykAF3Kz2c7vorQ%2BB15yjoU4sFUljvsWEVmcOQOWALbeTvaMCHl4QleC9zoNvWB3h3Q4H%2B8FOj5nHedFT7uEwsjiBEfAA1E2Anzx7rW0I51vd24uagkrtRjMThRrij1NYq6H5ARZ1OCiOl9fM01XJ3vzkkwMgf%2FplL31iTFNMKaLn80GOqUBpeUNu7O0yTUjih9LZ9dOWQPAC7yC8vqJMuRUyZ7Tt4VinHEaJGW%2BZa2QFBnPhRkyCdElv1EAkDHq5hNuId91Iy4nTiZ2hZ0I1nS1hV1cgR6rFcuIDL%2BeUK5BQcrYfRVuZMi2oUk9wp5FquSoiCTdrJK3zXb2RMU%2B5K5sbjr9J1wcyAqcRWnt0LLqULxP5%2Bi%2BQG%2FgOjiT20ppDg44pYBjIqFhqIxN&X-Amz-Signature=804de133a8b152d1046d42ca2b7154c373b74e138a2da61309bb0bf48aec2de2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663THY26BF%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAzJX6VnjZ4z018kvIX%2FmMWYTlU%2FF3D1OTRV2fOqAnErAiEA7nsjOTTrnNqX5i3nJtQrUuBif02OgNQVkw8zSvAjm2EqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBkySu3EJ0LiobwA%2FCrcA0A2hD8EmKu3VhfhWDU0yc9aNaZGteqXL469nwb906wJBVu3Cbc9v2qbEjUviiqP6mWArimU2dGrzEVmxNv0%2FAjvQ3NTm4y8lMiZx4QziDJKD9kLIEeUM00GddphBW7thaDTaQX2Czw%2FhMz3VXJJ2qtaziTcNzkquHP1qy4yHtiBoxnC%2FDpjvZ%2B56v3PnTgEWhOg3qYrEXsmCaHd4MvCboFTgSGd5MKfGS97wBoWYHzQkJtb7yXDOUCpBla2H%2B2b4HGSZvLi2YCgc5skYH2vX4lNiRX5NkbiE8il%2FMzbf4L2DX062YgYSwUudpRG4aLYab6URGdfp0BSEJTQOESoBG%2FzIiHLrzQC6HCZBTj3dXyA79cw6Bpj8gHdKZ7rXgnLYkcbC%2BFXTCdtRfyCXIfzTxPRA3s5rGKHHojxnsFZDEVmIikK9mN4w6Nuq51Bhyal6mpmdiXpEtA%2BKEmgj%2BEOnykAF3Kz2c7vorQ%2BB15yjoU4sFUljvsWEVmcOQOWALbeTvaMCHl4QleC9zoNvWB3h3Q4H%2B8FOj5nHedFT7uEwsjiBEfAA1E2Anzx7rW0I51vd24uagkrtRjMThRrij1NYq6H5ARZ1OCiOl9fM01XJ3vzkkwMgf%2FplL31iTFNMKaLn80GOqUBpeUNu7O0yTUjih9LZ9dOWQPAC7yC8vqJMuRUyZ7Tt4VinHEaJGW%2BZa2QFBnPhRkyCdElv1EAkDHq5hNuId91Iy4nTiZ2hZ0I1nS1hV1cgR6rFcuIDL%2BeUK5BQcrYfRVuZMi2oUk9wp5FquSoiCTdrJK3zXb2RMU%2B5K5sbjr9J1wcyAqcRWnt0LLqULxP5%2Bi%2BQG%2FgOjiT20ppDg44pYBjIqFhqIxN&X-Amz-Signature=804de133a8b152d1046d42ca2b7154c373b74e138a2da61309bb0bf48aec2de2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CJHIAWE%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T062959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCj8bP5jtovZVJpaZW7IlmBzKJlszj0mGmh%2FdO2QZiwEwIgYwGY8O4iRn6XrRFwc5%2FRRE1rBk%2F6LimJ5OfGVSXFgwsqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNTxl77rtvfN1lTJeircAxNvj3qUcNDirRa%2FaKwghe07C6C2NzxHupkhtIj6OjT1Jl20t5kecNRmJaVS5RRtLRTR6PzU%2FiDDcGriMiC1dn%2Bkj%2F99veUII1ZFcDbuX2PSLf6co3cA35WbK%2FOjIyKys589P3S3ltL9sCobpsdO6MNEAv0me9TAOn%2F6Sonw5R%2FhMOctGBAqFKxiYurEtifPBGNR0DJ3f3oZB9fT3i0830ywOvKkN5Xx9CZRxr%2BMqFAc0ikh3q3XaYlNH3Raut274eboWrxUWclXuvauHFfMswl4d4TCxj2Lkue7UhMTLm8%2Fc38kXeF0o4xoNzqbQH7Fl8%2Bwh8WI8atN80c80CXIihd3JgyBs7Hls7KhpQnaXJEWO09OiDIO70%2B8WIs9TLHesiL37CR75IKAuUUUarqJqLgdXnsrayAjbiSizqN%2B0rtFv2pGmu5IlF5rd3eS2IHwc6EuhJA%2FPtTxPlE%2FiIMm02U6NU938eIsCjJG5z8aQgIMvJHK8L5KC0dH6YAQvlT9s8XZEAyLDs9UXr2vwB7Ud%2FsoeZTDUrYQ3zXYxmCoAh9MeWw6%2B7qLPjY%2FhBUKS1sodgDI5DvA136QH098wltMec8PXoiBbqpdd9jTUM890SLUGg4fOCWefT8%2Ff5TAMJyKn80GOqUBvyyZ0HSPRf7AM3GGFf%2ByBdwhjI%2FB2a0WS9fEimF8QsjB7OMrlU36san24XXmjml99%2FAYiqaW2kiE46Oh0c7Gv8pPxIxRiMF2mOsvlQ2HWMklhSpq1KI55xmKCgIzzP0xJmgorCMsDFq5P7hz9O3OJXpUUv7h9fnXEb9zF3O%2BaFppcyBSxzoHfZODDML5XRmhozYfVFCZsXNrVetmsxIZYQ%2BaDI6c&X-Amz-Signature=20139bc2968dce47b569d1fa1894539821f5ae05f7fe10c8937814079531a1b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

