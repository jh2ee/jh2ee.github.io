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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRIRRQBA%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIH4AkdLzsq3wJJDsuI7giaGfClRs7ZbuStrd%2B9jnPhQwAiAJzYpFM84eHj%2BKvOkB8G4ZkzKs%2FRTnPLMxMl1UlWk8oSr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMQo2WkyYpjZBEQX6ZKtwDz96Lp9DwMaLGhiK50o%2BteoMP3XaXBVaATSemT85Hs6zXVYN%2Fbf%2B4dso06jX56h0q6TSAOoUYu7jpnYMWeZz3OlGSr6Y%2FoAChoM2XCjwjIP0UDHZLX8uz3Z9s0UIQuGpVBMLuFm8V8VlnUgbPUBaiBZS0prKSJADG%2BX%2BmWgbONU1h8QzyYgiajL2PrMe6mgAldJmfJRllPHLpRE8qMEy7yoyrTnATlHMvolywYgtUfgUa%2BtgHNWZUSaRTQ0AUJVfki1C7t6WXgCSAUj35Cm2Rpv9QwWa6KLPGdm5aQtGJvPiPM5pNmumzoizOpd2dZ8vPyebD5cBr4LYwZLwo8l5OkH4x0k6Y1CjZStms%2FUT8kZ0g1VupfZpjlgE7%2Fcai6hZdSHmFcWgldtLjUDEZWeKWQAzonUI7NDr7aTz%2B%2FxHOlAgcD4a048wAUBaZPaAEC3mWg7%2FYmLBtkeIqBzEu5EUDSHc3it3vCr9AHTLPsReQttbV2kFMdd%2FSG8i1YuLIoqUcptTl7229t8kR38zYE2u%2BHn17PGbpKazsmOE8mcX%2FxNhcD8Y%2FV302vfA7xK1d01AMY0kXBixT5YdwITUXrUEEhhTJbX78fCADv%2BfbNp0TyDOddrgsx8C42tY1%2FDgwn8y7zQY6pgHq%2FZYvE%2FnwjYmo0nt0OAgabmmJxjXmc4aFn2rnBYYAwxeVTJ4Rh%2F4N%2B0%2FUqtOdXGm1uQingyRzZUjtdplAOLqN8iyGwenWaoYvfboxaG%2FZTCyqTJnqOBPmbAcJksDsoXKjSXAER5T9rDfJtkjTi5vCF9I7yciq%2FIQH4IXRKpJ7v49FTohIt6j8cayLPL2JpqWWRCBzbWdFWTj6k8ELBZm5O22yqCi6&X-Amz-Signature=899727704e498fb1928507b323872e30752bcebe5576b34d20b1fae9c02084e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRIRRQBA%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIH4AkdLzsq3wJJDsuI7giaGfClRs7ZbuStrd%2B9jnPhQwAiAJzYpFM84eHj%2BKvOkB8G4ZkzKs%2FRTnPLMxMl1UlWk8oSr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMQo2WkyYpjZBEQX6ZKtwDz96Lp9DwMaLGhiK50o%2BteoMP3XaXBVaATSemT85Hs6zXVYN%2Fbf%2B4dso06jX56h0q6TSAOoUYu7jpnYMWeZz3OlGSr6Y%2FoAChoM2XCjwjIP0UDHZLX8uz3Z9s0UIQuGpVBMLuFm8V8VlnUgbPUBaiBZS0prKSJADG%2BX%2BmWgbONU1h8QzyYgiajL2PrMe6mgAldJmfJRllPHLpRE8qMEy7yoyrTnATlHMvolywYgtUfgUa%2BtgHNWZUSaRTQ0AUJVfki1C7t6WXgCSAUj35Cm2Rpv9QwWa6KLPGdm5aQtGJvPiPM5pNmumzoizOpd2dZ8vPyebD5cBr4LYwZLwo8l5OkH4x0k6Y1CjZStms%2FUT8kZ0g1VupfZpjlgE7%2Fcai6hZdSHmFcWgldtLjUDEZWeKWQAzonUI7NDr7aTz%2B%2FxHOlAgcD4a048wAUBaZPaAEC3mWg7%2FYmLBtkeIqBzEu5EUDSHc3it3vCr9AHTLPsReQttbV2kFMdd%2FSG8i1YuLIoqUcptTl7229t8kR38zYE2u%2BHn17PGbpKazsmOE8mcX%2FxNhcD8Y%2FV302vfA7xK1d01AMY0kXBixT5YdwITUXrUEEhhTJbX78fCADv%2BfbNp0TyDOddrgsx8C42tY1%2FDgwn8y7zQY6pgHq%2FZYvE%2FnwjYmo0nt0OAgabmmJxjXmc4aFn2rnBYYAwxeVTJ4Rh%2F4N%2B0%2FUqtOdXGm1uQingyRzZUjtdplAOLqN8iyGwenWaoYvfboxaG%2FZTCyqTJnqOBPmbAcJksDsoXKjSXAER5T9rDfJtkjTi5vCF9I7yciq%2FIQH4IXRKpJ7v49FTohIt6j8cayLPL2JpqWWRCBzbWdFWTj6k8ELBZm5O22yqCi6&X-Amz-Signature=899727704e498fb1928507b323872e30752bcebe5576b34d20b1fae9c02084e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5HTLWVE%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIH8q0ysgMFouzxrmlPBHMtPasxjeSi0atZcstGjk%2BZL2AiEA1ZSlVrb5gsurfmSFQoEyTE2%2Fd87oLa7qSmUuFnFfx%2Bwq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDDdp85BL7tolQwQtESrcA2KKpulrUrpiSwUpA9nsrXbSQ57OmbcgTdbRdkqnhYHsAC1IvqwIMPHOtBFYpQyV%2FZU0iOkspvCOQOgXr%2BHEDswjhfWet1mZx7qZl9UI1nMLQxtbUz13YITYOkN2aZ5g1xGRK2R4hS95JBkryEDtoP79yASWLyqxWZL36j%2BtonXJEQOIH7JGF%2BehAX5D%2FhK4jDKYZwqNhNykq7Y1ol0C2gTHwi4QmRZKlvmLMAR0mwMODFo96RNu6YekFi5E2VZjLRKr8FZI1i1G6%2BawNYmpw0STh%2BGu5slcalPr3kjuL3sU3ab%2F08PDux227jBLS4Cop21WfeJc7UHczGMQidpisL1aPC7PMbFZK0IYNwSKli9fpJrYU2QS8NRKNN60IdDB%2BTY%2Fk93ljV%2FIygSGQ5f8%2BHhF7pWmHQ5HbGP6ID3LHkmQPSSVfar4Esjj25bONcqQxKnmO8NkDAWBZ0PvG318Z%2FVzUkI5KGH8pKjBAUSYLwxNgnQZWVhOsDAz1j1R%2FddVDkp2uAhpc8ia9ugJiomBB5szbr1mYyszzag7RQ1ddrzozK3bNrm5CBd%2BpHXBdYdo0G%2Bd03fNYLhxrJ5BHktvKPwae8CWx49ndh3ceF%2F5V3S3i%2Fq6pKbZmB10Vq76MJ7Mu80GOqUBvTaOsxrk%2F0uun0ahwM87KlB%2FZ63uDKkSQwOKAnWLp8S0EJyzUnndAzZUwXfM1tUo1tI%2BgZzRkNnGXdTeFycxn7ERz3y045AvgCTDJnvXrF4hJccN5JJB7vJmnzYwR2Elb34dt%2F3a8Eez7LWB2hE08Qlpn0zLBSZPZbk2rgao%2Fxv4CoBXal30GyFNQ3ucaSA4VfPkGTQzoYeJBYaxY7kM%2Fbr7tTl%2B&X-Amz-Signature=d36295319e648367682098a9ac47080518c20c473880c49971fcd56526170bde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SXQ2TTQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQDgT4IRvGWyKjabm3m8l%2F4iQQl4deyWpaDZ3EzJv9d5fgIhAORPGEJ9D7bHO%2FHOWDQnmgC%2B4bDSAew6GwbjqNhAEDcJKv8DCDEQABoMNjM3NDIzMTgzODA1IgyOa%2Bn0lDvzNHLzQoMq3AOJNKLurcKn1GD%2F4qK6yurq%2B75Td%2BYyCOnUFVoYxwVZqx9ds2Emg%2FLK8KG2rabKcVY42OLnZ1WzbRQ2SXXO9bBgyCk5n7qRa1dtQhi67WEkN7Gb4ObK5GkOzdaduejKda9PPWc41XKN%2FOSwjXLTRb%2BDvDRfFuS0ZAktZuznvxX3NyyPe8tpq5QFS8iJ9PVLQG7suLqnJgd%2FIkCE9KfKQcTHb9ejimywG7cmJ5%2FMBs2EVnczboCfVG7ITbHd7opwpGkBgXtR8rui%2BOorVqDJrNTQ8%2BgokbvbnQqKTpLRWTSQmEBdlM8V7AW%2B0ifxzizzWoXrPukGEqUreuzQR3wgV%2BnQAktoMD2FogColPsDVZ%2BFOb%2BYXLcYmojV6VJsjl57bLQlhGqKrBSH0WK4r8QUCkNedqrCZH5%2FMI9cemDrmMAyDOx0pA%2BpVBnAqN0%2F5vYeNVSagptlqlcWz99ssxY8fBJaaNo4rBuSPjlzGV2VR3WA1dLYLoG3NESY769JttcRsb9OXGSBORsuHmAxLPpaQGcHNvmMqoycY8HifuKtErgTMWfj2ieUPo64z6jMLKYtNTyoLPEPFL5W8C%2BlX7Z6%2BjSV5Smr0cX%2BIO60k3AtRSOWiodCPZ4r86UImbjncDCLzrvNBjqkASMR%2FGu%2F2xyKVYf3xgc6yRN4I9cY%2BCyCttQLoLT4FECoQ0CNSOUDnrq%2BVde2g1sE1sYETRCX2Ilgwi9QH5paTjEhOF%2FhYCV9fk5Z1PzT1ajUAaDRGKn6l1uA0nq5Hm%2F0HvSUbSKWrJ7BZ2TzkwEQ8UzUaGC30odo0GEMJfyDJPtwtlPKDRZa67woOmDXXQOLYP8MlHV%2FuxZNGegJJTTcSq%2BHRTuf&X-Amz-Signature=257f3e2a843e1f75591e17478917e2bd8b039df559917c448226481990676205&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SXQ2TTQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQDgT4IRvGWyKjabm3m8l%2F4iQQl4deyWpaDZ3EzJv9d5fgIhAORPGEJ9D7bHO%2FHOWDQnmgC%2B4bDSAew6GwbjqNhAEDcJKv8DCDEQABoMNjM3NDIzMTgzODA1IgyOa%2Bn0lDvzNHLzQoMq3AOJNKLurcKn1GD%2F4qK6yurq%2B75Td%2BYyCOnUFVoYxwVZqx9ds2Emg%2FLK8KG2rabKcVY42OLnZ1WzbRQ2SXXO9bBgyCk5n7qRa1dtQhi67WEkN7Gb4ObK5GkOzdaduejKda9PPWc41XKN%2FOSwjXLTRb%2BDvDRfFuS0ZAktZuznvxX3NyyPe8tpq5QFS8iJ9PVLQG7suLqnJgd%2FIkCE9KfKQcTHb9ejimywG7cmJ5%2FMBs2EVnczboCfVG7ITbHd7opwpGkBgXtR8rui%2BOorVqDJrNTQ8%2BgokbvbnQqKTpLRWTSQmEBdlM8V7AW%2B0ifxzizzWoXrPukGEqUreuzQR3wgV%2BnQAktoMD2FogColPsDVZ%2BFOb%2BYXLcYmojV6VJsjl57bLQlhGqKrBSH0WK4r8QUCkNedqrCZH5%2FMI9cemDrmMAyDOx0pA%2BpVBnAqN0%2F5vYeNVSagptlqlcWz99ssxY8fBJaaNo4rBuSPjlzGV2VR3WA1dLYLoG3NESY769JttcRsb9OXGSBORsuHmAxLPpaQGcHNvmMqoycY8HifuKtErgTMWfj2ieUPo64z6jMLKYtNTyoLPEPFL5W8C%2BlX7Z6%2BjSV5Smr0cX%2BIO60k3AtRSOWiodCPZ4r86UImbjncDCLzrvNBjqkASMR%2FGu%2F2xyKVYf3xgc6yRN4I9cY%2BCyCttQLoLT4FECoQ0CNSOUDnrq%2BVde2g1sE1sYETRCX2Ilgwi9QH5paTjEhOF%2FhYCV9fk5Z1PzT1ajUAaDRGKn6l1uA0nq5Hm%2F0HvSUbSKWrJ7BZ2TzkwEQ8UzUaGC30odo0GEMJfyDJPtwtlPKDRZa67woOmDXXQOLYP8MlHV%2FuxZNGegJJTTcSq%2BHRTuf&X-Amz-Signature=f748617f134ffcba1d786241fa8d51a5448065cf3bbd7e43905f4fe2a124af32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5WZUEQ7%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQDudLqQDRD9RmJuehYOVvK2emTkEmbYn5wSjNiduyjxAQIhAOW%2BUgZSko3VuZj%2FMziDSGp9qi90214jDef1FYfyNOMkKv8DCDEQABoMNjM3NDIzMTgzODA1Igz1GFQZCDg9oG4iYQIq3AONJf5iGWe7Jux%2B9G1Ju8j3dXp42vhAptqkXWVpGPPNI5BufZHHKxtjy0RSy3TQuMHrCf9xvZktz68XsPOB%2FK1Q%2BEbscqRhCn2%2BCeZIv%2FV3m59Bb6eiV9WBKuNPjUCM3%2FYMc1Am0PNkR12JEx8TO3a9V9edk45l6J7AQG7KJiBMNDNhT5QvDb4UTfWSOPqbCSI0Ak0DzA3g2S2ko9oxO5jXzAiRWAgU05ErH5P7%2BISvJWdELzlU0ExOKmC63v3wr9H%2B7fPk6j4BxCsOzPw1546eJIX7E67E0DICNE4r5kquhiiba%2FDQhb8mClA0KgzCqiPbeHRiXAxweTpXcaif2Ff2d7PG%2FKzktuvd%2FUdlolkGSAqYazUnB%2FGrGkeggiqYiZq7%2Bxusatt0kW%2BXwERsH43EQj0aij9H9%2FIADJ%2FpiSqGHqaY4JxUBY4MudyQJeNjQhRao0IdQi2CutvDEM5GLq2cjs0tovCHInwWgOSUUGQyJtToLFpONDMoIlIQsFgu9IpWMHZWqkTnKBOqycEk19eiQgiPDcxOzivmlE1Vx4vpDquTsUPpxdtJ1q0UphGF0tOQs6%2FPeF6n%2BqdRRCwuIIzuxePxkHZ7tBHxGE8C5BygOpBR9ufN4KUiEznCODDLzLvNBjqkAVeSPZN8%2FLafbFqzzdr%2BqIKJcXEovfSPMa6voQ7ZSg%2ByT36dcvkwqHZ%2Bw83jGfQ9Qlb5cVCPiHFLPygaTda109Qgpkde1oEhzkdJM%2F1Wuhni1nLQCmWcBDKvIHJtL46seND934Q46IR8HM%2BM4epZf6PkLbsfYX8t9LLoaOTmeSlHE2G1N73j4BPAbf9zViIrwVGrnREnCRHhYoq%2F3FLsTiZPKH70&X-Amz-Signature=e60f9f8d9c274754fb1be2a12520822bd1d54388050c5c918323282b120685e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMJ62OB5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQCLdhOtGJxTix%2Fo%2Btr8ver4N1N7zAKt5Y17KcZIvNBK%2BwIgGZxfvsI9CVkXpo6ImKdwOlBaQYm5zUhlhd2adeAjuCIq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDJCG08tsvxuORV8wwircA1MrcX4xE9Az4FJZBRrqNtmLiVXishAIvCjwPbZeRAMEhAD%2B%2FG4oQQ7X6pb6CHHfVatxZMmkdSCxf72pGBau9LFOol%2BMr11CFRiWx%2FC6oBpJe9VYOlM6ToT3WkwEMUwLk3UiSt2sePLhiWztzQM%2FLAXlg2sOjs3NVYhJWz6GhLfai5Giq8Dsru6wKRxu6Ls8%2B1JxEcIDMCb9e7XgCztDWC5IcwDAhAV88mmNC5yTopLvRO53r58wZqmPhzoLs9ivJir9dRAO%2FkWLktWBqRnAkm1d8ThsDFoY74uxX%2B5YESSHZUzs6dXIm3odYU32H%2BD0fym6BGz6MdqYtioh7G9oGPFbRB9gyBqplEGl1mUMi4qpVAFXhDu7ThxjzQX0i0KuoznKxKMK0xsY55kjMfCK9cVIGHIgJrb8MmtiEdKdoT8e%2BIF%2BijmWGTTnuGinBsd3cqvZwLmn3MAlRwIDxdPvt3uu2VE0TwAZXzE1rmqFuw10Cjxf7bwaCr1lHeH%2BgHbwCeYcQ24Sv%2BSGoggotkpQvrdimQ%2BN9CXuviCHRofX0ReTNejxmXZqLojS5J99XFsrgp1KfiyNSqqYPKHBMiKHAPGBniAbE%2F8H07QIPl7F%2BMpy2TESOZWP8HFKzS62MMnNu80GOqUBKJlLh9PBxLbLLOyFsvSbvuGKwkowcQxiBd7FEBHvEyFqF57YeFdd9W129MIqtzFpM4s98LLGw8GEPJI%2Bq0dp2biRtpIeQJWrchQ5qU522e%2BnskbAuarCH6xiudgAg2JGBOuQ3EYPwzoLHDf%2BEsZETdlD7Hf1WXKrgWPiMDEYXyTKv5QvdBZOZ0cKIFtdlndl8WvGzWSormIAZl7GmgW2oHevmW8O&X-Amz-Signature=9388330916df0223f5301c616f8bc1fb2c2a1256ca3e34944c9c7065b4ac989a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673ZRPKVG%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCID8MAqYjVa%2Firt7wmQvtVkMiKF3D9Xga%2Byb7EXUkjevZAiB2vL35vICc4hpylKamYBMeF9dULsp6eo9OCp%2Fe2ZLh4Sr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMcn0CdZuKwNj9eYTfKtwDyjVwA6DLINKL1%2Ftjt0EXC2z6o7G1DHslCWXTIJ%2F3lGJmoEBgPf4vp5wZZ00zT4A84jLTN3tSHwMlJzdJnNaxOOYH9fpu5AM%2BRKsruvjBoip5MmIFMhVjGd2rfMxrW5LALcw6nbGxY8RzqFh3k7%2F18KPoelxmnYuo7jhW0onAZlrhFYJXr73HecKKe9EBc8x%2FoZx9ZiISZcpvKLzFqm3VFiMqNOIxbqekCTisIwYJCLVHrZ0Yf7Ogh9enEq%2FkJCGmBdbyEbBAuqsr0PFVBlHTfMrea7u0PWX4c1xMAqGwVFFIXfvrQCIfuoTOS6xQhSgHrDcO4Zts1ezjMh%2Fc6rajelPZGSEBklvAeFAxiNrExvNEtgW0D8p%2F3R5eIqgsJKs0sR%2BS5WRz2bNwE2zISsoTcvdRXKKZgkkvc8ULangzalq81fncxwQPQZBcKlAG1IGJphzI4ZhLLOuR0ZnGSGZ%2B9rDAgE%2BdypiE%2B2qGh4Ya1gUgEp4nnl%2FF%2FKktD38gb3ew8TRZaZQzyDOhOVt7VqpVrE7nLZ4D0oZk%2B0rcUZCA%2FXXtbymZHUVSCLIh3LYTtH0y1nlFiS9OXz8c8zmqupf%2FZq9P5my9HUY7VHbczcFxwZNGiB8IGutJbdHC1Csw%2Bcy7zQY6pgF4n7K2Q%2FHnn%2FgkAvzUUsngFBqKnjRyWjb%2BvjYYbsduuz3C6rcXzO8SRJs6cOyNrpgXu%2BPWRtVz%2B6DUKeD%2B0gTuDAQ3WSN81gg4oFRSJkWW7DNRii3TyyQfzJmWZ8BstZHVwh7E0M%2FtBsBNZbHZyim%2FH3UEZdbZb1EoBL0g%2FdIz6fiD0VyJfUammMjV836p6Dh%2B9xmdAFwvBgOkF%2FFn7tTcy6Hd3UZE&X-Amz-Signature=251177856a1f5779906c0b6ad9125037b367adf17212dd5d34b53f859d3fa36c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JYQV4AE%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQCodQ817qOnzNW%2BDzH3VtaGeW%2BDUpWZv2VlpyVv3DeIbwIgJbSDuWutND9iP5KfAC1lICZV7dK0pt1ST%2FK7S3XhuO0q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDJ%2FdpUymkF66cuFKeircA1e0kA0arWTaONc%2B0%2FufjzUhL6hl45k%2Frtlmz555owe6P5v1w%2FPhwAVMdIM6MmDQumRCogGlKx9DKp05FDUCW%2F3SHfPFr912T5ELrwJxfucwlOPKsKFVJzYi8aFek1gpEkACgB%2FhTS1QFPdQvVMKw5SddM6XOazjp37pP67IQ0CUI16S727Y9gpXtRTHEMHuECijyIFrZwD71enK7rSiAH89xrAh1oAUBGwGZ4TkEFTOKpqnwh4tfqBBWLIUEYsHSAUNBBWQbgk1DPMTGfvtKCMsyJu6PcJwolI2ympUPtuJqX18HqtqDrGrIcSpw0jUKjAF2hOKkBnGmFaZBPHkDg1NXpudp6ZPPjsaTY2oYZ6oRILs8UmzwnSONNAiGKTKxLWKLTlice90gbii%2Bbho3DhmycEocQ3v5KeNktiayZ8f7xOQA3vYeWVCwUOxi6tg9jHw5%2F1dUGYd00lWAusneECuVaE0BRWrn1BHcLX2nqSXXoHYbNs2iIl8CaO06qMgTgBKIBn0A2wGW%2Bpi7yDeDzH25CcIv4m3wYUuqKw41oNKwSR9IoFHWfNSD%2BctR548KBnb4bMqKTjSghFFVaoV2ebp8o3oxrZ9%2Fl1RnvzmDrUu7rVwO%2FG49v6U8uluMKLMu80GOqUBMn%2F3GFTV717a7oEZc1wST84a8K%2FfVQDcDKukWQ6Qkp8pabz7sZXxDhJwFwm8vE%2B%2BElOrsVdAc%2B7%2FBK%2FOB0gEGcsBUC7w67mfigW7eYZSjB683nzkKUIkljoQy9WIYhDliW7dIfEc5verDBjox9TsXdk9Cx89fmKP18TGIM%2FmPIyNOuFYq4C52ns%2FQ3EY1i5a3b1MYLWE92kxOEla%2BZTqxfgIgeiJ&X-Amz-Signature=f4dc9a3a9c7492aacad4953cc26446777ad083d682104f861ec9a9f494b9f532&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JYQV4AE%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQCodQ817qOnzNW%2BDzH3VtaGeW%2BDUpWZv2VlpyVv3DeIbwIgJbSDuWutND9iP5KfAC1lICZV7dK0pt1ST%2FK7S3XhuO0q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDJ%2FdpUymkF66cuFKeircA1e0kA0arWTaONc%2B0%2FufjzUhL6hl45k%2Frtlmz555owe6P5v1w%2FPhwAVMdIM6MmDQumRCogGlKx9DKp05FDUCW%2F3SHfPFr912T5ELrwJxfucwlOPKsKFVJzYi8aFek1gpEkACgB%2FhTS1QFPdQvVMKw5SddM6XOazjp37pP67IQ0CUI16S727Y9gpXtRTHEMHuECijyIFrZwD71enK7rSiAH89xrAh1oAUBGwGZ4TkEFTOKpqnwh4tfqBBWLIUEYsHSAUNBBWQbgk1DPMTGfvtKCMsyJu6PcJwolI2ympUPtuJqX18HqtqDrGrIcSpw0jUKjAF2hOKkBnGmFaZBPHkDg1NXpudp6ZPPjsaTY2oYZ6oRILs8UmzwnSONNAiGKTKxLWKLTlice90gbii%2Bbho3DhmycEocQ3v5KeNktiayZ8f7xOQA3vYeWVCwUOxi6tg9jHw5%2F1dUGYd00lWAusneECuVaE0BRWrn1BHcLX2nqSXXoHYbNs2iIl8CaO06qMgTgBKIBn0A2wGW%2Bpi7yDeDzH25CcIv4m3wYUuqKw41oNKwSR9IoFHWfNSD%2BctR548KBnb4bMqKTjSghFFVaoV2ebp8o3oxrZ9%2Fl1RnvzmDrUu7rVwO%2FG49v6U8uluMKLMu80GOqUBMn%2F3GFTV717a7oEZc1wST84a8K%2FfVQDcDKukWQ6Qkp8pabz7sZXxDhJwFwm8vE%2B%2BElOrsVdAc%2B7%2FBK%2FOB0gEGcsBUC7w67mfigW7eYZSjB683nzkKUIkljoQy9WIYhDliW7dIfEc5verDBjox9TsXdk9Cx89fmKP18TGIM%2FmPIyNOuFYq4C52ns%2FQ3EY1i5a3b1MYLWE92kxOEla%2BZTqxfgIgeiJ&X-Amz-Signature=0c31c754e59b93c102e1efd8e9333c6ae01da74163b5d8e9d45fa24e342b9aea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664II5LUFY%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCICf8wJirNzQY0P%2BorNIsziet3aj0fZx%2B4tCp2wxZO16CAiA%2F3xc3ylC%2FWGkSmbeYnVdNwvq485h1JZDNYRPwfsKgTyr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMhEZbEoHKlvZlkgFqKtwDTv4tLd8bQtTjfQvvzcmPo9rtPFjP90XUvlcVNzmYrAfUoVgOL40Ixak%2BW%2BfxwNjsuGqaei0QQDW8zgaOZrJYfLAAgC8CnlUoAtFfuV9x%2BA1OnUPQXA%2Bx3CdR2VUsXKmVVvXm8yKkKGUGrxoIJZ7HV2abckvrMFjvKDzuSD5891PIuTXRBkapIayueqZlXLKY1JIeOUVgshqHZdq5g0vy96%2FLn6mci4bHita07rP90wfSHDjDIAWB8rc2ooxs4PCwYDvh7xcxVvJgyt0EslGcrGcXguUs3lYJKDPa2%2BDwoisUTnQclmHse5eLTIethmBH3jogNEiwVbwiM3Sk7mEnooERZMTLENgLEOv8hFVbbObv9IHVo%2FQycFiOeSlU2A%2BNaRXzzwCvJlDzL1qh2zidGc%2BRez2N4xT4Vy%2FZ4Bze%2FmY7kurMcrzq4Ncaf6gZewIPk8VhEVzmThfOPFPkHiMu%2FuZsvjO14a%2F9OHCc4nKkv3RLOl4vbSwPiM5Xj6lQkPUnAsVhTYF2wv5UmVSmB16oVhRGLDcsIHP5oTPizAC%2FsHEBK%2F7iuy3o7sTiI2YlHkN6H3vgiAZjEXwX8b9mR%2BM2aPu7LW4bq9ciGohhetCwF6HUHhcQI0oSh%2FIwb%2FAw%2Fs27zQY6pgG%2F6XmCFN3WXEBfCng1QykG4HCKUfwcNDgInOrtRcsKSsBhWLHhh9yKlVorQFDWq%2BtVl8yaVvTJeMisyrM%2BTRPwOCfldSWpzaTN22WTCMTjdh1ZIkmKgHEBvt%2FQVZp%2FKpH2ETwL4eF%2F8sb3%2BKG%2FBHLWonU9sb40HzAWXkzulnEAyQtvv4CIHPSO5T9ILW06HRhtP4wRAd1IQ1Y3%2BH%2F9s%2FV397NSFncO&X-Amz-Signature=e5b5697bcb45645f9ab6b8006ffc23ba3b15507d24f1da7022193f62bc2c855b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGGJ4CTF%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIGev6Tyfj0wIpwZvaee399WzFoT62eWGOSiy8HpOMRvGAiEAnRwCjTYScTfNKg1H1hwCDOMaJv%2FSF%2BO%2ButtbzpAJSW0q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDBiixH3FWh%2BlIbUIoCrcAxdDQdGhA9oEDyNkUlMGRvq0scCbvP%2Bj8vo7jYbkDPqgkd1mTHF%2FGy5l%2F00DDT6HaFlAWqkUfpxyLapmaozzER1o5HH60E9eU8215Mx1lst59HHwxBlKYxo39tYZhOHqOoyGR2EnGLHKbS5pATW1WSA%2FdEMDmG8XJpgz9aZAWNYodW3C366bjTVDCN7Qgau20%2FVNt5Eolf9EBjwuNXuy%2FMkO%2FsnzH6wKGUxiqmbI9bJamGaQBNFSlOFOx4JQbALVBa5rpb80mIcODwofnnxRpJ4FPRZLKQCWr6tgKWbbLgXgnghm0Z%2BbplK9r3%2Bg6MGtrsLHo%2Fx1devAMu6OYq6KAHzpvoVTKANHVUqW1vj3YTUBC3s%2BV7t1YkDLGhRYk5sHv90Fw0Fx2pfvxlzo4nArB7vRzIhg4MNTTZDgAEG9jGM3pGCx7vQs6wzaKDyPRPn9pNe2HOlHrB1iAZerHqAeDG3MXhHPVPhYNWolWoDcOVFJeh%2FOdSxKuawLXoXdzqu5upzgXmP7GaNFmcYT0TCLbCryVC3Lul8xug4IPumYoGFdC7LmS%2B6lbI1Dc4LNzfNH7odMhnxlKE9YA%2FbVwxfo3%2FFDIpFwm70zfUnWS8KiLJTKqspUN0ovm%2FFJCp0KMJHNu80GOqUBJ%2FVzQ0yC%2FgAhayK4T91iAHFbLF6%2B%2B8j1%2BHtVg%2BEh1egBM1f8D59hPWPmDO6Vsus%2BWxTQiO%2Bq4ImwVKHMHfOr0S2b6Gaz7f4MguA%2FmCjwCXokh6J0XEnBB0x9pzxB9RhFc%2BfzCihTGaHnPtJLspNeP2qFO8V2BM5QJ2nlrnSlHv8q%2FTJI88LcFPEOAwaEptG5yIFp8fJgOreV7rRcc4NgkXIYzRgV&X-Amz-Signature=347857ec618fa25eff33a1a37be35882a0f64cbdac6a8ef95a1b3e545a9da5c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGGJ4CTF%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIGev6Tyfj0wIpwZvaee399WzFoT62eWGOSiy8HpOMRvGAiEAnRwCjTYScTfNKg1H1hwCDOMaJv%2FSF%2BO%2ButtbzpAJSW0q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDBiixH3FWh%2BlIbUIoCrcAxdDQdGhA9oEDyNkUlMGRvq0scCbvP%2Bj8vo7jYbkDPqgkd1mTHF%2FGy5l%2F00DDT6HaFlAWqkUfpxyLapmaozzER1o5HH60E9eU8215Mx1lst59HHwxBlKYxo39tYZhOHqOoyGR2EnGLHKbS5pATW1WSA%2FdEMDmG8XJpgz9aZAWNYodW3C366bjTVDCN7Qgau20%2FVNt5Eolf9EBjwuNXuy%2FMkO%2FsnzH6wKGUxiqmbI9bJamGaQBNFSlOFOx4JQbALVBa5rpb80mIcODwofnnxRpJ4FPRZLKQCWr6tgKWbbLgXgnghm0Z%2BbplK9r3%2Bg6MGtrsLHo%2Fx1devAMu6OYq6KAHzpvoVTKANHVUqW1vj3YTUBC3s%2BV7t1YkDLGhRYk5sHv90Fw0Fx2pfvxlzo4nArB7vRzIhg4MNTTZDgAEG9jGM3pGCx7vQs6wzaKDyPRPn9pNe2HOlHrB1iAZerHqAeDG3MXhHPVPhYNWolWoDcOVFJeh%2FOdSxKuawLXoXdzqu5upzgXmP7GaNFmcYT0TCLbCryVC3Lul8xug4IPumYoGFdC7LmS%2B6lbI1Dc4LNzfNH7odMhnxlKE9YA%2FbVwxfo3%2FFDIpFwm70zfUnWS8KiLJTKqspUN0ovm%2FFJCp0KMJHNu80GOqUBJ%2FVzQ0yC%2FgAhayK4T91iAHFbLF6%2B%2B8j1%2BHtVg%2BEh1egBM1f8D59hPWPmDO6Vsus%2BWxTQiO%2Bq4ImwVKHMHfOr0S2b6Gaz7f4MguA%2FmCjwCXokh6J0XEnBB0x9pzxB9RhFc%2BfzCihTGaHnPtJLspNeP2qFO8V2BM5QJ2nlrnSlHv8q%2FTJI88LcFPEOAwaEptG5yIFp8fJgOreV7rRcc4NgkXIYzRgV&X-Amz-Signature=347857ec618fa25eff33a1a37be35882a0f64cbdac6a8ef95a1b3e545a9da5c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSX3EY66%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T154332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDzDKsHCWGIeABJ4RC9OZfdHiHs%2BPZpkAjsFBS5e%2Fy%2BeQIgVCNx5JeJs70IZNoSPB9fPT%2FwTpSW5bc2StZMGh0W49Mq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDP2uMmkFhnVyPoYKDSrcA7ZJmdkyFSf7kjn%2Bmh4Tk79cEBvctoqRxXeCfeamC2oSV2xA91J3cqxK1f3ClI%2Ffwi%2FSYEmKE4dCVrmUEWg%2B%2Bw6a3NnNO2zv90kfVrAmPR5u3n%2FnE4QmDufI96AvOGMGSwlDNWHvXwX7sfAV3fiXxZns5B7l7nwFYsn4d%2F1jAmmKdipEo6YGEdr5hq3pkt8wkDFbbhLS%2FSuyGBFNzrzrAX74E6iT9d6Ib4dqv06yVBiLmBpWs%2B7mz2b2r8jAhk38%2B064rNO2FMv3A7sEjLNI72w8a1MHXI%2Bjn5uV8%2FSH5gQTXiqcelPuyRLCiGc5RrXQ2YPHQQZoqNsFkFBRRKTJiunSVRo5KeCfAb%2FL9Ay4e6PQmcA0ULWVRgWtbs%2FVYGiDGXnl3xt78%2BoEiGr6kiDFinuN11FV2kvRbQbvBiQoDNAU2tDsoZEm%2B1%2BXsb5xhJWWIwGZiOKruSNzHtsn412l5MlyP72ByJtqtropSSC865z11JPZhpSoU2ppSULSGitXOVAO0bazq81VYiFX2DRwPPmrYZkciQ7DCz5btwyusw8zNF0D8VwrFH1p0Y0NtVEPQGAH318tYW5b3kxFLbwLjraFSxb0gk8n7gW4ycMXi6YqtdtXNU%2FoXj50oehnMO7Ou80GOqUBRWOeuTJFaICHyvDd5vB%2FvNmhb5pxydbqLfiLffqdGQbTpl4qlJck78PYF29u2%2BLTCML5abCKZdhtC2C975YMPwosHGH3Xwzw0qNdwE4gqriT0bW6erdmRA2uuxpHp2slSKkIjL59u2JeJKUolQhg%2Bpr5quL1UjDNCXbtr%2BVSXI%2BZSeD3RL66zUMKV4vuwcZ5DIQLFFqradJTI%2BhaXlFKg%2Fp3a1ZM&X-Amz-Signature=18dcf01f819f507843733de64bf5dda5cfcfc126675fd40eb1bef8fba60329ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

