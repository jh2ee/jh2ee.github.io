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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLYGF3IA%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCGVN9Dww223eiu3iU8QYRnHTZMfHhAV3Hw%2BX8zv2llJAIhAIXyBOnwY621pNdvJB%2BQu7T%2F3r7JJ1YqmhaEWIGO3PRnKv8DCA8QABoMNjM3NDIzMTgzODA1IgzdHrCntvWiQTSgF%2FQq3AMQAIrG0OA7P8ptn6xAGjhsqBvmrRnwVgzuFOrBCuFFtLgcKrRB0B09qsnm6f3k0PdQmxIRMNSon%2FeXPj5nxSho2H1ycwOFeCjIiKJuISfBhf9dtbIc4EC85ljL3SajfKdGhsbL%2BaV5g6NKEdHMUpBji1gph4J2GbEZjF2YX540ddOr%2BYudScnwMA8YLpP%2BqHLTFw7nl4Z5sEqCePULqE0MJ6FmkF%2BpcmD7r%2BBAvgJ%2BLT3%2FdqKuv4F7oU0ponL1DmMfVmQQebN9jgms1LgxSyFtvQd%2BUF4RxEglxqdNkABTJcYl%2Bhr3GpeC9DBBHPCjk%2BzHFttOuHj6U8ekY7bKWjJDZnEWXCk4NKlTxCmW3GpU4Em77FA4CXzkKskwtKAVtMkuzQzLnUqCSeslUzLhIJcp%2B47zvPP0sCJ%2BgtimIg77WZm%2Fbj99x89ki9VEuaevTz37c74ste%2F78U43xvHG%2FhZeiZtrqKX6gOiO%2FWYMKOW%2FUdnf8jSMgzJkQT9%2BEu0S0QIza59WqtmG4W%2FT9tuJE9H2J0YcKbvowSwTLsrR1Md%2FfuUx%2BhnOapSNNRvhdNs2pgXrOaBHrLT3lj0blXvJQWuGfAHoSbMeFa%2FNOvdPUaweVqqdqVluargpt5hZiTD6p%2FLJBjqkAU7doB4jPb86ryEAB%2FGTFAyUY%2BOxuTxvR6poeIMAbBPRk9EmA%2BB%2Bhiau%2Fsupd3srsLBquKWdTHlptZ1LHM06JKkV4yAo3tWwCKoXCJmmbugNcxu85xmIDWZdWS4oPGYz%2B1WLvFvser25FtjeTObSGZy%2FHhHuH2PH18KoToAVl5Lb2n%2FFvb8fIm3jR%2FBtVCNtdwim3%2BB4eIeV3vgfw0tz1gWWnEUh&X-Amz-Signature=e2739a2f0a40677a0e678d99f694a86b875c5f4679a4b6f7f8ba7d8f50d14757&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLYGF3IA%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCGVN9Dww223eiu3iU8QYRnHTZMfHhAV3Hw%2BX8zv2llJAIhAIXyBOnwY621pNdvJB%2BQu7T%2F3r7JJ1YqmhaEWIGO3PRnKv8DCA8QABoMNjM3NDIzMTgzODA1IgzdHrCntvWiQTSgF%2FQq3AMQAIrG0OA7P8ptn6xAGjhsqBvmrRnwVgzuFOrBCuFFtLgcKrRB0B09qsnm6f3k0PdQmxIRMNSon%2FeXPj5nxSho2H1ycwOFeCjIiKJuISfBhf9dtbIc4EC85ljL3SajfKdGhsbL%2BaV5g6NKEdHMUpBji1gph4J2GbEZjF2YX540ddOr%2BYudScnwMA8YLpP%2BqHLTFw7nl4Z5sEqCePULqE0MJ6FmkF%2BpcmD7r%2BBAvgJ%2BLT3%2FdqKuv4F7oU0ponL1DmMfVmQQebN9jgms1LgxSyFtvQd%2BUF4RxEglxqdNkABTJcYl%2Bhr3GpeC9DBBHPCjk%2BzHFttOuHj6U8ekY7bKWjJDZnEWXCk4NKlTxCmW3GpU4Em77FA4CXzkKskwtKAVtMkuzQzLnUqCSeslUzLhIJcp%2B47zvPP0sCJ%2BgtimIg77WZm%2Fbj99x89ki9VEuaevTz37c74ste%2F78U43xvHG%2FhZeiZtrqKX6gOiO%2FWYMKOW%2FUdnf8jSMgzJkQT9%2BEu0S0QIza59WqtmG4W%2FT9tuJE9H2J0YcKbvowSwTLsrR1Md%2FfuUx%2BhnOapSNNRvhdNs2pgXrOaBHrLT3lj0blXvJQWuGfAHoSbMeFa%2FNOvdPUaweVqqdqVluargpt5hZiTD6p%2FLJBjqkAU7doB4jPb86ryEAB%2FGTFAyUY%2BOxuTxvR6poeIMAbBPRk9EmA%2BB%2Bhiau%2Fsupd3srsLBquKWdTHlptZ1LHM06JKkV4yAo3tWwCKoXCJmmbugNcxu85xmIDWZdWS4oPGYz%2B1WLvFvser25FtjeTObSGZy%2FHhHuH2PH18KoToAVl5Lb2n%2FFvb8fIm3jR%2FBtVCNtdwim3%2BB4eIeV3vgfw0tz1gWWnEUh&X-Amz-Signature=e2739a2f0a40677a0e678d99f694a86b875c5f4679a4b6f7f8ba7d8f50d14757&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFYRYMEB%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIDRqQQYZBxpNjQ3mR5MxeDc68J6Le9IuK7pQ0yN6Ss7gAiEA5JbcZmq8rmU%2FWOv%2FReUq9rtI3nxLeeeEcz18xEHOKhcq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDCf%2Bd14Q5C0eRWnYUyrcA8CYxJS7c%2BeHkI5TNiTyr5iBZd8IoT0TvezHxjCzn9IJwF5NGGZ77wBEHLgYwoEtTb7U4l90nyq5H3eie8P2OFenG1PCQLioO6GOC7eytrJfnB%2BdScWHsnU6JYMxxYrespkfkGJxPILoxZ5ymO9hW%2BX7Ag5JUE%2Bf%2FuM7TZZmMHtDjW9OBSwt0o4iTl%2B4694q0P2ESyHH%2FdsaCH2AoPDKyr9oCj9pwqD9%2FLAzY2PO59zxRhEM%2F5q2wMA01KLkudUg4o4xJZG8YY1%2BctyNK4OAEbdvmSDOK8J0Cod0Z%2FkgKY2m87TBHupDYvsbnERQMww8J2jxNpcn9a06QL7wmfm9J4%2Bg0uuR%2BmyVVeVcPe7xUOThRILQYkygGLl9bE6dU%2BjsSArHrONn4bGDWLgMr8tMYaLNyyCR8sIiCTs9l7thAmCjCSwGY2TVzFD2EtTgqfrihSK7GoqbQpafO%2FEAGP%2BdcloqEFThMyMp3b49U7YYMlsHB1p4qbUEKv%2B2jNoRTbWi6iNHYPYhGpVCmlr3JMHgE1tZnPSLTa%2BkazyDKwSo6wXU9IZINEDEFj5FP6ZwSvhFthhh6ZcjdKkIdOHt2VQk1QtH2Zr7Jto6VNeiT2W7l2JLLiNZwHpgwu94cc0RMPen8skGOqUBzveQ4zNwLQLXNHxtvDZ4sYkH%2BhAQARIeux2qXC6xWJ7Tvdmt2J4lRR5TdZp%2FheIWTVuddrQISb98ONggiX7atY5N4LAGPup2HSSa4cGO0ZmwF5DW7P8av5tauf5QgLVqii0HBe4NK8oSe7Gk8l0viI8QIosVqM5OePfZCPBmFu4xZlYdMPtfLxfZcvSqWZ%2BMu88xVZ3kuOP73lnT3HhZSp1fL4hp&X-Amz-Signature=1865ce536a3945e2c5278e9927c64e67c3c091114e34bcb7998a275cdca813cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SS3BV4GI%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIDR4fmjo710gbdNqPNmyPEmYm2Zu0PzKl2INa8NvlUm8AiEApCjizVHziQGd9ySUxMLD4lNaq4N2ng61oZWfH0%2B2xvkq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDEaoXU5LaVyLiagkJircA4Sji45cX54XxdQ%2FCFuAeIB%2Fvwv8ZYE7XMst4XwkzA8Y46F7ATVBeThBm4hy5ACRBi5M5PFpQvhQsuKslsElIZhWcfOExvZS9loVlqxr%2FL%2BoXcU3d2%2Bisibe3QoU%2FwkHZU6iACYw66Hh1t7s%2FvOTF4E3Ns%2BaCRiY62LEsdYiqNb5E8xxo6rFLs8YM3SkI778O5hT7%2BhEeYmFobX6jZHfva%2BEGIuN2tG%2FLGJJIeJaC2iWjpb7jwZq%2BnZWRelmLF9dcH7EgkaPiBFBQwekiCaQeto%2BboUfby5R6%2FdmVMh4BIFzxdXDS0B5U1s5zsZ14TkDAqctAmYdhHKVsqTRLL6SdUUVvAG%2BeoWoCrAOqjMLi6dVZmFMtSpDhEH1jmZZN1AKRnN6vq2ZO0Nzx4em6w1AEH2mUTbodayuULNSCWLnIs1c3YyIzyzCAuRdc%2FLxaEI9CHuogwbHYhsj3WufUXhKC1Ak2%2FKrKfCObt5zBefF74s3mg0ro7nNuba%2BbVootSZNGhQ%2FL80mv%2BV0eIrRqTpZNa6r%2FApLDABX7EXbkMNSuC%2FUWSQF00X%2FYPhAyfcruxlDiWL0S%2B9XJ%2FXhHaLBuxCg4DUAw%2Bfo69OTy%2FdmxZq1qt1%2F17BwNB1mTdp8VBx3MIuo8skGOqUBJqG%2FalMrMUGdVAHpr353gSIaHe2zvGSx2%2FgrPcJMxeOYA8n5pfBbmSxdpcXDMaWH5Wk3h3yK2wdNzhO6mytUHmcPI%2FZrTzrjba7tsm1E8ddhPbeTMbtCGDttf%2B8KwYlef%2BaNN2kyd0YAF8rZQeD7S9nGCgmsmFtOOaUTx9irnj%2BBG9Cpb5%2B0f14iPvO333GeBgJDL3LR9tY%2B0Cx8LUANZB2MR1tP&X-Amz-Signature=91698a5e668213c09ddab3ce3c8beb8a8bc296b080237f5eb49195865d980801&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SS3BV4GI%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIDR4fmjo710gbdNqPNmyPEmYm2Zu0PzKl2INa8NvlUm8AiEApCjizVHziQGd9ySUxMLD4lNaq4N2ng61oZWfH0%2B2xvkq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDEaoXU5LaVyLiagkJircA4Sji45cX54XxdQ%2FCFuAeIB%2Fvwv8ZYE7XMst4XwkzA8Y46F7ATVBeThBm4hy5ACRBi5M5PFpQvhQsuKslsElIZhWcfOExvZS9loVlqxr%2FL%2BoXcU3d2%2Bisibe3QoU%2FwkHZU6iACYw66Hh1t7s%2FvOTF4E3Ns%2BaCRiY62LEsdYiqNb5E8xxo6rFLs8YM3SkI778O5hT7%2BhEeYmFobX6jZHfva%2BEGIuN2tG%2FLGJJIeJaC2iWjpb7jwZq%2BnZWRelmLF9dcH7EgkaPiBFBQwekiCaQeto%2BboUfby5R6%2FdmVMh4BIFzxdXDS0B5U1s5zsZ14TkDAqctAmYdhHKVsqTRLL6SdUUVvAG%2BeoWoCrAOqjMLi6dVZmFMtSpDhEH1jmZZN1AKRnN6vq2ZO0Nzx4em6w1AEH2mUTbodayuULNSCWLnIs1c3YyIzyzCAuRdc%2FLxaEI9CHuogwbHYhsj3WufUXhKC1Ak2%2FKrKfCObt5zBefF74s3mg0ro7nNuba%2BbVootSZNGhQ%2FL80mv%2BV0eIrRqTpZNa6r%2FApLDABX7EXbkMNSuC%2FUWSQF00X%2FYPhAyfcruxlDiWL0S%2B9XJ%2FXhHaLBuxCg4DUAw%2Bfo69OTy%2FdmxZq1qt1%2F17BwNB1mTdp8VBx3MIuo8skGOqUBJqG%2FalMrMUGdVAHpr353gSIaHe2zvGSx2%2FgrPcJMxeOYA8n5pfBbmSxdpcXDMaWH5Wk3h3yK2wdNzhO6mytUHmcPI%2FZrTzrjba7tsm1E8ddhPbeTMbtCGDttf%2B8KwYlef%2BaNN2kyd0YAF8rZQeD7S9nGCgmsmFtOOaUTx9irnj%2BBG9Cpb5%2B0f14iPvO333GeBgJDL3LR9tY%2B0Cx8LUANZB2MR1tP&X-Amz-Signature=4a6886d8613b7be9e1f236152500f0d56dabda0ccf54dd407ea8eb8895bd47ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7ZGP5FC%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCWdRh%2BQvV0HrcPI4ylmKLWjP10chR86X9nl%2FWrgseKUwIhAO%2B1YC%2Bac1NsJfHZX5V6cmSXYcaPeSd9Rtg2GAwahyZLKv8DCA8QABoMNjM3NDIzMTgzODA1IgzhzZbXLKws%2FmIFT24q3AMoutrKCVbeCkNJRwwqw1Gotpnv91fmxlyOzHJbwWzYBh5LJDZdtdUvqKkL7YxP5b1JkHq4MuVDiYcvyG0RR%2Bo46h32jMYiBPK5yTkgdUz0mWZRG9VJPH2Bhk0TyxVzYVkbclUM7vC9fpekA2sDmCcx%2FUkUhH2eDuJ7RxGh9V2wDAJnfu8WKdkstNzRkNVRu9hczxMfaEfmiIST%2B3Bp5ReN%2FqsyrA5UrztlfoQKR6EqeZiaFXGUC6NsIqsLpvE%2FI5%2Bj%2B6zT5jDBl5mh0x%2FXF7%2FxTkNkldUTBG2idc2yro0%2Bux89cQRaxJE5xcV2a3N0qlgmHjTxQu9XPDTt59mFy16uv4vd7MHWSfb6ZWJ9n3dnTj%2BdWI3n4sdn3NTDwrSBgH0zd%2FBmpybswP2abYAJwGsH3INIHF6be5yEXiw9e5i4B77DWaqZFXVYgFYYtAOYMwHmRu06JhMHuGKxgF529IBNfvhghYiIvPCKXZJip2z7l0CVfaek42NNvksrYTPTaQMUuORCZk7Obsi9P3Ph2CgGGwUdUaBqZXFisw7YDQ%2FrNEHGhxupTAie6BVJEQblPVh3HM7WD3oSGH4%2FufBklNjR%2FqD3H0IGd3SANlyd91UX8kGuYpR6k7iXCg2rlTD6p%2FLJBjqkAXh7oAGNZcZAKemew7B4MWKGEbZZYxemeGzfrKX57llfaDFIquknk7x7rz9nIkPhWhVLzUAbPTILOdYrm8bDwIr7%2BhCKkYRIrD9zA%2BWvuc8CPuSJELAt9EMnXvXuYSX4D1cZRXTo%2FlywmAto5I00tgDcw6q8mCJniWWvuZGDKtXd12HPll9f%2F0iSwm%2B2%2FHC%2BQZZqEHx%2Fy%2BJ%2Bwg0OaEd6PwrHBdz8&X-Amz-Signature=c61567d369b152ecca46db7c55e91ed3021a6d2de00fc5d332118b5c98112a27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YY5DPHP2%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCNhciTVUc97Z6bDtrZyiXfMgzZO%2ByeTV0KYEDlAunYPAIhALez8k%2F3gFduqqDWjdiALPHArnZ3uVKpRelsO6e%2Bj0CjKv8DCA8QABoMNjM3NDIzMTgzODA1IgyFOlzwqjTcIX6ZM3oq3AMyL29E4jDccY0HYfjNRg1ZSocr5yldB2ej1bi%2FS8pzp99MiazRMVywm2riczAz0nO62KsW6441bqeYeqMdN%2BBd2JrAqjAWKXanlK0HvfbmDKG9mZXKbj5%2BXYkBzUccKnVP5hFL%2BtkAufueV2%2FnCcpJzoqHkbt8gdS72Tp4Wc1apUhYZWwHG%2BIzZm5OCraioisGVDyCsaXkh1GVkyHG%2FpzV948ejKLLthSNkF7tV7ANN%2BlRIMvp%2BcY4dY8cfJVqX0Zw6hg7c7B80pbrzT1%2B4kVVa%2BD5qub%2Bv900devYQEZIiTf4Ux3pan83g5ir7RsFKPy5TYEPVORsdsM%2FCG89MHhQtR62ZmCBB5zxOLVhW9hJ06Y%2F6x%2Bjn1WtXNTNzWjQeefiRdgD9q3yM0wpcGUeF9p3sZMC6OKTqpGcRcvYvVGUXO4HEIqifICfZjuccoybSyI2RCwqnRKmU%2FJQp4dFWzQU6fcWuODzNIjMZSuVGtEHHLlrdTRRil1KnwWd5kWZitmUzWqg1O6HKZIr5CTbU5tB%2Bl8z76oZ9RAncalQuJ2jVjeVxoe%2FjoghytgdR6sKzGKvSsXBU0iGH8sh0Z5CaXdiNwHHSYv800w6wJ3B%2FM8kgoUJy0cbhG%2FP0jRycTD4qPLJBjqkAUPwcuWIte%2BWXg9U3omBhGaVe%2FbGYBz80qXVe0%2BcDI0mqMUiLZi8e7%2BdqYWHUGL491%2FvMd8F99cPpkaVI8jniM3G2TDnCkNw4VJOgxJuUD6wJlfL2ZM91Vil5kbnRIWfPRBxNK0n%2BQ4z8fAoqaTYODZmi3j2GutEYqdf4PP32gfh7ZsLECjvDXVfLCW301zdFw6BENH6XLqE8EL6XK%2Bd%2BLBZfuj7&X-Amz-Signature=54e079bb04cd9206607f91f2eb24ed7b0070548edd67b0a75c46203b8af7cb4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNCSDOQC%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCiOEx9Ktuf0QvyOikFEYleBmrrYEt1b9dIBujynf83lAIhAMYpfMQ5zQWRWN0jOq221Wb9VhWtdj4Puq8Afnz7GGb8Kv8DCA8QABoMNjM3NDIzMTgzODA1IgxeSr51ldpJVDgrJWoq3AO43mBeHzanUHe3BbbTZB4%2BaOV3RwVpCDDMGmp4fS%2BTQfoLAwdgbEiXb5IN3QBMVcP2uj5IPHnoTkXtyJpZf9F40U9Dp%2FqvE5gazdpfTCv4eG0IfR2bYzxKlx%2B01HtNY84RjZPWHTIzekCYLeE5VEiqMpEEaK2Tm67Ehs2Jegns%2BTYIDf0Z95xgCw1jo01Yd2DQ%2Bq1WIhnQC6ualqIulRjGtGmzpAvYK7wFjl87cJbQNEUZnw8JiJCDxexqw4jgH%2BY73k%2FNPOCH40mlyocjYjYufnDnFdz4QvMrpVaYPz2rzxCGC937itIy51Aa03Xy%2FVtr8k%2FdErBztIWuo8xxKlXddJdFNTLpF9ObvGTVaU7GfGPRMJOjCic78sV9%2FAlwhvPT1mGQMvagmXbnuCBMassOtRq6v7MscVdhfSy9CGdT47liG1GGEDagyXfBFnscH8gTELsKPZMPv%2BcbO2FVSDENd1Hp7aZPSakkvI7v70n3IXbOMnMmUiMjJypVPMDy4AQQ8pC3LA7uwvly373U4SBH3%2FWnq9u%2FqPR6Gh%2B8AxPiI2cM0HM%2BW272jsNzdlniDYtuEdkJA6VQVh9l1%2BXCDLlygPsSGJFQdz1z9wftv36HYwTeArBvrFHNw0FkpDDkqPLJBjqkAXTrmpyAH14qkzG9BZw9rEBu3dmQsh9CH2gffGEHOqL2rmLkCm2KoF4AS7Qi3UQxyGF4qEAtSbRRnooggwDvvfpuElnRFajGwSMIxLiEbl2mgZTGKFdVDlBZyPqy1Kk7sckd9N8pxeMGQx8NIKZd68wPURHkHd63wK7y5TFACx1HNn0lAMMhU7oNOtJmhv6Tk4Kplejv0Lax%2Ba2rpWRpMYNEhPZ5&X-Amz-Signature=7494bb592b51e0c7bd5e02c22293860f2db9f02239f60d0564d4c996b505f640&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6SDEEQB%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIF1DcXJVAq0bC6Ze92Tcy2hAiVpYMblbbcgaKzJCK34ZAiB9%2B0xWFGcE4q5wAopmRpOZokaq5Cixtg%2Fy4esQZHD5Uir%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMylt0qsq0p4rbpgEJKtwDwV9mhXS0D0yqslel61oybKsxFOjAUOIS536HjK8KI0d0QIRSFSypcadVUxljG%2FA3TZwnzGMRvvf3WHstbiZAP4t%2FVgeRTokh7uoR3B5urKpNf3Fq%2F2AWv8JOcPUzX1zB9Klye4fusRPm%2FjYpqy9CY23NX3itIo7hmijay%2FfWGLid3KUqKgza%2FIMlBmAwYRs9W8iMzysBzW3NjABz3e3Wk7HSze%2Fq6P%2FsFq3H3e8l8K%2FNIzTE2f01klXO1fs5yVdllVhZot%2BEKYHUOVLp46o6xM1nJSbLP84929x45e2naPApzQxDD6sL%2FBso2TUFzbxYIZRdV87Vhhs0FOCJT1s2Wf2BaUW6kSWyXu0xZhC9u1qP9LduqGQp4PMnCJWOgicjpPk2%2FlZAYYoqZMvCMFNLlQ4pSAV6vNJl5W9kYEMY%2Buu%2B426HrbvJ2zJiUuTv%2BrBm2DsCiuAwQvr%2FsSJ2aaoIYVRZvpdZuLoC5Pb6JEsFk%2B9Y7GW07a2OCYSDvm8UGkJbsSksWaTx20RltAq08IN7%2BwPW45ZtBPMyWAHDgeo3CJFfaartN05hxXX%2FHHzBT8iJyi57346IYWz9ijn%2B0jepo4KkBDs1LXh6qaj4XXIU%2FxHaH%2FgERm7SOE7H5rownanyyQY6pgGfgs3FP4UBArIE0lw4BaKFE7oXh5VVRVxuFX%2FhH60RrZaVwpxeWZmKJBLJVpX8XUpAkLfYRqX5h61HfhQVgBNLWtscZDC01Oq%2FAI%2F0rxtfXHHC4GXsLxIg3k0eScXzZp6rxrKsWvveYpr9tBJuw4GZH89UD12zm%2Fuj0XhXPuD6ana36CrR1WJ%2FfjS7VprT0wOztXcUvBE9bI9fRjv4tWQGRyGevlLq&X-Amz-Signature=cafec4c54f89e7858d81b816fb5fc2707b5bdfe39d1f1be6703322f94fdb82a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6SDEEQB%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIF1DcXJVAq0bC6Ze92Tcy2hAiVpYMblbbcgaKzJCK34ZAiB9%2B0xWFGcE4q5wAopmRpOZokaq5Cixtg%2Fy4esQZHD5Uir%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMylt0qsq0p4rbpgEJKtwDwV9mhXS0D0yqslel61oybKsxFOjAUOIS536HjK8KI0d0QIRSFSypcadVUxljG%2FA3TZwnzGMRvvf3WHstbiZAP4t%2FVgeRTokh7uoR3B5urKpNf3Fq%2F2AWv8JOcPUzX1zB9Klye4fusRPm%2FjYpqy9CY23NX3itIo7hmijay%2FfWGLid3KUqKgza%2FIMlBmAwYRs9W8iMzysBzW3NjABz3e3Wk7HSze%2Fq6P%2FsFq3H3e8l8K%2FNIzTE2f01klXO1fs5yVdllVhZot%2BEKYHUOVLp46o6xM1nJSbLP84929x45e2naPApzQxDD6sL%2FBso2TUFzbxYIZRdV87Vhhs0FOCJT1s2Wf2BaUW6kSWyXu0xZhC9u1qP9LduqGQp4PMnCJWOgicjpPk2%2FlZAYYoqZMvCMFNLlQ4pSAV6vNJl5W9kYEMY%2Buu%2B426HrbvJ2zJiUuTv%2BrBm2DsCiuAwQvr%2FsSJ2aaoIYVRZvpdZuLoC5Pb6JEsFk%2B9Y7GW07a2OCYSDvm8UGkJbsSksWaTx20RltAq08IN7%2BwPW45ZtBPMyWAHDgeo3CJFfaartN05hxXX%2FHHzBT8iJyi57346IYWz9ijn%2B0jepo4KkBDs1LXh6qaj4XXIU%2FxHaH%2FgERm7SOE7H5rownanyyQY6pgGfgs3FP4UBArIE0lw4BaKFE7oXh5VVRVxuFX%2FhH60RrZaVwpxeWZmKJBLJVpX8XUpAkLfYRqX5h61HfhQVgBNLWtscZDC01Oq%2FAI%2F0rxtfXHHC4GXsLxIg3k0eScXzZp6rxrKsWvveYpr9tBJuw4GZH89UD12zm%2Fuj0XhXPuD6ana36CrR1WJ%2FfjS7VprT0wOztXcUvBE9bI9fRjv4tWQGRyGevlLq&X-Amz-Signature=97df49350c54e854199987b51fb75a75febed60212519ba492ccde63c52c5b0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647HK5XK6%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQDCGmpGqaRM2rhb52lLONL2%2FdhfCT5iGqth3YuJYEy18wIhANHpnsUqFT8P%2FSDPPsDzbOwsHo9%2F797O6hVUp47rvpMfKv8DCA8QABoMNjM3NDIzMTgzODA1IgxPuUuqx6LvIyaWqg4q3AM9R4ZT7SbujN9DO%2BHa7J59mrbs8BoQAtgIPobcJ%2Bno%2FSalo9eQTjSaHIskZTTUp0WFfgQDXqVMIhf0tB5XHcwmYvfda3KAL%2B8breV1yTFtjmsbUg8iP4ujsSi%2BkXp842xqEpFwS2v5C%2Bpd0uW87%2FVZ0gnZEHNhWwd9TDLfV61qV0dnMe9My4GhbYq92VHTpCI7%2BhwOgfRg3mj7PMUU3ZZJEttGZkr5ZknLAYOJ3IDN5IYMCyYqss51UT%2B3v%2Bt1d2BjrGXaoh6s4gatJBxJln%2Flk1A0HaCT%2F4OF%2BqYNL4l5Mw8eEE4jCrdiQraXFAVIh51ZV%2FHENrlANss4mJ1PlJJGekhE%2BE093WtwRaL%2F3GDcJqNl%2ByQHGjIaBDeLRvuNAy6k5YG3MCg2XE5bdlLLDSk522hgy%2FbLkjyeN9VzbZRLIEXKu3di9CY6JvIKZaC6%2F1L1ZN54VPvZOCLmeuNMjoJ%2FDYZAkiW%2B7UTOf1I2JZlXkjpj1VxhkqBEkiApPtxFb8aqJW%2FwJGOlXIoJ033PP%2FrVHOgPaJqTA6NrVIzJIoObCv7VHrXo5VEUYoj%2F38QO1ioyZscDgTYCWFR9konpUNs%2BBkK6ArGWNO9C7o1AU3fOrU6dD5h77c4L3nIdQDCBqPLJBjqkARuB6H5%2B7SrRChdnzV26gnnQV0LTpnZdW2Ed4kwqXOtySurSu09hVHgDrLP1UtiPy0bd4%2Blsp%2BnYm6xu87jkGqBEkUgBhHiXiq3UTaa6yniCO23flqA%2F5UT19TURf%2BnaI7pALKMsr8ypOcd1yfKThgFOD3UjakxI4XYetJFuDgx2u9Phhac0jzjJ1BwwrkGq7XbJFbTDM9vM%2FS5zv3fBjIXcTjbl&X-Amz-Signature=a853a58ec840f5bf3185777f30424a993c3e4912c76266a4573f3151a3333dc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663U2Z26X5%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIDdgscTpR7p046PN0r%2FGXWmFU5a2WWtFI%2FnMpGsLo9nYAiEApwU5K%2FnkHp35neDMxssV2V%2FemKGhH5ghKT9VozrfC%2FAq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDFQQbBs%2FRo9YAByBMCrcA7%2Bz%2Bzq2xyAoQ2y%2B4DRQlNC9l7Ztw61ik9Wvc6XkwfteueGSxpuccjVZEkzkio4cNfnfUv6vyTjCmpTkEMcBSqcW1iAAMkezIv1lQAYmZbEfVkcKUemaLuQLw28UpuLiQRiQDuNSm5vd5jLSq12Ds5uVexzAFghEwZfnOVuZrfv5ngIzxvqvQ6BX7WmKiFe2dZ1ZRfzC7kYVL2j5IRjpUFmx6M4CEmftkPid8VFbFRaeBM39auxN3C3QZlF9HFcWrPGJrPVVZkIe3aw5ZRZr2oPjjj0TvttxNqXbWlpIyx8XxA9FkQhkIfPBtRPOr69WENYoUJ%2B%2BTcPCKqHlqR71dczsV7Isf3vCuyGwLtC%2FjFg3NbfNeli7YF8d9oPrEXI7S9yOJaaDE7qi2yRGdNuFalnIUzbmIMNHu908PavFv%2F7396Vi%2BZONe73GZ8thplB7Gk7LsG22rpeOHCs5kbv%2BrbDNeAhc5jJ9Yw3AWg7ancsDRsoXvax2PRB9O%2BXeIXJ2%2BdCH8IJLMFIi4Xe3njlrFyCWMW4Av8X3kgR24WsrmGN%2FD0qxQL6MHc1lfpnIjM4nrvMNkPHvyxJMqS2h4c1vLI8HElH81cemdoaBr88scaFKIEJJo7Ddd5%2FBvF4iMOeo8skGOqUBBwvC6vvNzYWQ%2BQy7GbFb%2BQD8tIev36ZlGDk7ZwF5mSaMh2CCJv%2BDulAH8jXcxxk%2Fr3zGqZ8tGTQiZMsRHQZ2zqTsHk%2B8gWyZ3Jkdu3q7wnL%2BTnyoFQn3gZ6GpN9E1nQV5v%2Bh4CYGXHUTtVXJOCGicvvpxEU%2By1PTq7ZhwNXaFnggDtRXCuEOpbKU%2FxIOG%2Foa3BUdy3YqlISZ0L5gvaklLI%2B2xqwY&X-Amz-Signature=0548665f248cf63a3e1672486772fdcb58d55c5c340c82d06fc08034b887f1d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663U2Z26X5%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIDdgscTpR7p046PN0r%2FGXWmFU5a2WWtFI%2FnMpGsLo9nYAiEApwU5K%2FnkHp35neDMxssV2V%2FemKGhH5ghKT9VozrfC%2FAq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDFQQbBs%2FRo9YAByBMCrcA7%2Bz%2Bzq2xyAoQ2y%2B4DRQlNC9l7Ztw61ik9Wvc6XkwfteueGSxpuccjVZEkzkio4cNfnfUv6vyTjCmpTkEMcBSqcW1iAAMkezIv1lQAYmZbEfVkcKUemaLuQLw28UpuLiQRiQDuNSm5vd5jLSq12Ds5uVexzAFghEwZfnOVuZrfv5ngIzxvqvQ6BX7WmKiFe2dZ1ZRfzC7kYVL2j5IRjpUFmx6M4CEmftkPid8VFbFRaeBM39auxN3C3QZlF9HFcWrPGJrPVVZkIe3aw5ZRZr2oPjjj0TvttxNqXbWlpIyx8XxA9FkQhkIfPBtRPOr69WENYoUJ%2B%2BTcPCKqHlqR71dczsV7Isf3vCuyGwLtC%2FjFg3NbfNeli7YF8d9oPrEXI7S9yOJaaDE7qi2yRGdNuFalnIUzbmIMNHu908PavFv%2F7396Vi%2BZONe73GZ8thplB7Gk7LsG22rpeOHCs5kbv%2BrbDNeAhc5jJ9Yw3AWg7ancsDRsoXvax2PRB9O%2BXeIXJ2%2BdCH8IJLMFIi4Xe3njlrFyCWMW4Av8X3kgR24WsrmGN%2FD0qxQL6MHc1lfpnIjM4nrvMNkPHvyxJMqS2h4c1vLI8HElH81cemdoaBr88scaFKIEJJo7Ddd5%2FBvF4iMOeo8skGOqUBBwvC6vvNzYWQ%2BQy7GbFb%2BQD8tIev36ZlGDk7ZwF5mSaMh2CCJv%2BDulAH8jXcxxk%2Fr3zGqZ8tGTQiZMsRHQZ2zqTsHk%2B8gWyZ3Jkdu3q7wnL%2BTnyoFQn3gZ6GpN9E1nQV5v%2Bh4CYGXHUTtVXJOCGicvvpxEU%2By1PTq7ZhwNXaFnggDtRXCuEOpbKU%2FxIOG%2Foa3BUdy3YqlISZ0L5gvaklLI%2B2xqwY&X-Amz-Signature=0548665f248cf63a3e1672486772fdcb58d55c5c340c82d06fc08034b887f1d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCQA4K3R%2F20251212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251212T230119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIC4r9bd3yQmE3NjLAThgwVkzQavPLSA%2FuQUWYvHquCOtAiEAr70Q4hBar3xOUQ57obb%2BOgJIhfmUeWHC1%2FSKCjvVEU4q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDJYjhTYgQcmMU0FnlircA%2BAlaaGwvodKTzgrM4EUtW5HYdQqff9OKLhaZfL9P2Vk326Gq43nuazWax%2Fa9H1L%2BRPYMxtKTugtBwmeDryg37%2BOIbvbAVph%2B3V1J%2ByaTKRyENZ%2Fhe3AGAeTczTZzvJ15%2B%2FXI2UQkrBMWMO0axiMvit%2BQg3t%2FTTbuSwVPfeYFvZz5P586XRP0qHIaQCAv9qMRL72z21WAnhuIUfn%2FI27x%2F8p2kTHhKFPLN8cu58lQ2DRrd1b4aiN3RpBNrt6KjFWMg8ZL4CkA6OEJ9IR2rMurGkYa0CoykfFAm5cptoBMLLdkdCHojPUXD%2FwWYSGHbYY8tIvF%2FT7jEWTAA2GHFUcRUZ7pf58S1hG7JFI37wHsBhbd4vLEmHgjBqfT6Gtrl3I7oELiXCsu0sdu6vbIz9glzpx%2BeMmguQroXYPobS0lj5053%2BLU4tj8VpmWo79xMOdq%2BbKhBFbBMBayQfY3PcqNh71jCLYlUq8hKE%2F2xVlPg4j%2FxroacUihK28dMWXJae1g%2BPh%2Bn9mGnqOphXiPoV4LtgIlrHcwG3MtNi89Vn72IeGhVIpCfeLnOvHQaXn0x3%2BFTFyw5PNxpAGkTKFTPzIx3qw2XMJckbykJ9djnZ1uHRyXsDfcXAtEG6KWNwoMMKo8skGOqUBSycmyVKqZlwyyyNWVdILWhya%2B4JLQz5b3ZXDCX%2BvXuJsCUW1wnkIpTiCG5SY%2FVkn0NOU7YzaZ8joKG%2FHFMtE3rBd5%2FHqkKmEF2T4mF665mUV9fDSU%2FuLDlvr2ZPJ84OgZHSfagxVEOQXVCdUDFbTcNod4D73XUS5t9gFblRizEJPlHTFiY0NjjIyUj1KoDBvjbcWsKW%2BdGBgi%2FFKNCkaC1o%2FGhRI&X-Amz-Signature=a3077c97ab5c36d4075316daf92c80a7324a497f55d31444175a5473608528d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

