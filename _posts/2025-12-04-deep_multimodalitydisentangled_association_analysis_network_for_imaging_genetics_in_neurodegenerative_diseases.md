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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAMI4VPB%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIGDT9RVxzZLWc7QgccA91Sk4Knp3SC9mofWJen%2BtecdZAiEAy7tI%2BQ6McH8PLceJ%2Bq3RjYgS207iY77htoDkUF4oJi8q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDGRJ%2FkUySVtT%2F1LR6ircAzM8qjodwl1IawNMkddci5zigkh5mN7gKiRF4%2FIGd8xL0d0Cy1llM4NB6en7ZLkjTWfKEZdaSrNArlqmVQLX%2BGGSZuLBsviA3%2FdR1ohLYj4o56ir5atACWoamIma5w%2BT%2B5e0g7XzXQp379G%2BchjWehz2bYE6nv5c9SwShZFu5S%2FaZPccHCJh54VyFebmo7nuazi4c7Y8HVupeaQwUWRSt%2BTbEiY69NK3e3eKyqvjQUEfwI6Z3MgzvzaZXwkfK%2B1WFkLo11p4Wh5pp8B0e3bK6WB1%2BY%2BPu%2BfUKLTUG2oKQ8J8x6DQWmEbCQ2EQ%2BuhZCPr6Nb4kkzfHJCpzQL1PBpr3x6KVY2GOvQPJEN5nCzHt9jOO0X25u8BzydN%2B%2FKQy4%2Fcg7hG9YWhCbNx%2FOvczny2UdnCWUKQkeEHl1l%2B7ccL70ZTwg6Kk2f1JOn0R5BMIWGHk1wzcx%2BX76iroVjKxUS83NQ2%2BvFoZaf8Z68CDAWpG8qICdKXleuUUGvMcv10JABcD4twccsx9I698%2BVoPerawJ3mi4gcl1fGAPkzDJk%2B8B6zMuSiu0dmLLmh6Vigew4YF3vFydVNgnDedL%2B6E%2FJtBiXw7e505fUfrRAjyrFAV%2FgBo5%2B8Sbx%2BzUpZk9S5MLXEh80GOqUB58V907RqjY5YWbGz5vieN87Ss0zB0GBz3cvjAacBxVZ06dI6iERos%2FDcQr8SZXMU2Zg%2FEj7XFMqfiZ4iI5w7JhhWJmxGndSFPKuH%2BAk3W1eT05%2B2814WEDtD86Z58szQq1Y06D55HsjNaN%2FH%2BgGBvdZ9bBzf2mcFLCUkJ2XxgPyVuA6jbYevYrqH4MEVwZfqdUpMXfTbPpo6%2BAU5xADlrbvYWbhR&X-Amz-Signature=ec7ee2b2362332c5f28a8759d15e639d931c03defb2fdfdbd3379c30393b8424&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAMI4VPB%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIGDT9RVxzZLWc7QgccA91Sk4Knp3SC9mofWJen%2BtecdZAiEAy7tI%2BQ6McH8PLceJ%2Bq3RjYgS207iY77htoDkUF4oJi8q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDGRJ%2FkUySVtT%2F1LR6ircAzM8qjodwl1IawNMkddci5zigkh5mN7gKiRF4%2FIGd8xL0d0Cy1llM4NB6en7ZLkjTWfKEZdaSrNArlqmVQLX%2BGGSZuLBsviA3%2FdR1ohLYj4o56ir5atACWoamIma5w%2BT%2B5e0g7XzXQp379G%2BchjWehz2bYE6nv5c9SwShZFu5S%2FaZPccHCJh54VyFebmo7nuazi4c7Y8HVupeaQwUWRSt%2BTbEiY69NK3e3eKyqvjQUEfwI6Z3MgzvzaZXwkfK%2B1WFkLo11p4Wh5pp8B0e3bK6WB1%2BY%2BPu%2BfUKLTUG2oKQ8J8x6DQWmEbCQ2EQ%2BuhZCPr6Nb4kkzfHJCpzQL1PBpr3x6KVY2GOvQPJEN5nCzHt9jOO0X25u8BzydN%2B%2FKQy4%2Fcg7hG9YWhCbNx%2FOvczny2UdnCWUKQkeEHl1l%2B7ccL70ZTwg6Kk2f1JOn0R5BMIWGHk1wzcx%2BX76iroVjKxUS83NQ2%2BvFoZaf8Z68CDAWpG8qICdKXleuUUGvMcv10JABcD4twccsx9I698%2BVoPerawJ3mi4gcl1fGAPkzDJk%2B8B6zMuSiu0dmLLmh6Vigew4YF3vFydVNgnDedL%2B6E%2FJtBiXw7e505fUfrRAjyrFAV%2FgBo5%2B8Sbx%2BzUpZk9S5MLXEh80GOqUB58V907RqjY5YWbGz5vieN87Ss0zB0GBz3cvjAacBxVZ06dI6iERos%2FDcQr8SZXMU2Zg%2FEj7XFMqfiZ4iI5w7JhhWJmxGndSFPKuH%2BAk3W1eT05%2B2814WEDtD86Z58szQq1Y06D55HsjNaN%2FH%2BgGBvdZ9bBzf2mcFLCUkJ2XxgPyVuA6jbYevYrqH4MEVwZfqdUpMXfTbPpo6%2BAU5xADlrbvYWbhR&X-Amz-Signature=ec7ee2b2362332c5f28a8759d15e639d931c03defb2fdfdbd3379c30393b8424&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XFXQ4SO%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQCjsWqeePHKJGLhCTHvmLhfn7qjcUQxA%2B5a76QcM7jSTwIhAPoZ8qGjw8lUfPJ%2BVmqWtLg%2F9FxlDkqg68wX4GL0h0%2BDKv8DCEQQABoMNjM3NDIzMTgzODA1Igxs%2Fyje9BvrcLhn704q3AN88Wf%2Br85C4ct5q2if3pTRcWa9kf7OQET8NnEYmdrmGHVZXaDZ4xaHqK5zwjtruDBn3YlM6f25uacdG48E4e%2FrTilQ195C6ic8t5eXUo1zuyPzxRSNNjofedh4Cj5MTNKqe6ktHDhiI%2BU9%2B0gyUwZihhzoLgmEU%2Ff2UNScDJHCGaC8hsWtl9wvgTy1zK1Bk1rhdD%2FKot9oq1LT%2FtMB7qimr4%2B%2B9Xerw0sRPcG33%2FAKJ203GYHq%2Fhi7DnSqNxY4eny9AjhWyXscswG0eOqCKD0WkO6EzZAfW0M%2FgAi0D8p9rCWgadg0Tst06RS1DlZsUPxzzAtG6OdP12tsvOxJ%2BLOLPAM4tiVCruRuhY6R8giXQ1p%2Fkvs%2Fn%2BmWsKCyt%2F%2FFVdtbvHAHjBduG21Z0JaDstlnBeIBPPwQx2jn26ftr9qhfNOjbomt6%2FGL4KVxxT5yD0e9MkbTvIrPyG9kVgyAzNZijyWz5fQHgn8m5PV%2FUSy08hGKTBVMuvEYnpV50DLVcKjpnn8%2FvLojmNbjs8nLYnjJqdzVfngOsRmCZOYoFQ1RuTeB7BtEdxREji2y5BShY07IIfZ84o2xivtZN5ZdjhDwHtotrh%2FrKUZ6300VIzMUavnAmcDwMAjXKJ0KRzCqxYfNBjqkAWNUNHho09A7cFzTQXkC%2FsEIwJDX3NUZZytGWoL3DYvUIMeB93gPaDZXwT7fliMgEKO3QiS%2FycU2%2FzH3vQSknKsaao9UoHH3Ob8GxFXdxQspp1cBeHXZRs3v3wJvP%2FtnFaSxEiaOJ4QmY2bQjwndYYULmLA2ldJdzbUkgmJ2%2FhacMtNd%2BF2OLRjS9aS8aiJWqM%2Fc0cG%2BUm5QVXNTo58srZUO7%2B1a&X-Amz-Signature=70a6dd5bfe0e940825ac2e4a53e6d1216af5da2a7cac29147b015c169b3a364b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YER5L25V%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQCDGyRuF%2FsDr8DeaLjxwH7o%2BsByAG3XREebl4lhFgNZHgIhAMFDIJSBe7EYstGcaOt09G6zhhsxIy7sW%2BRLGcnxMDvYKv8DCEQQABoMNjM3NDIzMTgzODA1Igy0jfSMuN4ivoCkaCEq3AM2v8zdi4r0TJdmGkTHUItegaltcyL5V3zmhV%2BNapJTENCrWobIALRQ0BDG59UnhecY92hk5uLfdPQ0BnaCJ8mhAMRiFHve0N3OoXy78TXGqoUIXcqpRTMxDT9TUV8JTdmfNheJ56P59BD4bmx90FRpgb5zbvUCwwwNFhC5XXIeOVkP%2BoF5Fkfz4UaOAQZifAA4sO%2BH3WTzcKDkRxVw9X5ZlJl5N%2FpGOALda9s%2F3rW90pBYz2B9vcQJrhvXWLJrWEOrNp9iZSUY70DS9AkvzQVD48nyLwVraOCZuCh6SV7r%2F0mCtMDXApSaHh3lDQPThQzamTFFTbZRb%2BD45PrSgWxaMgQQ0BK72bH60ki98b8KeG97EnPThoVlKFb5IUOqadm3hN4%2FCyQaAN7d5vsDoR7uQjUoiMEuKSw8RVOFU3di8YjC9s0JsXhDQ7NCpqq7tnBVi3l%2B7%2FHZV3HUkUbiJJ9YvcCaKLO%2BsB09trHqO842byOpH2VU6j8xNFUJpVNHvIoNBveZp8OMgDdbQG4u9asGiaFT5T4toD9XqwoUxns7hVG0tDYEctIK%2F6IoroH%2BybxYlcl58nfatVT2NemqKjgHor4WfLsh5rjkqM5%2FeX88G4TF2QI%2FH%2BwHv%2F%2FTtjCaxYfNBjqkAUQXGou1TssZPM1zB8GLJqFjyzGY8twt%2Fi61izvn761MOXMDNt9OPmc6hSmSP4jBYfOJlHpdl9hKuapub27CpzrMRvkYl7EIORy7jvlHVFGdPSWUX8WnIycQsUxF2i00bKP4qfQgxcqrKYJElSaPREsTOIroRSWwFafEB4EmOy9Zh2BQsSVoCx2cz4kGsFxKR5Xlo5oldb3i9usZoO2OkEwb0ASS&X-Amz-Signature=a09c2db4adf6dd24e328f5001c9d65022b3cee5b10ccffb3a80a2d83b5f1c0ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YER5L25V%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQCDGyRuF%2FsDr8DeaLjxwH7o%2BsByAG3XREebl4lhFgNZHgIhAMFDIJSBe7EYstGcaOt09G6zhhsxIy7sW%2BRLGcnxMDvYKv8DCEQQABoMNjM3NDIzMTgzODA1Igy0jfSMuN4ivoCkaCEq3AM2v8zdi4r0TJdmGkTHUItegaltcyL5V3zmhV%2BNapJTENCrWobIALRQ0BDG59UnhecY92hk5uLfdPQ0BnaCJ8mhAMRiFHve0N3OoXy78TXGqoUIXcqpRTMxDT9TUV8JTdmfNheJ56P59BD4bmx90FRpgb5zbvUCwwwNFhC5XXIeOVkP%2BoF5Fkfz4UaOAQZifAA4sO%2BH3WTzcKDkRxVw9X5ZlJl5N%2FpGOALda9s%2F3rW90pBYz2B9vcQJrhvXWLJrWEOrNp9iZSUY70DS9AkvzQVD48nyLwVraOCZuCh6SV7r%2F0mCtMDXApSaHh3lDQPThQzamTFFTbZRb%2BD45PrSgWxaMgQQ0BK72bH60ki98b8KeG97EnPThoVlKFb5IUOqadm3hN4%2FCyQaAN7d5vsDoR7uQjUoiMEuKSw8RVOFU3di8YjC9s0JsXhDQ7NCpqq7tnBVi3l%2B7%2FHZV3HUkUbiJJ9YvcCaKLO%2BsB09trHqO842byOpH2VU6j8xNFUJpVNHvIoNBveZp8OMgDdbQG4u9asGiaFT5T4toD9XqwoUxns7hVG0tDYEctIK%2F6IoroH%2BybxYlcl58nfatVT2NemqKjgHor4WfLsh5rjkqM5%2FeX88G4TF2QI%2FH%2BwHv%2F%2FTtjCaxYfNBjqkAUQXGou1TssZPM1zB8GLJqFjyzGY8twt%2Fi61izvn761MOXMDNt9OPmc6hSmSP4jBYfOJlHpdl9hKuapub27CpzrMRvkYl7EIORy7jvlHVFGdPSWUX8WnIycQsUxF2i00bKP4qfQgxcqrKYJElSaPREsTOIroRSWwFafEB4EmOy9Zh2BQsSVoCx2cz4kGsFxKR5Xlo5oldb3i9usZoO2OkEwb0ASS&X-Amz-Signature=2917fc20d3c4e152f07966f37d3ff32c7d05f8474a60e4da7b76c5f9b3be116d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2N452Q7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIFlWH%2FmyK1ZCF0WaOOffLIrbN9gZN5uS2tdb4K9bJSjiAiEAxlenMEMyKK5j8sc10hPSJhYZYu2SCG0BqdjKwYhVYxMq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDKkwvd691u1AzibrMyrcA30AoFFJg7swIzIgZ9VP6wFYu815VtPo9K61xg7mojzV9kIUaYSeOaboEfFCICpXzlwBwxucNy4vq7Zoe2y%2BHa%2FHcP2QvA4kNmasg6i7kEkJgIQeKNsvPDl21SRG03ldr4ZLCitDxO%2F%2BVlgI6PUMu963zxXsqL%2FhliU65GkI5c%2Bm1D0gH29yCwXDMVpy1lYRnhQoRbWaPJZaOMUF9vVo%2FThGfjuFsfyC2DpjmYJuqpe%2FdmsWKRRdLKi76i4GnNPyrrC8yKAfmk13nz%2B5sC%2BciOAydLa3ePba4XHXh9DxBn0E6JfGueR6YHyNNad97k3kTalTjzCf0ppwvamcC0NdAcFpSPwrzzUHOKUVVsKjAn2oZzhVrJ6d4e8bpP9G2VQIeR6kFclNTFuG8LvQTf8ZykQUmrbTc6xIjztCv16LZOG27InkORxnHBbDWvmmc%2FWlVCNjj%2FP5cHsUGd91Zr9BX57C0CksS%2Fol4we5D3UZ61UX%2FL3zr36OOp4sZepis%2FjIclRceAJwXa%2BwA7R3GVQm49E10M7CkLzrV3aHb2wE8d7lsNhQE53tgB%2B9JY74sTDhxDQlYBBw62yw3tO6A8V%2Fv%2FzJB86qx%2BCQAV0v70XIwR4LJxy4xwyXQmmvwPUjMOrFh80GOqUBLskdpsasG7pc1n1kokVerH6GzpxC%2BxkJEKeJvICT1z19GNL6Gnz3kdtEUmF1gOnLvDFnjN6ImyBPD3GOYSrTiLhBoNCZCjyI27ZffNBLGMoPlbJBiiFrkDVoAFSMPH6JECPXnHQmIjy77YjDezwmQBl2iwxXcgwiPHPh72CwcQa1v053htKHcToCHGqAg6HqZVDPHdH1nOiQiQpvZafBHmDa7hzF&X-Amz-Signature=cbf4b9cace83b4e55edbab9ad0c08e48bf19cf5e2430da987cb73b86b581c9f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XWH4AH3%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQCnDbzxRwKpoN53nFfKdPbscbxpYqUD1OuKeJuOaDAIXwIhAL5WoXNLcJxYKtPKSv3AamT%2FFBrHnRL5cFaD%2F42avtHjKv8DCEQQABoMNjM3NDIzMTgzODA1IgwzPlRFgiLwtPha%2FKsq3AMfqF6jk0B431KKDArTWQLEcteHwc7MSfmzN6wYyzw30brFdvewG1FXRF1YBgufAHNA6HYrTuRuTKYau7238LVk6nvVeUcEqL37GWQVfjai7XsdmNjJ6q5vmzZdfO8LG32bm4DFDfZP5NRZ0n43%2Fm%2B60Q1nTgbKKab2cjPOUmQyXsCPKdC7sGCZa32w2lzIvNTAUSugtFH8tTkguFRqViU6%2FL9oNgsRSGjPcbP0WS3LRc2m7tFIT7Jdw%2B1vSeAZ1TZryAsjRBYQd6tvpL8rihfiaDNqwvq7fthl9gO7MYfqDAiOolybfd%2FrlT%2BZzbWIRuL4eED4Sg63bYHBZnl9VjP97Mz14Fag0CwteebFkgrN%2FDuKAJY43QoiKIIDA2MsQebzqoITwnFOK2wS7TwwTzkw7YSHGMC8xbdJeKwhn%2BOEabP7PAE1sXv3%2BvAkSMVvGCFVUTzfvfTVWs3KD%2BnNzQaE9bCVW1Jv2uVqo%2Fp%2B3bCyCuxkjzMyUVTTa9hDiF9fA6sB%2B%2FEamKKc65ItigPnpSIdBrN47f7VP1V9W2KcvzeSrJaRvJ3MKlX6CtYmQUsXs2VuKgIaPRuuKxL4%2FGLidi%2BVK1Qk3pqChWPy%2FPQng5RVyM9pMUS6m4a1mVHDbjCKxYfNBjqkAVxxkRi2ZYyDRLkmO44sqapdXCjLZz4wH%2FM63m4jsK891y2zi8g7%2BeymYbAoQK5q28TlMCgEl43WVdT2HO0Tycfn8S9WrTxdpZ063qf6QOmYljc9VBKdVBzOjsPGB%2Feq07zFfA3pW6hxrFlRWq%2F%2FB28fHs4nm8dBifbyWxAIyR6fwCuViRSGdYSzAsNuKmxYbowzu3Q%2FJ8haSSD%2B30LWOozI1Ot%2F&X-Amz-Signature=fb2145344fc3ed4553c89e2a238455091f3cffc6d83eaa701fe90eeb77b03529&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKMFN3WR%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQChnaG0HM0rvYR3j9ILX%2BxtT0yBW2%2BDIhxngCryzdPLXgIhAPhIxttXEDZyCrr2EaYnIXKjU8VLVQgaIB2ljs9OCrVRKv8DCEQQABoMNjM3NDIzMTgzODA1Igw2PknRb7rxk7JNfJAq3AO%2B7JRtS1rI26PfkKC7WwhndmkNxNaUH2Xva7Pr%2BdMs8kTSObuJMfa%2FDuu5Zt3Eac4Z2pho41s4Q1CBVMc4bfHWPbKPFrPEjXeuXAxIXbjz8X9%2FKbklMBrzCnvJJT9bMGlkeqon7HzJS31PzF5o9U9vx60inHCSgWr5bnvDiwkNXGyBc0Auv%2FoJY6Oj%2F%2BomhL2tYpoyFE2PgPeKzj5PgK%2Bz1CKviCAgvuxzB93OSaVaw95bCNLbrPBsrxg49cJQDkHrZlTRAsWAjdlt%2FrzhOewcUPS6To1HoY61ilZoWyf%2FOK%2FNonFMwUNDOLJU1%2BMWX42ZQtfWE6Vx4Bu3%2BxKjBa2YUrGmNHomNCEx5i%2F3mpLtlam%2F9BOElpoMr5lQ7KhzOTnm1D1E1fzUFlGLlETnwIRufva6tzwkoskdb3nm%2BBdMarySFrFI0GAnaKGiTzXx%2BdLQpJNwITs%2BZo90fX6qbgmOhQbXMOlcg8po8Rn0DJS%2FqCGMfoDJ38JdcIAcQNBtDju6Fe0DHDV1WMOW52el8ZdXbv7IQ0voKAZ0lFN4oX94WgzV%2Fz316p8T3at7wWJd7XRnMCWGfgVyOj8py7xeKTiMhgIB99BhWdacwyroZxN%2BhShUtp0p%2BbwOz40t0zCXxYfNBjqkAcMO7eAyGWJfwBLcRR4dbOS09HSbjpJ3LUPKgteg6qV4NerH9oq0SHlVPFWw%2BN1zp89ITQpxJRyQD3JRvpFaqo65dm8XPaUvDfk0Ea03UXYs6bE2%2BwZb6AderJDbiLJf3LXaryWYKMNzWGQvmFjhtvh7cohImS4ZLP7Y4ZQwdp7ef91AadbZsKMx%2FrIy9PemitHIdu1oKAceZbYrhuchZeiWiNRj&X-Amz-Signature=72f866a7b0c115c4da4415baf9e35cd291647f10b7b9aa0975104c7d62b53fcc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666N5RSCA5%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDohOXNeOLufWjsnb09%2FA2qDXeYXX%2BrJ8CwkyG8FkZWhwIgPcRhPxwiKsOmuiUtW%2FsUnq6CfAPg5ZvP0w3KS06gsc0q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDPupHVCnVgwXvpSRfSrcAyugM3BEYRcAfey8uvNroF3i22049%2FTZTjxOI0lLdBe1Oct29LuPm6WdsGhgqipv0BerXho%2Bz0ROMKcf6rj0ygN7O5OJsU8hEfF15EgGjTkkCeyLuwAPXkvDKdXpFEMXurE99jGQAiNF81a970sUupYa05QO%2BGi%2BRBMRXof%2FDReOQ8iURCOwrrjZM5oyddA1cw4UTm%2F5A7rI%2Fe1eutlnF7rgvHaUq50zIKorgvrgkn8A6qxCsgnkfW1eVfX0g7k81tj46uMeZX8g0qps4Fn3EeUun6xk2ehw0ezbF8m69688Vnkb1jOQqmiWVImnV%2BU%2B%2FW%2FEF59vlnzOvx9zPOzzQ6W0JgRAOMhm3FDAwVS%2FyGuVpNAOmIxybBb3ievut3KKSS1fNUGT8g%2FLFK5OS%2Bm6UJce%2FJjXyBu4YKtHdGipVbQj72MMvIf5QNdi77uQRtrjbd82QcsLjWMX679dpU6tuIGY3ALDAtME89UGVYpI5M9yAUiFq9Uin8NXE0dhb%2BQeSI82ufNxQOdf8wpeDuXqOVFU8DBJSwafgyKDIVbanuGP5f1s6cTzzTeLfqu1%2BjhTVwrhEuIJStjWYNv4J5Ge%2FBzDFlpA0NYdqMcZa1dy8VobpPOCYAWRuSfN2Gq7MLzEh80GOqUBhhohGMAzwapQJKzMYFXJuF2WFS7n5ZCbuSeLUSirvtWdMPREBLo1GXWucy1%2BwyhWf8JjvFvUNirvJsvYbvDkj%2F6jhinxL96B0P4gz%2Fjc9kcvX%2FQhEkvUxXXdaCZ9aDo21W6tIR1I%2B7S7NUfhzB0sdeyc2eQ8rrl0AoECren1aIQmajsH1FY9itSLWfL3O63EzBG00xqnYKpS8chdMfSJyhRo%2Foac&X-Amz-Signature=a9e33bd6fb4c63a5cd6aeab9d1955aaa6ece41d7ef08f2f30c71c9dfb1620552&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666N5RSCA5%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDohOXNeOLufWjsnb09%2FA2qDXeYXX%2BrJ8CwkyG8FkZWhwIgPcRhPxwiKsOmuiUtW%2FsUnq6CfAPg5ZvP0w3KS06gsc0q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDPupHVCnVgwXvpSRfSrcAyugM3BEYRcAfey8uvNroF3i22049%2FTZTjxOI0lLdBe1Oct29LuPm6WdsGhgqipv0BerXho%2Bz0ROMKcf6rj0ygN7O5OJsU8hEfF15EgGjTkkCeyLuwAPXkvDKdXpFEMXurE99jGQAiNF81a970sUupYa05QO%2BGi%2BRBMRXof%2FDReOQ8iURCOwrrjZM5oyddA1cw4UTm%2F5A7rI%2Fe1eutlnF7rgvHaUq50zIKorgvrgkn8A6qxCsgnkfW1eVfX0g7k81tj46uMeZX8g0qps4Fn3EeUun6xk2ehw0ezbF8m69688Vnkb1jOQqmiWVImnV%2BU%2B%2FW%2FEF59vlnzOvx9zPOzzQ6W0JgRAOMhm3FDAwVS%2FyGuVpNAOmIxybBb3ievut3KKSS1fNUGT8g%2FLFK5OS%2Bm6UJce%2FJjXyBu4YKtHdGipVbQj72MMvIf5QNdi77uQRtrjbd82QcsLjWMX679dpU6tuIGY3ALDAtME89UGVYpI5M9yAUiFq9Uin8NXE0dhb%2BQeSI82ufNxQOdf8wpeDuXqOVFU8DBJSwafgyKDIVbanuGP5f1s6cTzzTeLfqu1%2BjhTVwrhEuIJStjWYNv4J5Ge%2FBzDFlpA0NYdqMcZa1dy8VobpPOCYAWRuSfN2Gq7MLzEh80GOqUBhhohGMAzwapQJKzMYFXJuF2WFS7n5ZCbuSeLUSirvtWdMPREBLo1GXWucy1%2BwyhWf8JjvFvUNirvJsvYbvDkj%2F6jhinxL96B0P4gz%2Fjc9kcvX%2FQhEkvUxXXdaCZ9aDo21W6tIR1I%2B7S7NUfhzB0sdeyc2eQ8rrl0AoECren1aIQmajsH1FY9itSLWfL3O63EzBG00xqnYKpS8chdMfSJyhRo%2Foac&X-Amz-Signature=ad208ab14bbc68af9be5bf93a632c08e89e8595302618320b0e9efa562bd5312&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMQ53ULZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIH0elZLffz9ruMhAPpiKdLbRlRPyGirQndAH2T29muojAiEAsnxyGDwkWOhU17ERdSEUtIeCsFvqY%2BJvykNhv4tGqIIq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDJTAA8dhlRksmLLV3SrcAxTMjFMlSC6zZEyV1U5C9QIbSbouJsoBKtPSdwoP2Kb1QFgfWfUWAHP4pOWzyXfFf2vzGYCH3cY1iNeobwiSnuALFVyjMp1UCvU7qtRvXWAMYjoTes5gK9YU2f%2FPHHiuk%2Fp%2Blny1cAJIDPHAdYnignu%2FW3CNnwb1TzDBiKvjHIcxT%2Bk83nr7goOUpHxsOrcf2idfT17yraUXoEUk2LMnlLQBVerplrvlgM7vckxHyGkjmqDUBxJraS%2FSLgevYY5zdyWJO1gopdFeBlRZGiQCYA8vzaXYqby6t0INdVwDr0Xv6a0%2BCFMoeCXHVBqwuJ5mWD%2FXVN8qmabrrvao49Yi6wfr%2B%2BeDOfWmpX7BdJuqx8rAHPWds5sFw8zlNlX03FPZA1DK9MNl5FAsi%2B%2BM1Uee3L3HxCYHqAZwI208YVjgbX1teKTjwgiDUFRZVpJEgIpqrYeT31m2PnFjSDuRzTvLJwrYPB2%2BLkqUi7SVcFkq%2FhI7GUs0PIjW7yhN%2BijPvv4%2BLpw%2B0Obqg9gAMhJ89b9gDuN%2B3bB2IHRjGxLFdqACzJBA6GP9iNAOT%2B49VGI4rzePdq9%2BZrIEM2YrsWhWbjyAoJJCawlLfrmekL8NGcmWuWYNRpkOoGsypniEm3lBML3Eh80GOqUB2rytNXnePVY58nL3zeipd64cwOcYezYEkVI0DEM%2BGSPrrkeIsfQa%2B0VwH1BAji6gZvdpRdi2v3VHeFndzsLnIpH5K%2FTnpvm5hp%2F8jdOTLDUzGOJcFtAPzKu%2Bst8Xi1nHmGJ7WovLAh1Q0hcoZns%2BEC99Qq75Q0jVRyJimnqk%2BJ41lSZHQgEPptJJSCB5L2xc3NyM5rJ1pj%2Bcft%2FGgZUA92c3iJG7&X-Amz-Signature=c474d105ec4e7ed42e4e5cb6e3d5377422345d3f35ef74a56c94fe39a2a7adc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZM6MH6EQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDjlB8nsjsMgXI12VjYl%2F8uYE4wpYmHTr9xQcA4VygGQAiBSb%2BINTOt29ijQr2UFwzWpjvMtwQ8AqSPQIQ5dYi8RoCr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMwWK%2FcdSp%2BwXti8sAKtwDsTP%2FiD%2B9qSo3iP%2B4l%2F6hQJqCaQ9fhB%2Bi3hHU7lmiTKrx12Il2nIc9ZYmo0SIVJOTTDqFWbVJsom%2BZdTcA5o5G9klpo1Ir6N6KulSyi26myZwYqrSlzXFpgPZQZ8ac4tG1VnZyf9btq2QdDIBTqJb64iKqg%2BQJY5k3QUQFN6fQ4gPcSzA3zgH86lELfihVyYTwQDX%2BueuHqxv%2F%2BjmQ5WtkB617r6C8b8ZB2B8Kj3i1AjnA%2FboUhbVQbBU1OZK9mToPblqlsU04y2IZVOVS6jX2KGGs75FNS3RGJVD3aEj32iiUltIDwXuUtu71fIz0pGq%2F25UbDdvgYHK5ZZ7H3HbOo9OMmc50b%2FXufwDUkGNU2v5VJKYZ5Tdd0AHUI8WcXFOO8kzE3zJPVN38W8p5IYLOvr4HOqzkKAPS7LPSOItT1HmCSZLwhzJdfQDt4fsZKZBZJfKdypKgm1G95bsLzpGvEnY6NdF6Yg6Vw%2FShOvEE%2FRa%2FUy3rPIV0q%2BsLa8lBwBhO1DkENZG9dgpOCBArjM0rH1vPV1l8SRSgIRQjv%2FN2baZ1S7M47FQPqgJyl9LtQgOQ9lcFm9vfFUUAs1v%2F5gL4fp66TBG%2F1HfB%2B8dhFF4vCWqZzDgjB4HIxs5N7kwtsWHzQY6pgF3ZQwdf9CQDaIoihHdiveelMm6I4H31kIm3ZTBgT1tz7e1JM2eCfCXBwWmkdbhk4Nyt%2FIQXhRWxMNuSAO5a8YipIdTAV1HTi2qfWrw8zANdA7ZqnLLImMdeUzspXGgTCEGwCPc0r8A7On9VTaeJ93rmbgjI0rcVldO5BbAFUqFO%2Be6Y0K0STm8%2B7fm6fqfEznuw6G2uCIYRWALaduSSSQ3fgt68TnZ&X-Amz-Signature=24311da860b6c1d7692762078baecbb2b239e5b29bddf9b798cb5fdb980c6435&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZM6MH6EQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDjlB8nsjsMgXI12VjYl%2F8uYE4wpYmHTr9xQcA4VygGQAiBSb%2BINTOt29ijQr2UFwzWpjvMtwQ8AqSPQIQ5dYi8RoCr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMwWK%2FcdSp%2BwXti8sAKtwDsTP%2FiD%2B9qSo3iP%2B4l%2F6hQJqCaQ9fhB%2Bi3hHU7lmiTKrx12Il2nIc9ZYmo0SIVJOTTDqFWbVJsom%2BZdTcA5o5G9klpo1Ir6N6KulSyi26myZwYqrSlzXFpgPZQZ8ac4tG1VnZyf9btq2QdDIBTqJb64iKqg%2BQJY5k3QUQFN6fQ4gPcSzA3zgH86lELfihVyYTwQDX%2BueuHqxv%2F%2BjmQ5WtkB617r6C8b8ZB2B8Kj3i1AjnA%2FboUhbVQbBU1OZK9mToPblqlsU04y2IZVOVS6jX2KGGs75FNS3RGJVD3aEj32iiUltIDwXuUtu71fIz0pGq%2F25UbDdvgYHK5ZZ7H3HbOo9OMmc50b%2FXufwDUkGNU2v5VJKYZ5Tdd0AHUI8WcXFOO8kzE3zJPVN38W8p5IYLOvr4HOqzkKAPS7LPSOItT1HmCSZLwhzJdfQDt4fsZKZBZJfKdypKgm1G95bsLzpGvEnY6NdF6Yg6Vw%2FShOvEE%2FRa%2FUy3rPIV0q%2BsLa8lBwBhO1DkENZG9dgpOCBArjM0rH1vPV1l8SRSgIRQjv%2FN2baZ1S7M47FQPqgJyl9LtQgOQ9lcFm9vfFUUAs1v%2F5gL4fp66TBG%2F1HfB%2B8dhFF4vCWqZzDgjB4HIxs5N7kwtsWHzQY6pgF3ZQwdf9CQDaIoihHdiveelMm6I4H31kIm3ZTBgT1tz7e1JM2eCfCXBwWmkdbhk4Nyt%2FIQXhRWxMNuSAO5a8YipIdTAV1HTi2qfWrw8zANdA7ZqnLLImMdeUzspXGgTCEGwCPc0r8A7On9VTaeJ93rmbgjI0rcVldO5BbAFUqFO%2Be6Y0K0STm8%2B7fm6fqfEznuw6G2uCIYRWALaduSSSQ3fgt68TnZ&X-Amz-Signature=24311da860b6c1d7692762078baecbb2b239e5b29bddf9b798cb5fdb980c6435&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXKCG2DQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T192419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCcgXlPhmvPGbw0uGlNrlR6ARaEfKntecLUhgQIB5xOjQIgFSvDqbEBnqrU7fgyQYrVBFdoHJVtzqeuJH%2FmLYdO3zwq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDFdAt1ts9T5UDCb7sircA80BKoFk%2FAUXH0YbImmloFMoN3KLT43uEGEf7xIC9E66YkCNoZ3wqklhQCaE6HZc78J1KNpulHb93JT%2FKk0ivR0ofpQbXX4ia8Kcf839q1dxN547gXKtjmAl2QpQlhg%2F2QJbjk67AHKVmMXBt71txUHPS%2BiX%2B%2BDOxm%2FNL68AjTEk7Txis12msGEZiD0nCunAut54OXdau23C4rDN5Bwe3qvGWnmbTtAenav2SsKc149VARzJVVcyN8K%2FJNkn1VH5LTNk0elkyzbt7E6aPxRK%2F2%2F%2F5%2FRpnN1mZeoz7xtU5GRwNpzVNUWp7pyW%2B5%2Bgsmo2dG3vj7mj9IYHTlSdssiHbpAyaDnlpCRsMPXfLy0jdgVElQ%2BtlY4%2F3IYrCSSkskAFlaQ%2BJTUYPG9rDEJ4uuZVQAWEdTGsOpwEKjwUGJJWVsmMYbwAaWQndYp%2FHqoyDOkwP2ZouiuDFTm9Ky8tndpvPfyUvTtF%2FKwouGEnNtHV5Ww9wlfyibvLaHbDGO5%2FK0I%2B9nOyGiPTTnE9ehqh2InvzqTI6TjEU2sI5LFc8K2ra0mj7DJB%2Bta2UQJcyBR3dVaSVw54EQekmyY09VKMlObHeWL7ZUbLcZU4dUfjIgdSVdRyeeXG43cBsEDqwf4ZMOXEh80GOqUBP8%2BZdMf3lMkPw4WcUr59fsoRgz7A5jGrrbIpmAG8RQJ9V8lnCR0AdDeVqKlQiaKMLd9N7LxYTNqFlb9buAYhTy8%2Bha5w85Ft4abgJlEhuhTB1gmSlP31IKno8%2BfGOHT%2FIE%2FkOj8IkjhsqFppthukvOHNg%2FlLpK0dAimOyOXC2IEizvEC2COO34TU8KStUhst5BtO264DgDHU5lBdn%2B7nKL3s%2BGBI&X-Amz-Signature=9224484d3700168d4ea6e72bdd71e1f48c99bc0158162db4ca6ad55f57c7da4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

