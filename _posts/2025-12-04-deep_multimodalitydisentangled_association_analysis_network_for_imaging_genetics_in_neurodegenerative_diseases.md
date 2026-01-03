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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662A7THPCX%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIHEY7saCOpQdoOPf%2BEM2G2%2BiqJ3WDAW8%2BXaDSIcmz7M%2BAiB5Wa13kwGDXdGdKc%2BFhRy7bnpJXHKTVwYEVODvYcQw9ir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMIs4g%2BoThM%2BpiDxbIKtwD%2BCxftKN54H4345gNwbsztxtHsdHAaPccaTh7UCP%2BHCourUNLQT2%2BEUjwfTiy0OEEjyMa57RUUN3kFO5kqSsbBdHlQOL%2BV%2BXKRu3TSVx3VKFc%2FnPTKL76AkKxrNXIF6LhlzPjxKO8aLC3Ezc%2FNDGtIX0VsIF%2F6wSxtGNQ3am0kvvgEpjLCe%2Bvk%2FoOOQvNy5FWUkVyrlHBWb1OZLeZGjmHdOMHkgaVtBIZ6vXG%2BWUVi6O3wqv25ItNkXKmjlFl3cMXDg271zzo9A3AyLfq9sYFjyANWfMmMZP%2F8kNPCJoo%2BnfHRqIFvAQf9v2iXO2sN5gxblWrNzBR6jLeHH%2BvTbdvorg6vKCIJF1wM1xcHS2LqCDVcRNABdXvUpPaueBlHTy7hSXCwyVwY5nxLd6Jj1wquZ58StsoecH6CeZ9wv03fuWPh3Qpw6p4a91bH5jyDDSUzSoUr%2FZee8yB9VheTaOhIt6wkAsCnyWLG27A2Q%2BYJY6gv5HGPvbdmvtasR%2FLI%2F3jD6tfe1yStVp831ODUgVaWrjbCcuItz41sXcYj0yIm2TGv%2BsNrD2C3K8Du%2FKSfH5xiThJ8JK%2FWUPub74zvuzgajG5aUAqTfFf8tF%2BPXMrUZHKC8osnj%2FLFOBlVjEw28zjygY6pgET%2BTW%2BBWGDLv162VPIWnHYOHeX3nM7ziHCMGZD%2BOG%2Fl89bc8%2BYt3CcVY4WCWMeEl97PDn11S0nTpOx5fmGQnpj3JtRpXG3QtSBrEQADgf8pPuFfAZ0KvIQKmZkgWRuYaCg7gLu40zDMA5bGlOTeyEcLVH1wbKKay7Up5k85Dt%2FF1tblUA7ZH0c5HTuUC7RT74m%2FNvIOMEtyU0o78CaWbVaA9jOD4pa&X-Amz-Signature=a85670cab208e84065aa9de83acd476e3739321036bd0408a552c6960c6dbe98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662A7THPCX%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIHEY7saCOpQdoOPf%2BEM2G2%2BiqJ3WDAW8%2BXaDSIcmz7M%2BAiB5Wa13kwGDXdGdKc%2BFhRy7bnpJXHKTVwYEVODvYcQw9ir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMIs4g%2BoThM%2BpiDxbIKtwD%2BCxftKN54H4345gNwbsztxtHsdHAaPccaTh7UCP%2BHCourUNLQT2%2BEUjwfTiy0OEEjyMa57RUUN3kFO5kqSsbBdHlQOL%2BV%2BXKRu3TSVx3VKFc%2FnPTKL76AkKxrNXIF6LhlzPjxKO8aLC3Ezc%2FNDGtIX0VsIF%2F6wSxtGNQ3am0kvvgEpjLCe%2Bvk%2FoOOQvNy5FWUkVyrlHBWb1OZLeZGjmHdOMHkgaVtBIZ6vXG%2BWUVi6O3wqv25ItNkXKmjlFl3cMXDg271zzo9A3AyLfq9sYFjyANWfMmMZP%2F8kNPCJoo%2BnfHRqIFvAQf9v2iXO2sN5gxblWrNzBR6jLeHH%2BvTbdvorg6vKCIJF1wM1xcHS2LqCDVcRNABdXvUpPaueBlHTy7hSXCwyVwY5nxLd6Jj1wquZ58StsoecH6CeZ9wv03fuWPh3Qpw6p4a91bH5jyDDSUzSoUr%2FZee8yB9VheTaOhIt6wkAsCnyWLG27A2Q%2BYJY6gv5HGPvbdmvtasR%2FLI%2F3jD6tfe1yStVp831ODUgVaWrjbCcuItz41sXcYj0yIm2TGv%2BsNrD2C3K8Du%2FKSfH5xiThJ8JK%2FWUPub74zvuzgajG5aUAqTfFf8tF%2BPXMrUZHKC8osnj%2FLFOBlVjEw28zjygY6pgET%2BTW%2BBWGDLv162VPIWnHYOHeX3nM7ziHCMGZD%2BOG%2Fl89bc8%2BYt3CcVY4WCWMeEl97PDn11S0nTpOx5fmGQnpj3JtRpXG3QtSBrEQADgf8pPuFfAZ0KvIQKmZkgWRuYaCg7gLu40zDMA5bGlOTeyEcLVH1wbKKay7Up5k85Dt%2FF1tblUA7ZH0c5HTuUC7RT74m%2FNvIOMEtyU0o78CaWbVaA9jOD4pa&X-Amz-Signature=a85670cab208e84065aa9de83acd476e3739321036bd0408a552c6960c6dbe98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7PTQX22%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDB5N%2BeNNk0YdlhVRdf17q3tVgf70J2Mk%2BVkVRZpafMkwIgIIZLPIwg%2B7Y5CesjWiT05VXq3J9x56l3tysjJt3j%2Bn4q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDHOBa8LaPTf03PnJ4ircAxVn9h%2B5hj%2FfxoDn8re%2F7BRKwqSCDHrEYUWse%2BNMmIVXXdwWB9Nous%2FatYP5WPiQWYhiV6pGmjDxAEMOvfPj7V8V%2B%2BRVTycebei9IDQJRx8NvqbYqp2p4qGZVhKW48RThK70iEf0bNMbDQLTblmwN4%2F1hOSSqSLF6XG0VR57e%2FXFZt%2BwCDjSNVKurttDigy%2F8FeFBfNVDUhvy6fupgrIz80FHY2kvhv7IpFoVb1CFNEpK%2B2fx5PZ%2FqxG0yNwh2aFmsUlBrZ%2BnilSbVp8829NT4cyKmy5EXyyLwpFs8JLs3oNWPvkHu%2FTyVLHuOneVOjd8VxcyPDI9AQSdM21Juqbw%2FBRS4rEShmh%2F3NqY7tYaMMEotkCMthCmILDrFNt77jPaJnR12bBKbt%2BMJn4jSdOKxbD%2BJ20o7SIiIJh%2BrXSgTjZKg%2FGfwS68tjzhGvo8cs1tK70Fdn%2F8e3JKOhszZix8rydgDr1l4HyAn23oYKE%2F2N5pcC%2BJCk7%2Fx8vQECG7r7trEs%2BYccKMvj0JSNkL1ghWqeEj%2FyM5HVI6wL5dN2fiX6BMRXJQEFZa8Yw6IU6hNlrvC251xulZh%2B8BAPUeS5EMmwgDJhOT3jwLMxBcnbRkVukBxkwol2YqzANy9GAMJ3J48oGOqUBUVOpHdM8GW8%2BK%2BsqF%2FIseC%2BEByumkTEk7c3J%2F%2BuhywWoof%2BoJrcX6oF2zXn%2F7P9PzkqepnZq9w0zx2Exrq4PAyf1f4eTiXBMBwBVJ3LeUQc1uN2rRBPMLsroh5qx%2FOtqSalbvkyOnY2H0w1j7Qq8khyFS%2FKDNqOnqGDcjzkSoLfBhw%2Bo5scFeTWeEBnq%2Fj5s6lCB6epSVJwKRjCHcMvD1g%2F6iCWi&X-Amz-Signature=f3a48a2ddea038280c5c22dd5fadd46c60c8ff4cecf6c806f81bd16509c33e73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIAVNG6R%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIHLrs1b5ZX0NFO%2BSROdFgBMDhMTlMrEVvD6MEo4Q5U3yAiAt2iN88xYiDP9eTL%2F8xmaRUwYKc%2BzteNdEHl3Lxbh7Hir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMTBUbxlc0nQPYvuruKtwDecVrfDXdmSugkGgrPXzyFEZ5XjWnskiCNzwLMW3TldV3N2QSvDDTBtQY4NqZVVrUuKW3klIScn1E%2B1UeyXbobhjmwem7wPI9KT8hdnAV3eQZ9ELve5sHkwglEsgCXyn2Y8Udz8q4OEC2%2F2saEtnbfV8Mc0xrZUzolFELTGTktFCfBDZTpE7Ceh7zCjj9gVKqsdIHeaI3E2MKPhDSeXLPBmzIRuwk%2B%2FJGyoIXqlCAjpU0L8lkKESBKe4Ef6SXhXskj4Kac19p1dLQjiw65HbKw2lSAR96GyDAd4P07L35PUnX1Y0o0P6pGo2SfM7atPEPBkb4JH8f6PSTbLzLQsCCCMQZT09CxgtKqKewP5gfL%2BOHJzJBmw0BDKf7BnbZO4qXSHe2RA%2F0kG5PZcSMun%2BKJlPsgd8DwHsMAgxPeX%2Bbx%2FPZfsSbAQATETrQBmusk%2BC00v7jwnaJJiRUveHqItYAKHcBmUL3fbzGOAPoo4om6Ur8UZfDcTFkW%2BI1jaulyfTa4YJTyUanSustjvJywlvIYx%2BOX976kMYnaOJ5UdBE9TI7nMi0MV5LpSWArj%2BJxC44kaip10eIkLzmaQ8RxuE%2Fz9HivbhUis%2FYHXycFWsyIqPJM52AtOLWXLYciJgw8sbjygY6pgGko1L25pZratwWNKazGzLxE98qE2T014ARKqJyI6Cs2aWgMLGUvQAufGKy7De2LeFTVJSF3RTcWRsgJsD8%2FuNKuAREWFoj9oD6qKqZJkGezJesHGiRPiwTLvTYC%2BX3g8fZwRx3pZ7IYZl%2Blre2pxTjH%2BRhMHEWGUzVdLKYdR14OTs2G7ivjAaAOICq2PSLZjB39Q6bzA2W3zeo%2F6BPXM0W6J0uD4QN&X-Amz-Signature=5820a6fe4862de44a35f9a4ba79b3a417209f8991362edba2e92830dd9b4452f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIAVNG6R%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIHLrs1b5ZX0NFO%2BSROdFgBMDhMTlMrEVvD6MEo4Q5U3yAiAt2iN88xYiDP9eTL%2F8xmaRUwYKc%2BzteNdEHl3Lxbh7Hir%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMTBUbxlc0nQPYvuruKtwDecVrfDXdmSugkGgrPXzyFEZ5XjWnskiCNzwLMW3TldV3N2QSvDDTBtQY4NqZVVrUuKW3klIScn1E%2B1UeyXbobhjmwem7wPI9KT8hdnAV3eQZ9ELve5sHkwglEsgCXyn2Y8Udz8q4OEC2%2F2saEtnbfV8Mc0xrZUzolFELTGTktFCfBDZTpE7Ceh7zCjj9gVKqsdIHeaI3E2MKPhDSeXLPBmzIRuwk%2B%2FJGyoIXqlCAjpU0L8lkKESBKe4Ef6SXhXskj4Kac19p1dLQjiw65HbKw2lSAR96GyDAd4P07L35PUnX1Y0o0P6pGo2SfM7atPEPBkb4JH8f6PSTbLzLQsCCCMQZT09CxgtKqKewP5gfL%2BOHJzJBmw0BDKf7BnbZO4qXSHe2RA%2F0kG5PZcSMun%2BKJlPsgd8DwHsMAgxPeX%2Bbx%2FPZfsSbAQATETrQBmusk%2BC00v7jwnaJJiRUveHqItYAKHcBmUL3fbzGOAPoo4om6Ur8UZfDcTFkW%2BI1jaulyfTa4YJTyUanSustjvJywlvIYx%2BOX976kMYnaOJ5UdBE9TI7nMi0MV5LpSWArj%2BJxC44kaip10eIkLzmaQ8RxuE%2Fz9HivbhUis%2FYHXycFWsyIqPJM52AtOLWXLYciJgw8sbjygY6pgGko1L25pZratwWNKazGzLxE98qE2T014ARKqJyI6Cs2aWgMLGUvQAufGKy7De2LeFTVJSF3RTcWRsgJsD8%2FuNKuAREWFoj9oD6qKqZJkGezJesHGiRPiwTLvTYC%2BX3g8fZwRx3pZ7IYZl%2Blre2pxTjH%2BRhMHEWGUzVdLKYdR14OTs2G7ivjAaAOICq2PSLZjB39Q6bzA2W3zeo%2F6BPXM0W6J0uD4QN&X-Amz-Signature=2036f48798aa20b11cd183f6d6554dd7cba0e5f6588b84946e9345868f76a713&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5UPIM26%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCICFC5sUVpArzNLSnbUCQsFe80yUfOS0Iwee19GrfI45LAiBFc0A6khCDwhxxtxUsW2Q7E%2BdkA66iEG0XDBFn0FhTTCr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMObBnTMHNo5GQ0wRbKtwDUE5q3Sfdz%2BWxvx8qcK742Kj54XcPlFRsyUg9UHHKLqb9%2BqzNlxbsMVU8zB5v2vIE6oHWl7mrC5f3%2B9Op%2B0P9xu8bcXY%2FS8HCzzubKL12vo3I6kAPaXOJyFL%2BjxRGJu4m8olr0rezJSFnvtlMAeWr6K0Dy70aWycYhHoxBhNT4cPHwodgsEFyuO9ToZRaJW0S1yi4GmVarzPdgUYLVfaCu2WMDx5HoZhdTOhd4cgZKOidACRU2rMegCSbsMdjlddieJAXQRcdx8Isk0Q8oPzVgPZE7hRqY8bsw7LCNxBFMqQkYzRFv5b4AuCsyKTm%2F1oYCE52fB8FiN2goiC1oqKmtZLm7puqziJqAKBehNOOei%2Bx52q6ERUn1Oa%2FMYMslA4sWjFNhmw9t21ERilUF1HoxoCwESYBq0vLEgVwxaMJ6E9XAzAQEJlNMQFpHs3Iyu7FfvAbCEXLpuaj4QEFq9tb%2BaS1qTrK4jY%2F7u0NwbsYcK8sCknXwgnG7QgITALZaE8QIN2MGzJqGLX1qZ65m%2BqNz0sNHYgxt1hgF17U8g6MXvC6o%2FUa%2FJRw2ApKUhJTMCy8F2XWQ0%2FbI4AoY2qobaaOrER8sMxfkUb7iulhPXU%2BkpwwjiLm7K%2BMV93Kmlww8sbjygY6pgFhO4CFQAStO9v9%2FMAVqMCURaXVRAbr6sIUga9TAqTFvUGMgjYYi74%2FfiZ7SUgNN8Qy9i7f2taYPnidhUqDqxngxT82Vb%2FulHJ6H6iZXIlStTK5WwKCOPu1ZjvYFJAwswNl45l00EkNV2ZjWnp1bi%2BDBHv8%2BZjlJnysBk7ajzclvEKH%2By8LeXJToD8Ki%2Fap28P3BcMP9sk7EppzWkwBa9APu9LmEIYJ&X-Amz-Signature=e9ab8b4083605a2dfe9ec34090b02b70130e749012ec4863bb6c6492bdec0611&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAO64C6B%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCvSLqif1WaaBiyo3h1ybx1be9cfwIsFFlkoHsNW14BkAIhAMPsNtXgu%2F0LPj8%2FEMGL5fi43hqTBhVfgNWNJirDWSPvKv8DCBMQABoMNjM3NDIzMTgzODA1IgxyhVBVuoxU4fo4Xooq3AN%2FW0MrhF47Sqf4VF1M2xr%2Bis5XPduaiBZC4a9zQ4r0LRVGIcJye1Z5IJUHYxWT8qXNDxwlF9KLWRttGTPZewprGLNt6wq36JfyufEvmuPokTF%2FUPM3ygHFCNLMrtKeCvGEg4XP33K9zJy4DXBNEKEgwVcfvUUKlsZzxxUv4j6HKGYRieEhnvXdzSmKK66tSv1bMmUne4QfJzTc900pqH0ZWsH4EVTCeYa%2BFIar0BzTd6bPR6LzsE1rbX5N6IWslSDgQz7CB5Hi4Ktp1JKR3TVyx1JWCyxanq5YqmQUIeBdFodpow5SdzbZVcVG1%2FcdGFE8unT7f6Y7YWMDHP1iP2B6gbjv1Gx8C9KM3HATH%2Fbbk9qI7Awsg7jB7Pp2%2FZjEV2tirW28SmH92K9DDTJBupaU7A%2BjQVfBXpMHp18zGu1WBzaUQlKJKmtrWoKJKLhWRHZnjfXlJgprgXFgoDUold%2FuRTDeOPId9uR0Rn0rbxgPc5uIWiIAkVM3qr7o%2B2vqw1Ot8yYHyOhvbOd%2FSWKP1l%2FenRPYWwDE1ZZyG1v4jakDBK9uKS8n0rhRbyblEyj%2FgMx5X9mD1Yffo3S7XaLRexmQbmDYx7LkyxOjr7svMdtPyQ3Oad6uOaYui5wDQjDBzuPKBjqkAYroOCvmXCMLb1NSywsJuLfTwLvBfhGUQZX6bhgv%2B%2FBq9bYx8LwhU991%2BnyK5N9aqWZy52YL5JjMTeJwmEKCwCbloOFuv613N8SmflnGh12skuzqqMw1IiRFgVtRVPRyTPhqG3YmUhvRO2Qy2NXgHQexEdLMayvE49JWP49xfIeJjK1Cf4RhIQLsyEaDHisJbX6vO43ORixkqlu%2B3rmgwhdwsSfZ&X-Amz-Signature=c3391f983b773a011e98cb38a31ec64ebc941dbc5c9e17704dc942e45ba4d807&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4MG4P7N%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQC2KDSXRUb58kjEKLnPKjtZKYghoEiJHKJr6KXhOQrUCwIhAOILZbjlNGsG5xJc4CB840TndhIjvJRxyy4yoWjIaNeKKv8DCBMQABoMNjM3NDIzMTgzODA1IgxMbNrNGxYepWNZU%2F0q3ANR4BU0e46vYc%2B8J%2BjH5tOQKj4h1wJYy%2Fz6XNlzjoqT6EMAFRBxk8s7Xi%2Fv09Dy3ARZVKuCRiNG5tHIA89PsaJzISS6XSpjZGLOVtEmTyh8eLWqAGhsEz6R5Gt5vws1dItyu9TzaH7fSuyauzEsXHW%2B4O9JM081HToe4pCohidqh69EZLNpnOrwCuvqViDnTZG3awK7B28Pz7S2y0Rgrf1nF%2F0kcROE0Lr89yp%2FxraYDt1BlNf2GWB9B6b4O8geQPggaOkzr9R6%2FcDdL2boRAjmg2rL%2Bo5enqgXdysNfoB%2BSxyxjN46UtrLy4DvUP4qtxBszrJP4zE0Ql%2F1wBuR354ndURVHep9wG%2FYCStn5FjJz5I23wXjJfv%2BwZNH3lOHvOCsYXR%2BNMptuNaWas9ic%2FbDEr6%2BVTLCOFuRcG63SJ0DxsREf99ueehyrc%2B8UwUlXybbDpoehVMNBEbJi6lB8L3MAgYaW0QQEsDIA7pc9PLODuIDX6CzPuaRx8zj7kVRUi6DiZRuw3NCjZPheinfUKtfns0t2IGcBah6mfw4tctfJaT9bE7ZmkqipNWqK2Sq30MzLgJxrSdjjPHVgmLzdFswIp5%2FMwirNMdByzJtTP2DgitanLoekKX90GwaqDDqyOPKBjqkAcJyhp0FuPI13tU8kwfCO0NnNDPZnHsZDnU1yWvw6SQ%2FsDmqVVWMOzsYCtj4VnZceN%2FjtEIplnXXj3rqWDtrWPZ%2Bd0EFOlrGTKIDW6o7WejquwHYcaZISlb3ZKtsNm1CFQcr%2B1Xuz6lBBis%2BpZ3LtSiGQMO4Br%2B44mjgKRU5fJH6cS90av4qBJvpJYGTCK0aVhj%2Bj1aKxgIXhJZL972Op6uvg5dW&X-Amz-Signature=bf7738f1134541671617c3c5687e16d7f45870414329339d177066f10115e1b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VT2F6KNM%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCnkC22ayNufE0kRvVK3ePmy%2BDI%2F8KJG5dgRvOfBl9HIgIhAJ%2FkvqLJmGYxVKdtffElomqKw9WBTYMPssrFs1057kmBKv8DCBMQABoMNjM3NDIzMTgzODA1IgwE%2BPTE4haCpntegywq3APoFVErJNL3rugVkePaKOzXQkBiu0LFd8XG40Ibkq4DWe7JvIEZjxobb6t92Hh%2BNdc41lY%2B8BlGKRmfyd%2BptNOYCdS3JJPRqkpk9YXkzgwYEKn%2BQz3LtWxFMwnTyB3FJE%2Blp4hNdm9ZgVedAwkKymtOBLaRAUyiD5iAYNgYXHNfvwd3dKZ0UL%2BQSWRUPUMlr82j6S%2FmUMn9gdtqLrgn7sVjMQqneFa6huJ7XmoR0ar94sr57Al8%2FNk3V4NMe3h0zP3NavEKlSrtTnZJ9QXF%2Fpvq0duTcRUA3sJaKIOf5slwjvxi54r2X1JwfoC3bYXZYbNS26f3i7Zhc2%2FClDYPGK39R3dFSdBUFgOEQR1wJgSjgAgX05IaZmVV5ZOoASYMqH3%2BdFTM0RXwXhufGFioK1D0QxZzu0JF9f08ymvwNQJOcRJ7kbsTKAuVpqDQH4Z2%2BSy59o0mmTWb79kbN%2FtL57ngVK8Y7bZwRT%2BPdF33nuqt7VC66OBuXzmSFh2keblx24JC0V8QqXj9RyFc%2FqO6KkL3mgznndbjyoUg3foAvoDQVQrZ06htk5ZPy0bxhLY%2Bk8fqSuzuqG%2FPppffwAUWlk4nrvW7vH5az3qGODofGI54djzBpgJfu4DXBjwTFjDfyOPKBjqkAeDz9OjPQvLzqClPNDZXe%2FjgnVEWulPbM03jjn7vx2%2F9LaJMREB5ni6KKuk6SOEsd6icefck1%2BQFAAGPV2XkSVLmJ0yaJtnKLGb1fiYiuPSzShVYCYbY49GrPvcN5TQIJ12dDD3NMyZdjyXD42nMvus4%2FVM5GXjvMu3n%2BG2AwBaaHYh6DVVDxAn5e7txeL%2BVtRg6x6%2BvQozbJnHYPUpcwcihQjFw&X-Amz-Signature=5e5ed501dab63c47f1ee4f97155bd568f764f346561edd146281d9992a665eca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VT2F6KNM%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQCnkC22ayNufE0kRvVK3ePmy%2BDI%2F8KJG5dgRvOfBl9HIgIhAJ%2FkvqLJmGYxVKdtffElomqKw9WBTYMPssrFs1057kmBKv8DCBMQABoMNjM3NDIzMTgzODA1IgwE%2BPTE4haCpntegywq3APoFVErJNL3rugVkePaKOzXQkBiu0LFd8XG40Ibkq4DWe7JvIEZjxobb6t92Hh%2BNdc41lY%2B8BlGKRmfyd%2BptNOYCdS3JJPRqkpk9YXkzgwYEKn%2BQz3LtWxFMwnTyB3FJE%2Blp4hNdm9ZgVedAwkKymtOBLaRAUyiD5iAYNgYXHNfvwd3dKZ0UL%2BQSWRUPUMlr82j6S%2FmUMn9gdtqLrgn7sVjMQqneFa6huJ7XmoR0ar94sr57Al8%2FNk3V4NMe3h0zP3NavEKlSrtTnZJ9QXF%2Fpvq0duTcRUA3sJaKIOf5slwjvxi54r2X1JwfoC3bYXZYbNS26f3i7Zhc2%2FClDYPGK39R3dFSdBUFgOEQR1wJgSjgAgX05IaZmVV5ZOoASYMqH3%2BdFTM0RXwXhufGFioK1D0QxZzu0JF9f08ymvwNQJOcRJ7kbsTKAuVpqDQH4Z2%2BSy59o0mmTWb79kbN%2FtL57ngVK8Y7bZwRT%2BPdF33nuqt7VC66OBuXzmSFh2keblx24JC0V8QqXj9RyFc%2FqO6KkL3mgznndbjyoUg3foAvoDQVQrZ06htk5ZPy0bxhLY%2Bk8fqSuzuqG%2FPppffwAUWlk4nrvW7vH5az3qGODofGI54djzBpgJfu4DXBjwTFjDfyOPKBjqkAeDz9OjPQvLzqClPNDZXe%2FjgnVEWulPbM03jjn7vx2%2F9LaJMREB5ni6KKuk6SOEsd6icefck1%2BQFAAGPV2XkSVLmJ0yaJtnKLGb1fiYiuPSzShVYCYbY49GrPvcN5TQIJ12dDD3NMyZdjyXD42nMvus4%2FVM5GXjvMu3n%2BG2AwBaaHYh6DVVDxAn5e7txeL%2BVtRg6x6%2BvQozbJnHYPUpcwcihQjFw&X-Amz-Signature=b167edb2c88bab8181e7c45a2b32260fdb205c6164811111f6800c54878cb2d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFBBZXLW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQD0%2Fy%2FywWvMe2TbOMq5XF7TMZnZW5hWL7YLKNnGp5SVngIgagnd8Jn2M5Kl3EofEN2JSaVJjk0I9e8N75QovAj8KLsq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDIlwkWZAGQE5LpsjmSrcA2IQXTHKIS9jXaYiNq3osjxFoNPXLulrQRxNJ3wlx84x0oAd3XatBjY3Ew7hEL3QHM1PoMxMSSsebgSWqCQ8t8ISurIKBM%2FS31xU2lhI1zxOXLgRZmLeANZy3%2BtzXTZd98Mpm48c0J6Etn%2Fli943No75zaBW%2Bmw08O5RN8vRkvH6yTMbWYowZdxFVY%2FYOsm%2FSAMHupSF1HztM%2BDosYpjO4y%2Fhstw2LjWbn66UMTAVl5hSNpXB2DycyB5BAbfGil3xmUzJ6mkR5hZAuRgHJQs5a6vg5ngaQ5mnxeslmUek26hmZbjuZR7sR%2FrcCqB3oi8pLIV66L6lF8IUFylg70pI%2F487tPeQ6dhJcqdWymGtst1RaYr5gvG5c%2FioGwZbwxBDpOsZSAzP9mxU%2ButsqD4twUc6cNjVeouDZnU6erH1I%2F2QiCrssqCkilXBPwsbDw6p7Mahb8hlKgXlt7sJnwIbnp6dHkVFMQ7kT2OWa7ZyBn5trlU81WSguXLd1TRKH8%2Fxwy6%2B5SNCWespoGewdcchq6tMDpVZ2yzQkcXA5MfhNFIcEeiGKf8q6LDRJ3aQ5ieazy3x%2Be1oH%2Beivp792pp%2BYW4CgLdQIXKSUqAnQuXjWSUABiqZgjR9GlDb2SrMMTG48oGOqUBDotV9WM7awMtDB0M2F4zaGgmN1lSz%2FBlNn16JELsntTIIC2pV5giWjp85m9M%2B%2B1UOkRPBp5tGYAxKa9XAC%2FAwoZSBkQMFmboSutmdgXLS557QpFyg5LTm4ZnbrLwg9ag70MHa2S8DG4LfZARPRDiR7ST7wSqPPm2HIdZBjZlHQz3J7K9ib12CHcb4pFzzGhHHdv7Fjy3GFh4D%2FvClb0%2Fbdhsh9IL&X-Amz-Signature=bc1fb33887d1a4a5544fa19ee8e263f47ba1016608fd12d0010434be6bca0382&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEJNIFQ2%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIEcuY1H%2BYWFI041MvcglA3cpv8jas0Ya005BXf2kFV5jAiAcicTuIYLMMwr%2FaYxthlKtgZytb5%2F3TmVo1LHhj36pmyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMlFYDDIzU6pcj1z8%2BKtwDyvaBKlAYmBKeafYZzlJOmlI%2B0Yezvrq7H6UviY%2FT%2FlaLxfb76s5N4l%2B%2BMrWkHOzyw1xA32Q1q6wuPrsd5AqfI2UTCR3vHfTiJaFQ9LzNlHHyGfFidjk8Il87YTc3sx6goZDpIzh0ynXI3V%2BL%2BlKPfA4gNloSwoa5Ac7ejSvgfZlTlFrpUW1fze1CF0EkNN1jib%2B3j2OOPbY5MYq0Pew0rz8i%2BwTFSryBU%2Bhh9iKS3KoO959oyBL1MJNbK%2Byif1gAf587JEVSUsHfo7D7bGpz7Xljn9ECIwvTJ62QlbQPOz9LEe045DgxsNRy3F%2Fv1pCDy%2Fuv1VCk8tosq74Sr7jQGlcOBWz%2FqwkRxuBlW%2BR0Jsn%2FFhu69FViW1YABWwduz%2FITwFo1os7VKiYKKbS7gyAWKz355Z9WEklIaQ7i4ySGOE7NDQBnCDmVgiGllHHdXDvqzqDNKCUB6q%2Bq7NoNsnHi6fP9lm0J3OsM15aOaaqp1VNhqFZzOcHUY05xUkCpn9xSNATwNqw75HfNi30kHLEbFL57KiPzNezwh%2FIfEbO1ZIvYuML2VsGEeE2WoEwG%2FXM1RDZ3JBZY92C%2Bo1D4eGkM7tL8UrhNJK%2FbDzbY9TUkUsqVxtagUX11%2BNsDeAw0MTjygY6pgFbH0Znr%2FLw04%2BNZwTwaAf4ceM2STO3U7RGxVFLMc26tnIvHNWtXVFFi2IlsVWGbF0jAueNJs3mosKIZxi6KHzWFtJsR7HjrJlJFfD9iRV8HZCuBCKx89wIJfuTihmHCTk2MFdCBb7KFFeky5wi9SRHwNbUmGa076Huc4tjyzKqYpQMU5k7R%2BIyNtyoZFRvPDR2k%2BAGg2RHCilYV9Rd29Ete%2F8CIyws&X-Amz-Signature=586a770498d5047311cdb7e38c73a8bffa7d1541ddbe93c8c83f1234ceec9a4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEJNIFQ2%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIEcuY1H%2BYWFI041MvcglA3cpv8jas0Ya005BXf2kFV5jAiAcicTuIYLMMwr%2FaYxthlKtgZytb5%2F3TmVo1LHhj36pmyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMlFYDDIzU6pcj1z8%2BKtwDyvaBKlAYmBKeafYZzlJOmlI%2B0Yezvrq7H6UviY%2FT%2FlaLxfb76s5N4l%2B%2BMrWkHOzyw1xA32Q1q6wuPrsd5AqfI2UTCR3vHfTiJaFQ9LzNlHHyGfFidjk8Il87YTc3sx6goZDpIzh0ynXI3V%2BL%2BlKPfA4gNloSwoa5Ac7ejSvgfZlTlFrpUW1fze1CF0EkNN1jib%2B3j2OOPbY5MYq0Pew0rz8i%2BwTFSryBU%2Bhh9iKS3KoO959oyBL1MJNbK%2Byif1gAf587JEVSUsHfo7D7bGpz7Xljn9ECIwvTJ62QlbQPOz9LEe045DgxsNRy3F%2Fv1pCDy%2Fuv1VCk8tosq74Sr7jQGlcOBWz%2FqwkRxuBlW%2BR0Jsn%2FFhu69FViW1YABWwduz%2FITwFo1os7VKiYKKbS7gyAWKz355Z9WEklIaQ7i4ySGOE7NDQBnCDmVgiGllHHdXDvqzqDNKCUB6q%2Bq7NoNsnHi6fP9lm0J3OsM15aOaaqp1VNhqFZzOcHUY05xUkCpn9xSNATwNqw75HfNi30kHLEbFL57KiPzNezwh%2FIfEbO1ZIvYuML2VsGEeE2WoEwG%2FXM1RDZ3JBZY92C%2Bo1D4eGkM7tL8UrhNJK%2FbDzbY9TUkUsqVxtagUX11%2BNsDeAw0MTjygY6pgFbH0Znr%2FLw04%2BNZwTwaAf4ceM2STO3U7RGxVFLMc26tnIvHNWtXVFFi2IlsVWGbF0jAueNJs3mosKIZxi6KHzWFtJsR7HjrJlJFfD9iRV8HZCuBCKx89wIJfuTihmHCTk2MFdCBb7KFFeky5wi9SRHwNbUmGa076Huc4tjyzKqYpQMU5k7R%2BIyNtyoZFRvPDR2k%2BAGg2RHCilYV9Rd29Ete%2F8CIyws&X-Amz-Signature=586a770498d5047311cdb7e38c73a8bffa7d1541ddbe93c8c83f1234ceec9a4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZKMCFWN%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T110119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIBUzSej8HYqgORA%2F6pznsSbea0D3rOqmBz%2Ful7IP%2Bg3GAiArtfbnHITUrlPl94j1pBumnc6wBnZJXevT8aGMRVPkcyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMzeLAjXHVTBSls9IOKtwDTdxM9o2cPQkcFc9ImAF7EiAGhKenOYRnXZhvLH8Bv%2Fjlfye3XYSuGkz6gRxraJcbhHj19BAOdz7ArM2LOyJtqanjq%2F5xFYOlOkUJu5%2BHfUoRP3epRTP4HlClQ8%2B8YpQ7pF%2BYKcuedZzvqwUg49UZRYvMohJA2%2BC%2FBP4oxnsEgX6UqOgnWmHMlzCUKCVfzA8nxZ0XF2JV%2FU1I0YQEf9VhpuOzgca61iMyHJ7wcfRIwCWwTf2Lbj6Pstnohm1ITNON0BqdQnIu0LwHMXIoFtzbvCsL%2Fa9dnjX7hpcKxTEPJNgFWaRYfHTam6zuDTKjilA3BQd5U5i4WYDqXeAZSyIKRmaAsFho5CtQuJAscaCx9Bmr7fKPwyQr04fpT1HeiUc0LPKYNkLU5x8Uras9PIqSWDP80sC5vlZfrCosMT19JcGFZIUTZ%2F2V0uSsNoQAb5YpW12KEpPvvSwFxniPToInYX6WFE7H3afSk95zie5Irg58dHcbdfIwcwkEBIy61UonJQV0Gci84%2BvjS2b64APwdi5UQwSrF6ZiFfQXTjP0dcdUM3nj5h3%2F7u3BsgFgeUy1f3qWo9M%2BEZ1NZjzzoTULLVtE2MthaBcN1J3POGa5biFm7We7ZofwQ6MX2nYw8MzjygY6pgFXkeXmTXRfNGcXO3E%2FrekAb8HSAa%2F3hf5v%2BHiuskogWFqe9LJaLf1nmlqfeUB6O3XObHqH3SZvO%2FD4FRXrxGr38WodtBfgzkbmxLvNwAxN0w56jnV9TE9ERyxJ%2F90BgQ6AdXkfCrNhQh8KlPLbSct6vG%2Bcsh8sgzplgXskXy%2BVcpMF%2FRDnUKrq73cSrM%2BKinUKo2gOsrflzR%2B%2BoHr2cYdZjCdJpm1m&X-Amz-Signature=15f65344b6b5ff97c227a632db9822fa3f11f6917e1311848a59e86171553271&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

