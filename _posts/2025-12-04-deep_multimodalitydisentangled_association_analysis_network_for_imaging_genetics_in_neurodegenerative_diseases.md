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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R75MCSZE%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFsGHXSSudafSzYZ1xWDMxz9jZGTuInr43KIfKaf31C7AiANJ0sfbg5no6Sk%2BNYUU02K1SlEsYY65y3OhbdRr%2B9GUSqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtw5fo5VwiOP5voIwKtwDmHhAAcLBiGhXT4Gv24zsvh0tIe9gon1ROzYncNrjFrSr3fLgNjMIiG4SJajzp4u0lO4B1FeolMEUh7O6yXQ3vz57d5ThBUrGP0YEeCF5jwz9hUZd1o1nnUUShwUOM6IweskEvFaKbIk9WI5LwZEduimVFDA4dpkLWeNJSu4zJepIAQljTe4Ytbb9JVLh5vJXx1Jg6VOxlhEc0zpLr56kqC8ePMONQB%2FiBPOTsS5ZXgkZkk2oiELGDsITWrKIJGopV7ghmlgjAe7NsQKlb0uK2gj%2F%2FP2h4ZE6wtqw3yVx4LfidANLsUM9UcviOZVi3ZgfcZ91SWMtzRPfPhp9hIi8lC%2BeIFDjdh0w7UrLvab8JuIuAv0b%2F6adfjd1QbnjyynYlLq9MhNSN1%2BO2omQ53Ei0ssJhZAqrB7FpHeE9H9IzvbsALyy1stdudwVe1s2nzhiCzRS3znEFb7M3VCL7snjwsnLD7okEt5E3mZhM6%2BgstAHG4EhyUpviBdf0e%2FnmR%2FofANTPD43%2BC9wffE8KgzGeAw1ydlDXlX7PQI%2BadcwJqEPje%2BUGRYLiipeaQIN%2B2aAQYWtfkJDYs7YSwl4Qpl5lXzjrtARvGetVvfCj8S0AlXVVIpLMGk6aAMfN%2FAwt4aDzwY6pgEGoRO9IMfxtXMQwf4D1AU4YgULRnxlqSvwa3pWA5MvndIgYWYNcXn7D5syTDp8hUVj31I3zfXf2ragbWo1iaHcXnuxUu3vKZnuT7K55ZtjXJN4Ld%2B4ZmRHV06UqxXN7brA1iZtiqBuMrBxEI4kBYstLWBvuR7MYqBiHEX4UYFBiY2eI7Z5eVYgO%2BOnxP3sxnaxa8EnZ5%2BoFg0ZnnE0dON22L8ad3yU&X-Amz-Signature=7249387902dacbf661ed165f02b87f19d0a3cb8130bbfd33e01507a40710538f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R75MCSZE%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFsGHXSSudafSzYZ1xWDMxz9jZGTuInr43KIfKaf31C7AiANJ0sfbg5no6Sk%2BNYUU02K1SlEsYY65y3OhbdRr%2B9GUSqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtw5fo5VwiOP5voIwKtwDmHhAAcLBiGhXT4Gv24zsvh0tIe9gon1ROzYncNrjFrSr3fLgNjMIiG4SJajzp4u0lO4B1FeolMEUh7O6yXQ3vz57d5ThBUrGP0YEeCF5jwz9hUZd1o1nnUUShwUOM6IweskEvFaKbIk9WI5LwZEduimVFDA4dpkLWeNJSu4zJepIAQljTe4Ytbb9JVLh5vJXx1Jg6VOxlhEc0zpLr56kqC8ePMONQB%2FiBPOTsS5ZXgkZkk2oiELGDsITWrKIJGopV7ghmlgjAe7NsQKlb0uK2gj%2F%2FP2h4ZE6wtqw3yVx4LfidANLsUM9UcviOZVi3ZgfcZ91SWMtzRPfPhp9hIi8lC%2BeIFDjdh0w7UrLvab8JuIuAv0b%2F6adfjd1QbnjyynYlLq9MhNSN1%2BO2omQ53Ei0ssJhZAqrB7FpHeE9H9IzvbsALyy1stdudwVe1s2nzhiCzRS3znEFb7M3VCL7snjwsnLD7okEt5E3mZhM6%2BgstAHG4EhyUpviBdf0e%2FnmR%2FofANTPD43%2BC9wffE8KgzGeAw1ydlDXlX7PQI%2BadcwJqEPje%2BUGRYLiipeaQIN%2B2aAQYWtfkJDYs7YSwl4Qpl5lXzjrtARvGetVvfCj8S0AlXVVIpLMGk6aAMfN%2FAwt4aDzwY6pgEGoRO9IMfxtXMQwf4D1AU4YgULRnxlqSvwa3pWA5MvndIgYWYNcXn7D5syTDp8hUVj31I3zfXf2ragbWo1iaHcXnuxUu3vKZnuT7K55ZtjXJN4Ld%2B4ZmRHV06UqxXN7brA1iZtiqBuMrBxEI4kBYstLWBvuR7MYqBiHEX4UYFBiY2eI7Z5eVYgO%2BOnxP3sxnaxa8EnZ5%2BoFg0ZnnE0dON22L8ad3yU&X-Amz-Signature=7249387902dacbf661ed165f02b87f19d0a3cb8130bbfd33e01507a40710538f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMJ3XHIE%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCHKQa%2BWPBoqbsnrrqM0C5Apf6zTOIecDvsiMbzmFjO0gIhAMV4Opktm8w7aKK5BFQeyPD17djvk58kpbc6AR2MNCe7KogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzIl6SBSe69BXlCzPMq3AM4blHBPuWDgQxHYrPaZJmBOUajdjNWgIe4TgTfNo0%2BLr%2BpLUa8wOsuASb%2FFmGkC8VK7yrM%2Fyggfh%2BEzXtDr4Vh2qSYao5y1T29QGhRQfWGMazW104IkwtUrS%2Fnpi16CXJTd80XsSyGc1yO9uvhD3npjC5fJqiy6EDy7cPzVxGyNOgHGiQKZenw79BDR0qskc%2F1T0mpFY0Hel45krgdrHS38DcdLrPfeGGFWWdTNTN2SIi%2BVqwPxMIs6iJDhYLPYLUvu3jxaRl4ayzgBWDBljRqHncHc0X%2FsaivmY9AodoXr2NeJjuxxjor2F98OxDULWI%2Bh%2F4yhuHfkeyfSthfuQ8WElY12BXkVV3KUe1Id4fHzo0KBhrq%2BnccNjBHXvQBwAmILwrmWeHbjTEDjL1kkrLLt1qSOnfeSDz9Ao39NIZAPnWc%2FBeGV0XjLW51dov3W6TOGfOBcR5ynL924g8dahCZg62WEL5S%2FKWIaGtoSsRS5P04Jsy6BrxM%2BTHG%2FB7YAKGWRjmWYlrS%2Bsk%2FRJokBNYo6aljD59OTsxKQ9pPrdfPS80ilOoBfxAoM4fYjMt8ztM1goaR6EDqxcjzuR5Tj8nOXHHmjvriBeblYYzkw4FZNcP2DWG8p7%2FQqtSSEzDfhYPPBjqkAcjvi94IQCanPoSGyWeZrXuihL3LOngTOwi5nl1LJV2s8bpN96ue7bBQx%2F3a0wz6lY%2B7nvyKjGUdqRi4sm1mYcOg06ll53ykc05fJEMEJQVzmq9ECDk4a3hTomwLZSYrIvLGENQKpuVusxWT3GhKVwuvUsX28%2FPGwwoY%2FSdMBCkA%2BBwexzIYE3ZxFsmhhLv0c3OiOUJFWniuYjiwQm45Oxkl7AmR&X-Amz-Signature=1902861ea81425fb93cefcede7fd947a3ca2e68e27b960a58765702e8e0bc4a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUOZ5AKC%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDQSW3iERB3Nqc2fGMvmTUp7vxeWkjObDy2E%2FsCJBoiuwIhAK0oDNFHT62jilMOqiKb4Ay7HvvK4oRNTAQz1ew4E6nEKogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxTkmPBBRWOhzYTVe4q3AMrbjCA1uUrwdv5Dp%2Fodn29QouoE8%2BzRt7SI7mQoCIBt77FdTsLlHS98sql3%2F98Smxy%2FlNYO%2Byw1jl%2FOn0QRnuKSQoYeUdujCWCI7bnp07%2BsoEBqAFb3K8MyhdeQVabtUFrM0jkKP%2FvGAgWz1rsIso2zgeEXfIKMH6u78ErTsQGSG5ISe4NY4RIJJnI9R%2FfCsEhw50vUf%2BOhdj589J0dPtSMChamug3PxYAq%2FJgDiuNVYtaySuuZkVND8olTLvOKGTzMcSI1LSx0v7YpL4pWj34J10b%2FsTVhfO3eMHxq03iznt3SEuwFBgcMHMB3qdwol9Fp69ft0JCgrJ%2BrYNOFMxZPgcLVxIRuzLtaHqxHwDHT4lnBzORxMG3l5JTq9ISCMKnGJdiH3ICEDB02HHP2tce0zHQiUr0HaQt%2BpaHL7JvkfR%2B1UJrnxPxCQTniEptignHIbZhRumm%2FEhIqPZhb4HnJQeN7%2BX6gl5y3AyDpoRRJUQYUoAKkv7sRfhGJRMQsWCBnpbWQ7Xn8LqXwM88%2B92%2FMkww4vqr0fZ6wLLGFE8bDC2PzFkklR%2BHGKI5x346NVKMkkDEYgrH%2FLrWBppZRREQdQ8skeTS70QZUUGXrtKbS%2Fk%2FXl7edHtTxjJXYzDWh4PPBjqkATnehring%2FUJCZDN7Bm6EDfc0gS%2BPvya9N8ZkRPQIaXMBR0ZnC4BGMqKVL6qxWn0diF0EAuuKWbovv77j8F1qx0aiIMvgNaz6B9zVWU1gBK37Yll6enSCTn2ZqkOppf5J627mKoWFfn5WFKctB07Y2TsRC4JnAWKa60%2FMLXy8UEMibXene5Kw7owBps%2Fav68ASmmrm%2BHvRnrTHjbyUU9DGt6ESkz&X-Amz-Signature=7a91674b69dd14420745c3f116f3dec927a6d071a63471c309e8c97100c06c7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUOZ5AKC%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDQSW3iERB3Nqc2fGMvmTUp7vxeWkjObDy2E%2FsCJBoiuwIhAK0oDNFHT62jilMOqiKb4Ay7HvvK4oRNTAQz1ew4E6nEKogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxTkmPBBRWOhzYTVe4q3AMrbjCA1uUrwdv5Dp%2Fodn29QouoE8%2BzRt7SI7mQoCIBt77FdTsLlHS98sql3%2F98Smxy%2FlNYO%2Byw1jl%2FOn0QRnuKSQoYeUdujCWCI7bnp07%2BsoEBqAFb3K8MyhdeQVabtUFrM0jkKP%2FvGAgWz1rsIso2zgeEXfIKMH6u78ErTsQGSG5ISe4NY4RIJJnI9R%2FfCsEhw50vUf%2BOhdj589J0dPtSMChamug3PxYAq%2FJgDiuNVYtaySuuZkVND8olTLvOKGTzMcSI1LSx0v7YpL4pWj34J10b%2FsTVhfO3eMHxq03iznt3SEuwFBgcMHMB3qdwol9Fp69ft0JCgrJ%2BrYNOFMxZPgcLVxIRuzLtaHqxHwDHT4lnBzORxMG3l5JTq9ISCMKnGJdiH3ICEDB02HHP2tce0zHQiUr0HaQt%2BpaHL7JvkfR%2B1UJrnxPxCQTniEptignHIbZhRumm%2FEhIqPZhb4HnJQeN7%2BX6gl5y3AyDpoRRJUQYUoAKkv7sRfhGJRMQsWCBnpbWQ7Xn8LqXwM88%2B92%2FMkww4vqr0fZ6wLLGFE8bDC2PzFkklR%2BHGKI5x346NVKMkkDEYgrH%2FLrWBppZRREQdQ8skeTS70QZUUGXrtKbS%2Fk%2FXl7edHtTxjJXYzDWh4PPBjqkATnehring%2FUJCZDN7Bm6EDfc0gS%2BPvya9N8ZkRPQIaXMBR0ZnC4BGMqKVL6qxWn0diF0EAuuKWbovv77j8F1qx0aiIMvgNaz6B9zVWU1gBK37Yll6enSCTn2ZqkOppf5J627mKoWFfn5WFKctB07Y2TsRC4JnAWKa60%2FMLXy8UEMibXene5Kw7owBps%2Fav68ASmmrm%2BHvRnrTHjbyUU9DGt6ESkz&X-Amz-Signature=0e700ae715c7e033dc9ce1eb880918294c1564e9a7bcc052dfde6e743ba0fafb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ACA57IL%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEGBos3PH23XHNfTfvJ34OHOQddrMi3T%2BinhPy0tEN%2FVAiBRM2R8LO9F1S7RGeoT6QjkvGC5i3BYm8ieknvPnCijgCqIBAi9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPNx%2BEL85nQEglqvDKtwD0t5KY%2B3pKyE4W7JU54Dnc2cjPmmwYjtAnqQl7hy1u37Ewn5ClP7llqK8JjNIRm7JTxkpZwI%2BCzdzyVJFyvU3CvG863%2B0%2FbMU7Klm0hCB91mZyqNEOABIbUdflWCQDsKk%2FnPr5vt3JGZBw0IwBl9BQhI7eBLykXa%2FCnur%2FGID64RKjMMakh1SXmi9JJ2ihrfaBFt0GqPJY7icIIFGt9CYyK0vt5DQI2UKGPWuvA05z9Xsjr2vl%2BsanGORWvCNcQM5xjXNBdZ3kbKRciOViCFVU7%2FjA5y5rSlgJulKxDBACQqLHRazX6C6xOtnLjbO2ZUtId9fRgleWBOsduy7qgDh29jM%2BA4doVI%2BJ1YHP6t2kvMkHUstY0EsuU4X1x67FO0zZcVuLnj4eGBKunSoSOOgBnyMrpONlAhTNk1eMwZB%2FWoilL01rOxfEZkx%2BYW9kXEMSk9h2itF%2B4tUQYCjBVKiZxEgfNveeIkVGWgmNluOLQxBs4tqN9rb88zEG0WketPsWXrxKdbkp2nC454YJ0k2oWvG4fXHMoj%2FTW5S2zXZCn6dJxRlnjvmuld5fmhdZk1MTeZFM%2FvySOcinophChKpn9azW3rd%2FJvboBiBjBLTSLbFFf5vgC5szjzWRo4w4ZeDzwY6pgFUy4hIXFk%2BYePdSPi4ztXI7ityON6Ew7BJlBuiktxPnJy%2BoqLGHMtaloYZ99QarLLGXGWwd192bVnc0kSrUTAr0DbdrMvArp2Ut0wg6OXl%2FPy%2FluFciNybWzz9OuLDOqqrT%2BGskp7zztTKG0K%2FhJc31116%2FHmXlu4oqrhHe4Zt%2FlRiIJ8eIqGcKOfeVl%2BPPaQL8E1JWoPUHwCK%2BZLxeIF2PibTf6pd&X-Amz-Signature=fea6e93117a8616f4728f23201d6ab9fbea94661a5a91d1c5cba1d0ac4e84c12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662H7PJ67A%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICQpuLKAuXO%2BIDcIHnfm258n9vQXNg7OXzbk3dula4G%2FAiBqZZyBjIaTQnyGuhprEw69fIrkDEbMU2fQvgqM1uT%2BwCqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKg35Ta%2Bi9SGcUycSKtwDxSLY3Pm%2FqyLf4nDImCJPjVcf%2FoLKVjhuaE7H%2BJW2HOGzvuDVKJlOgapB3SwkLzWIns%2B2Vs%2BlHIq6NhcJMxEctrIszIrC%2FeM379xj080jPkfKfhUBjRG31RpFvbaGnkucxenAhYWZ5LU8LyDHGAxMb5ZQ61Ow4rXVOwl0QjbuVqbTRbxNfJ5TvoX20paZNruF3SVXzhfraQffAhXBoT635H%2Fow5qPEArTq89W%2BzA4EOVaFNYPNkXTEt1v8byGcR2xFdevtazzplbZfhMsWBmxcMow%2FY21BLfgjwNk3BrZcPGsPQ%2BhjfFZONnYP0%2FYwW2%2Byrpx9fa8iqvJjiHGSE1F581rC%2FhpkRXn3HHcsT5UftHkrZU0%2FuS79X%2FARSblk2e0sSKRefXbIAJAbHA1CUfgncs3Pnml1lGh8vsrKZtGI%2FK2iGfjxdL4e8Dway98CRe5goqr6uTkcGUtEfg36xR49%2FT5eSy1ZrHbaK7M7ia6ILg6hhkbTIK0fV2ElchRHADJz9Bqc56JlpcyhBw5qo%2BRk4GWqnVOqD%2FlF6SeeP87DOvloBe2JG36EC6iXAMUNmu8o0zVgXRqjf8mipTeg1a%2Fv6kpNv%2FLVAXD4EFKNsNLjZHMUmQwrALZs%2BuEiF0w2IaDzwY6pgHFisKOPVLnmsonC5TAmQ%2BudYTNlfTeIafDTUHyninyBTPms5QpWdGv2rsxiTve2Sm%2BDys9hPPS71iewwt0zaRTSW%2FFtHUgiKLOcyfOvu8NvpB3uMEE9SjmD52WFh7X5pcKTiTMSzmlyc3ql2f%2FlUuIpbRRHRW59nS%2BJkNel5iVm5QU6JT5q1YZHBp%2Bs5VNe%2F8wf%2FFyb1C9J7PGTgwyJoeucIoCGTFp&X-Amz-Signature=a220b0ad76e04311bd3d9fbee6fea1c9e69e79ac912cc78bde04203ce94a19fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLXV5NV5%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBAtc%2BTheFaHApIyabVdogTRgjok5dUvRGmtxNOmUMTzAiAeD242pZQrCGhPUrku275hUOKjWRvH3Rm9U3i%2FHA0wGiqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVRb%2Fb9S4edw4dmtkKtwD082Tr%2BGp7jhDtNQre6qYpDeZb9oeACZ%2B3sDb9hguHx2vzINj8%2BlMYil4eQ7qSnqbuAXF9xuMyEnOI1YvI0x5JT2v9T846V0f9jkkK%2F5bXujzNaCVV27GTFjKmbckNIifemjVBkiWdo5E51v34fwmYFMmprW0mbjP7ApzhvAEVfgILT6YRE6SIFQ55C5Py2fyGsSlX0m1xgG%2F5DjfFVS5kZvQeoxYkaOsNgm%2BCQPLlyCIYA5easdy0ZhPWh52ZfhLOfIG7oO%2F7Y245EH0mW1J2g8GLKZFJ%2FT160dsPBfvyagNppSA8N76bwwvFBO2Cx07%2BBt2t%2BTl%2FAeRCnBabF%2F6M2YsK%2FWSG29qCAvOZRL0b7DTc9kOMGitjw88I94pFYV2KuD8f6g8jMLSmRyQTIHmvUu0ZZ9qEHp%2Bsm%2BelSBhZLGdK9w%2Bc2JGLBqnW6Tr0Iwr6J9RqI%2BMhOwEjt9TNbcd4AOfrB1QNXsJEY03EO1NLDwvaNLExay%2FnYDf2C%2BQvEhie94b%2BkSjWzJJbqEWq8nYo1GDwW9v4miN%2B7NjMH3Tzti9Byp1jgMVWMKdBkbGQuGJ3Qfl14pKLEIBAR%2FJCdxJFodZfnC%2BNEaYsdl0tB%2BsrAzuM5DhCWYwUwTKekQw7oWDzwY6pgEmtWyjZ8BLCIH3t8AQJkGmUJ66vEHP%2BHZbn8CB1Ua5UzjmUeFnbISEEQK7ilFDZutXSF2x21g7HExuepKzw2NTkOIgx0iAMmWehiycyJr%2Fcgo1PZpGVoqmTpVy4kv2XMog3YrZcIVnNfLfdjD9N35ROWlaEalghR7lC%2F2cYC3Dy3Ofte5MgRJrrtY9PlA1qR7yj1QF1UkobsJT%2FARLgyd5xP27uFhC&X-Amz-Signature=be67c0e31fcb50b434dfe8941c5b45e1c41c02bcf92139eeee64aa01413a56da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EMWX63N%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FhtqC0moZFqrwldtB7AWUYvP6rKaZh34WOOZ0QxJFOwIhAJaJqKbvMhIHrDQ7ESAtynvCxqUPbDx2cW1f6uuq5Ev5KogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxUeSjB8fOvu7rPfikq3AP6jvjGt6nSDMpHuYi0oSDHidPDJqXAfZSb93%2FWt94BG%2Fx9q6tHUQTZhcIv2ut6oBu8sz%2FACuupq5FeX75IWL7JaS5KQhSAtfbZDmeNSvY0YXESJLjcPv3249avLkTPamyHwzaiCQ4l%2FzX%2BhzV1UofjxFEszYtzpUfE3NifPIfnNl%2FeZVSczoPlOic2hAoVrVedafU6Lt2gTz1pWjlEz1G5Ji2cVvFR6aujZoMf9HArxQs0wYP%2BM9u8etkFiWvU6Y6xJTpEySwpZALyOxewKb0KJ41g%2F5lLuGa99LNfb8B6ZtJT%2Bk3KDY1TNI%2Fh4v96jAIjg25rFrfRjipZdLCOmNE9XwWxmcCpdpfkIiveCaKzAaRL%2BHKTwk6BwhvXpjBSwKEUwveuCFv0Vov7waob5HxRjm3XKs1RYU2oE4hANlCQAOhc727NR4LjEyiZJ2nytzasq43XZa7JwbZuKWICv50FejrefGojYc9Bh%2FGiX49YdayKqsRyYxrweZ%2FbRm3oe2%2Fa9St1HF4CV2UYXjB3cQTJWzPMXpKlmc0qB5Y2HaE3T9CTI51xvmo4%2FY9JjjhmKeB4H4RDv3dxT%2B13xyiX8jpGB4Dv8bizanpabfrtGMj57JQg7ipA9k128aqmYjC3hYPPBjqkAUxhzm0c8Na203RS7N9vU9YoyPVhUiQ9RMsZlkBectpMe8mr3UGNy%2FtWiN4IsdZLB%2F%2BANVQqd63SZ7YWSWyK88zl8XxaQKuYjiTDkFdsnh0tv%2BvxI%2FmH19DB3KDB23DbOZ1F0Zepef3SZtsd%2BnlmeeSzHlHiKXXZn3eMI9vNwW6DYnm3ileYpkOtzoqoHoVDfZd7gvOtPTJJ%2BQ1OAoJyZIHmpPOf&X-Amz-Signature=56d786dc9269c49e043c6f48c7722e1ef1ce28dd1ced38149c1bc2b511a4c7ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EMWX63N%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FhtqC0moZFqrwldtB7AWUYvP6rKaZh34WOOZ0QxJFOwIhAJaJqKbvMhIHrDQ7ESAtynvCxqUPbDx2cW1f6uuq5Ev5KogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxUeSjB8fOvu7rPfikq3AP6jvjGt6nSDMpHuYi0oSDHidPDJqXAfZSb93%2FWt94BG%2Fx9q6tHUQTZhcIv2ut6oBu8sz%2FACuupq5FeX75IWL7JaS5KQhSAtfbZDmeNSvY0YXESJLjcPv3249avLkTPamyHwzaiCQ4l%2FzX%2BhzV1UofjxFEszYtzpUfE3NifPIfnNl%2FeZVSczoPlOic2hAoVrVedafU6Lt2gTz1pWjlEz1G5Ji2cVvFR6aujZoMf9HArxQs0wYP%2BM9u8etkFiWvU6Y6xJTpEySwpZALyOxewKb0KJ41g%2F5lLuGa99LNfb8B6ZtJT%2Bk3KDY1TNI%2Fh4v96jAIjg25rFrfRjipZdLCOmNE9XwWxmcCpdpfkIiveCaKzAaRL%2BHKTwk6BwhvXpjBSwKEUwveuCFv0Vov7waob5HxRjm3XKs1RYU2oE4hANlCQAOhc727NR4LjEyiZJ2nytzasq43XZa7JwbZuKWICv50FejrefGojYc9Bh%2FGiX49YdayKqsRyYxrweZ%2FbRm3oe2%2Fa9St1HF4CV2UYXjB3cQTJWzPMXpKlmc0qB5Y2HaE3T9CTI51xvmo4%2FY9JjjhmKeB4H4RDv3dxT%2B13xyiX8jpGB4Dv8bizanpabfrtGMj57JQg7ipA9k128aqmYjC3hYPPBjqkAUxhzm0c8Na203RS7N9vU9YoyPVhUiQ9RMsZlkBectpMe8mr3UGNy%2FtWiN4IsdZLB%2F%2BANVQqd63SZ7YWSWyK88zl8XxaQKuYjiTDkFdsnh0tv%2BvxI%2FmH19DB3KDB23DbOZ1F0Zepef3SZtsd%2BnlmeeSzHlHiKXXZn3eMI9vNwW6DYnm3ileYpkOtzoqoHoVDfZd7gvOtPTJJ%2BQ1OAoJyZIHmpPOf&X-Amz-Signature=b23bca349825d7b79fe7a22fcd635c13a752a806cc1cf45bf148e72fe7e1804b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USSRSH65%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114656Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHRE53gPDlRylRyZqDMnhUOEdEqbcQuH3Oi1uVCBXB%2F6AiBWorqoTfpsiagRt42wFurbSyZeIH8vYZM0bkwFXMKn5yqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgxEoh98xDYhpUuptKtwD%2FuVCu%2F1h0RDO8lCxzH5c8X1kznfKPUCdj%2BvxSdPAM8d2U73KTzznzyjfJPRMdRMhrnngiehiLAf3lRF%2BBIwAjHCCdfk7NJ%2FAHiEp0%2BYHXt%2Bb74Pqr9AhN%2Fz6i%2FR1GadBZM2XJhE4Rz9mx5Dc%2Bqh44xfuUcVicgyFGCkEoJoCefFL4cyEwgYRc8Pya3o3i4bxTjAwiph5cjx03fKg6MkiWAnASiTsEGwPJ3MmB9SrMHNvvY9g%2BmHbvK6xqtMKfZgrxhQovm3j1HPFA6NKTA9gOTtztE%2BjeY9u2jvAXg2DlYxbaVF3oRdEgO3nBqeS%2BTHZcAODiU8w07B69jTm7PoALDF1zxot87O9iTmV1xmlchJ55GjVHs8TUK27WN3RJLaee4zvAiqLvqrEotAFCSDRWAoka4ovjycNVT%2BeIifFkk3vATLboeFdaAdI9G3Sfsw2MCs9k4JBUzT33EJPtaNa2ZL58hp1mPMLstBiwG%2FhpGeVJmtQyRtdmCOB0gA0rw%2F2qasxSzr7ZzMWg06VDXGQ2CqyfvoTxocAMDfwzcqAjyNGfFQZ%2B6TfGNqutW6KBZea3T8kxPHfvhcxVUD29dqPP134TrfkduCcRIIgRBZOF7UL1IYeWb%2BKfKIQwRUwxoaDzwY6pgHaJnGW3819E3CNNMR2EqgZ8fSooA%2BTr7wdGCbNjr1A0%2BAjAP6TOBhvdYQy8sc2fk%2FNMvKMynx8NSVk%2FHK35d0jPbCcqYptIsAX2t5u96QXe4jiFAb5IFQLYqXDBQTXUuvYgXcBn9OW4yQKwL%2FQ0U1BLn8GYsHW1Dfcla%2FTjKqrEmoRUZ4LRQczawK%2FwzqLVjvaxULYYZV%2BEXu%2FClSTDbR8HeaSgDeO&X-Amz-Signature=ffdc90a8d7af5a01ec113c7f7110938725bdc3275678879efce12c84496db0c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIZ6L5F4%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCkM90l9THPoUnMKTeXhZJi4pdlaix4VDvEHrFwQOU2KwIgNqxf%2BY4Eca5axO1kMhVtHcYCoRN14ARrmq3s6KpD00EqiAQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLipTY2LrlhjoLcLBircA98M6h3%2FnJ6Dzix0z5fYD3MCsr3%2FByJY22Y5I0AtlrKxxnTCM6LAvLEQi9ThSpUGFtNMpB3FFvjt8WCVh%2FOsNLEdrJ8Ww8dcxSOvcoa7y4j27La3mrI0iLIsbmwF8lup9ZlbS7C8TNkPwXsXkDntStTzFgo2QTTB0PCbHP9vgQRopbfpbm6ZDnR3q2pLi1swh2Mwj9piWg4S4Pb3C4z8uEExhxQ8IF9qn7q5vRqTDko2ihODMUOwVvljYejtaeoopXknW2vzQcnDe0CEm6erWQ8N6WW45HODR6qm0v4AHEf4w5E1O5WEEyYwGNU2cmOdBY1jbqGbHdY%2F0ro5e6hKX7lY2s9tlFa4wpP0TUC89ZTV%2BQvPpS8Okh5cLLbYFO%2BitxvfSkK4MMj4BlBSm%2Bgo6Cp1FTTItgMkWiGmLkexCkbMVfe%2Bxhj5QnlgWBONfUWoElsyKUEtt1qQ0r3%2BangxiXgWpE9viHbFNOnrwOHm%2BV47Dcm0a1jfOfy5I8qQLaCxJ9l%2Fv7awptbDEeSZvSYOT2P6tT%2Bc8YwfZE0gR%2F%2B3%2FwpHn7rL4d%2BeUi6HuhQja9eI%2BYHQzZLE8BFE61gnmbq29WYkh%2BJqv2cwhN9NjPeOU%2BAAbs53uJkZeJ2TOMm6MO2Hg88GOqUBHRL4nD59zlM7wPGCcaQxoJfbYv153ISfzlw0DLY5Xa0BIfCvMdz7MNGEdaqxM2DDWpUFvoaxKkAptfdNcAfTs3A0bs%2FIOeArTG9kZS2jQdVPiLARcqeUDbY%2Fw1dyMNppXj2tP%2Bnuaz0VuQaegukXB3K2MjqRlcc3DySpTjofmeJg9Yq4vaZyK3LGWUacXlYcIzjwzy2T3oE0lR9yJFhC9AjvvI4n&X-Amz-Signature=c6cd1f99476deae226d8843639d2473c70fc88f4626d5775eb7e6cc97cfb6c61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIZ6L5F4%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCkM90l9THPoUnMKTeXhZJi4pdlaix4VDvEHrFwQOU2KwIgNqxf%2BY4Eca5axO1kMhVtHcYCoRN14ARrmq3s6KpD00EqiAQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLipTY2LrlhjoLcLBircA98M6h3%2FnJ6Dzix0z5fYD3MCsr3%2FByJY22Y5I0AtlrKxxnTCM6LAvLEQi9ThSpUGFtNMpB3FFvjt8WCVh%2FOsNLEdrJ8Ww8dcxSOvcoa7y4j27La3mrI0iLIsbmwF8lup9ZlbS7C8TNkPwXsXkDntStTzFgo2QTTB0PCbHP9vgQRopbfpbm6ZDnR3q2pLi1swh2Mwj9piWg4S4Pb3C4z8uEExhxQ8IF9qn7q5vRqTDko2ihODMUOwVvljYejtaeoopXknW2vzQcnDe0CEm6erWQ8N6WW45HODR6qm0v4AHEf4w5E1O5WEEyYwGNU2cmOdBY1jbqGbHdY%2F0ro5e6hKX7lY2s9tlFa4wpP0TUC89ZTV%2BQvPpS8Okh5cLLbYFO%2BitxvfSkK4MMj4BlBSm%2Bgo6Cp1FTTItgMkWiGmLkexCkbMVfe%2Bxhj5QnlgWBONfUWoElsyKUEtt1qQ0r3%2BangxiXgWpE9viHbFNOnrwOHm%2BV47Dcm0a1jfOfy5I8qQLaCxJ9l%2Fv7awptbDEeSZvSYOT2P6tT%2Bc8YwfZE0gR%2F%2B3%2FwpHn7rL4d%2BeUi6HuhQja9eI%2BYHQzZLE8BFE61gnmbq29WYkh%2BJqv2cwhN9NjPeOU%2BAAbs53uJkZeJ2TOMm6MO2Hg88GOqUBHRL4nD59zlM7wPGCcaQxoJfbYv153ISfzlw0DLY5Xa0BIfCvMdz7MNGEdaqxM2DDWpUFvoaxKkAptfdNcAfTs3A0bs%2FIOeArTG9kZS2jQdVPiLARcqeUDbY%2Fw1dyMNppXj2tP%2Bnuaz0VuQaegukXB3K2MjqRlcc3DySpTjofmeJg9Yq4vaZyK3LGWUacXlYcIzjwzy2T3oE0lR9yJFhC9AjvvI4n&X-Amz-Signature=c6cd1f99476deae226d8843639d2473c70fc88f4626d5775eb7e6cc97cfb6c61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHC446YR%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T114704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0a0poQS4dGdFM1Qw%2FCSsgIz95GkMAcr%2FeIgQ43SiSrQIhAPWt19f1XWyV6MQacIQWC52%2FQID%2Fd1aIPcaxfKBbT8y3KogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwSN7%2Bo23qae0uz0PMq3AP93%2BZUikWZu0eqU0CVJaajENSXcCQ%2BQS6HCL2ar7OlkYIIUMbGmuugzdqR%2FBPUAKpA6lmHZwAqqoUyninRgb%2FUZpTmWSsd4dfLMb7a6z74ZN7ozhhgVp2YyIzjAdC3kPqVQAVR9seTJkjBat2PYvCxTslhnD5fiyxF%2Fe2WI1ZmaZ%2B93xxAPnsuvmdLXLT%2FayY4GM5TqZZkkaB4gpEmYTx4UOhjsjakivljAfpeDE%2BHB6FuwgGI62fkoFbpDTXg2TF59kM0QljQjOR0j29cpzmy0UgoioN5qcY2ypY3NNaNqVmw9KEtQZRn87zFEB6%2BEOikGqLT2C9AVlYy32U5E7XUrdXKEHNpXBd30TRn9e4m%2Fdm5u%2FtKVu%2BtGHx4Uq6LTinX8pD%2FChVaTZbD8mROyPcwQXSANX690BbcDibHj%2BLNJIGK8N4aZvQo%2BPCcesYVap%2BNzCY1uI6u%2BCKx1VMjbiYvLyFZRq11jKjzsDjujJFc54DGqSxPRykpByZGlb73755dcynI%2BZr%2BcKkx79OHoc5xgkHuSmaIXPI%2B0SE4UfVWn9ebsc%2BvPyUfhT2AaVp4E2c3CrZtH0Szm1yCf4o3fCTlHSrzCyl5Rfmnho7S3y9pq4a6H0EUV157I4ZM0TCHh4PPBjqkAeWa%2BF5Z7GARBeCEeS5kYUmwoxxbcgnWutufJpdHXNMQmHIaTGEnyRE%2FA%2BfRD6tNvGY%2FZWynlPCDYm0JDQI4ALw8p6SE5IQVCwPaRuskthV9cNzk0RmLhamnFCnP480d0lZ30BgrzLVJAD5YIlXkMljjO1hO%2BLIspnrZMYUI%2BFwVcjtBvCiPSvseQ9dp%2Bx2vrTBvvwOfLtzJs6FWTzZR7uWpQJub&X-Amz-Signature=ad1a31ae0e99102b70295ba9889171ed765a4b6f913f60e5a78f6a4f10c120bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

