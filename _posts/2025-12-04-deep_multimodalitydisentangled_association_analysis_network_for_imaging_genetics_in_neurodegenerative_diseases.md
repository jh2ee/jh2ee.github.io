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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBZNCIUQ%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCz5CVL8CwyLkZhNfftWhSWp5ytkLslzsrijXOCLgmb%2BQIhAI7RzKfXikNIqHqqqbaphALUMNS5IqBWwqgNdxUAIajFKv8DCAsQABoMNjM3NDIzMTgzODA1IgxNoOnGl592AB%2FNGf0q3APEcuqmBqzQLMpVcFPVPbySFs8ciwlG1jKx0yVi4RDlUs32XOfhKqjG64un%2F0yR9%2FsIAUUNBvULsi68rIpDsNxwMeZa76yZ%2B5VF%2FpY8%2F%2BxgrqhPGf5xmQcmvPH7JY2b74pG1c0DfQEvhNAr6jWVMfWyewLZ21Hs2h1oPdANzyj%2FTO4o7qn6PHjUil5%2BbAwZutzFnrnaF4ufatC9shpB34mKwAPXE61wdWgvXG8QxrnCxuDta8r2y2bzuL4S824JOi%2FSumOR%2FI%2Bcnll%2FlhSMdjgbjzKblBNP6VNIemZd4rpWYDDIf8oBPMZpY%2Bl%2BUlrGyTS%2FNizCDg%2FYJJUkCHT79a8An2T6sa8A6XgQldw%2FgJWvnGCkeOpg%2F%2FaEgBc6mdxgZr5oXSPLaBZ%2B0CginGTXcMu0etvdDu1i46Gjl4mwJh82PXX%2BXsQlYIuR%2Bi8PPyJiUCh30%2FcuOlxFwmgykYrLlrEqCxHT3GYct0MmpXR1F6jjQ6J7u8KvMKeRQkeFsVqyr97rCxB4MUlluPYurDWeNxfC7dqDHZ47iU9CkmdzKZevZpC9yRdPgJxWEOs8TqgEBgt7%2Fz39f4WII0D4OjkbmkFi0l3UBUGfCLeEz9NHallsqFLcbseQTagz9oIqkjCH4sLMBjqkAdKykHoqV5ihj0xpsBgffNN3b9jru8R9IXqOWfCa71YJ7elVlhNZc0Tcss9YKH63NaD4mcetc2%2FA32Znvjftc52gH6QlmdKcO8RnTPOFUmbO4MMVkugbyBksyh5iSQ10%2BGEVBTOeY%2FT6gdv8e19M2XCVz9%2B4nhggpKCmD0q4xFmELb7eBY3TxGjeRQ0%2BppwWClWd70VTRqCBHPGY2zKZkgLsYNui&X-Amz-Signature=e43ae661636d1db30703beba6c8a14dbd4270016b8c0e346e8bcf6b9268a57f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBZNCIUQ%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCz5CVL8CwyLkZhNfftWhSWp5ytkLslzsrijXOCLgmb%2BQIhAI7RzKfXikNIqHqqqbaphALUMNS5IqBWwqgNdxUAIajFKv8DCAsQABoMNjM3NDIzMTgzODA1IgxNoOnGl592AB%2FNGf0q3APEcuqmBqzQLMpVcFPVPbySFs8ciwlG1jKx0yVi4RDlUs32XOfhKqjG64un%2F0yR9%2FsIAUUNBvULsi68rIpDsNxwMeZa76yZ%2B5VF%2FpY8%2F%2BxgrqhPGf5xmQcmvPH7JY2b74pG1c0DfQEvhNAr6jWVMfWyewLZ21Hs2h1oPdANzyj%2FTO4o7qn6PHjUil5%2BbAwZutzFnrnaF4ufatC9shpB34mKwAPXE61wdWgvXG8QxrnCxuDta8r2y2bzuL4S824JOi%2FSumOR%2FI%2Bcnll%2FlhSMdjgbjzKblBNP6VNIemZd4rpWYDDIf8oBPMZpY%2Bl%2BUlrGyTS%2FNizCDg%2FYJJUkCHT79a8An2T6sa8A6XgQldw%2FgJWvnGCkeOpg%2F%2FaEgBc6mdxgZr5oXSPLaBZ%2B0CginGTXcMu0etvdDu1i46Gjl4mwJh82PXX%2BXsQlYIuR%2Bi8PPyJiUCh30%2FcuOlxFwmgykYrLlrEqCxHT3GYct0MmpXR1F6jjQ6J7u8KvMKeRQkeFsVqyr97rCxB4MUlluPYurDWeNxfC7dqDHZ47iU9CkmdzKZevZpC9yRdPgJxWEOs8TqgEBgt7%2Fz39f4WII0D4OjkbmkFi0l3UBUGfCLeEz9NHallsqFLcbseQTagz9oIqkjCH4sLMBjqkAdKykHoqV5ihj0xpsBgffNN3b9jru8R9IXqOWfCa71YJ7elVlhNZc0Tcss9YKH63NaD4mcetc2%2FA32Znvjftc52gH6QlmdKcO8RnTPOFUmbO4MMVkugbyBksyh5iSQ10%2BGEVBTOeY%2FT6gdv8e19M2XCVz9%2B4nhggpKCmD0q4xFmELb7eBY3TxGjeRQ0%2BppwWClWd70VTRqCBHPGY2zKZkgLsYNui&X-Amz-Signature=e43ae661636d1db30703beba6c8a14dbd4270016b8c0e346e8bcf6b9268a57f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GH2FTQS%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQCvPqVgCEy%2BUC7311y2E9vZPPJfvCUVjhvG%2Bm5SOuHdngIgLgSmUO4k1jwzmXqfoUZAe7U%2B8M8kfEGTojfiJlLx8Vwq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDDaw8wfkymnL4JYEaSrcA9B89%2BwRDxU47Kxd1gLIp7Nwx2gw0Eu%2B1zDgFdF7pNHljvbdhz34lsnQGmOrDWFgvSzy8lG%2FoWQBaddypQaH872H229vdCjnOMtgrcniXEtJKtS84dVAMkmbgAlQX7FvxOXagkPd8okrZGTKYdFxHAcmZt%2BRh894KzbTKAEUebU1%2BUb3Qi%2BNkJryYANwFPB4M3hAipOngc9QDLYPFTYrhyocica9pPxh7DKZ0%2F99ikN20Vtt6eoPBJicw71GenvZbDBRUz040e%2B%2FDALF%2BVkNMvF4DBSCmGp295cEdtu1VNvrUk4AaW7jHV%2FcWuF1t%2FXaaVlIQHxg%2F9U%2BxfVjAKSgbiFBeMm3ks7TTd86x3Nr%2Fbs2PPsWuWakbaGmhZjSR9PMnFTAJt84saCjKT1nlViXGOi145LNxPmNMRtIOB1t%2BUSOEWjZSf%2B1Mk0u0wqMrocLVs357S0qKjt5ogC4JRr6bfLLsDDEwHXlG2e1gS3fKbsOn%2FUr%2FxvuBqLSViLZLyFepxgdpYyJzD9hJkJQ1p6%2BgMYBcAFnU4oanitQwHOM3aV%2F1sA2DjOFT6eW7yft%2Bc%2BB%2FpcvCFbHZUGxSQrlAqW87v7e0nKoEWHKdwk49eveFjj1A84suNH0oFinP1JGMLTiwswGOqUB8R02dF0XWCbn6wQPV7UZkaEGoVhvDKwniNWgENXXBB2sCogC1dAR%2BCN%2B449iF%2Bu243mGL7XkwlrGwxC1IJo42l3XPPYd684H9KjK1OfA%2BqlMvFoS4MsrJw21FyAIq7Dcp0l7lUe8jE5ny9TvHpj%2BvqGiBN1Px1gaqvAI%2FvfT7U%2B%2FtfpaJPtR0W%2FpDY4Zg8lXBn25r4jUENLCMfJ6Ax%2FHe9gbU6Q1&X-Amz-Signature=93587a9f0006b1d42a9c40ab3947e3885ec60c50f9183d00563b4b91f37f2f11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYLJSBIH%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIEweOW2WVRy3YVsoAIXe1E9CIVcGHxdJxQrZjOhIgee6AiAqnVIrexrQIokeVSbF3mjRsSUd4iiG8Fq60kpNane5iSr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMQvQO9FYCeZm8oRZoKtwD%2Bbc5hSb7AlUXWhGCsAUdwoePj2ijL2NMxa0r33uMXUO78%2BL8D1Z%2ByaMpe43I0Ashmvii0qITSEAiPE8MCN93zi4IcaUdBT0sw93ncDp%2Bc1gq%2Fz1D8%2FKBNs419xKSV56FNh4I8k90E2VHAHif624%2F1oej8QY5gOegSIEQoFf8NJBYzFeyZBZslbFclSuCqKHtcD%2FfaeNrCObgPnBRIlJc8utrVf617tsAPCcec%2FvFp9Ks%2BhQ8GU8xUAQuDwLC%2FG1Xl2pGEoDCzUY871eYtMFZFa6ihJ0w3rcTd%2Baw3PV1Le7iYinMXPkN6JJnMBDW6KdJ4G76HPPdhqVpk0JB3NUD6IRoTmQcoSBSgLBOnlahOew03qZRDY0RfS73tTh%2FxSsYs3br%2BYdZ8Tmht8uPY5UDHbJjIZMGiAhs6VmDlrEfiWGjJJK1pj1WXZZ%2BNVMDFgn21oDtAY3gOxBYxWAaY7%2BpZh7M8GCdJPg4REQqwLdoH1rccOjGT3%2BlnNHXp5H38YAdkxGhOF%2BwKlIInoVW4XPnPHWXsl45KOt2OrcNv1kXlYM6u8ub8skzd16O1n7I7J5pRHE8qvyD7FJzMsuzIzc3dP7w0vykfMkWmzjF8RDbzi%2FR%2BKznAihP2wg83jow3%2BHCzAY6pgFtUBSMJjWwPl3VRXLmEWEQgRmEbHbtXoOP6X0MijAweEDx8G%2FFuqk0Z8BR3AA8NwKMCYMCnWjLnbAi7a8GC%2F0mPyttCLCYEElLhKIfEaRVfyE0M3hwR2eEkEMjY87loriO8Kmi7O%2Beuf8%2FPv6chguSKWfHXFBNmgoRPa6o89Dpfw2gtW%2B0Fww8Ys645nVnG746efF7sn3Y0QGEaZSy4kKs5kh49mDX&X-Amz-Signature=1e1c0a633a12bdd6d85e7ece972b04a900d0df65019bccd7ae07d58acf7aaf9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYLJSBIH%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIEweOW2WVRy3YVsoAIXe1E9CIVcGHxdJxQrZjOhIgee6AiAqnVIrexrQIokeVSbF3mjRsSUd4iiG8Fq60kpNane5iSr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMQvQO9FYCeZm8oRZoKtwD%2Bbc5hSb7AlUXWhGCsAUdwoePj2ijL2NMxa0r33uMXUO78%2BL8D1Z%2ByaMpe43I0Ashmvii0qITSEAiPE8MCN93zi4IcaUdBT0sw93ncDp%2Bc1gq%2Fz1D8%2FKBNs419xKSV56FNh4I8k90E2VHAHif624%2F1oej8QY5gOegSIEQoFf8NJBYzFeyZBZslbFclSuCqKHtcD%2FfaeNrCObgPnBRIlJc8utrVf617tsAPCcec%2FvFp9Ks%2BhQ8GU8xUAQuDwLC%2FG1Xl2pGEoDCzUY871eYtMFZFa6ihJ0w3rcTd%2Baw3PV1Le7iYinMXPkN6JJnMBDW6KdJ4G76HPPdhqVpk0JB3NUD6IRoTmQcoSBSgLBOnlahOew03qZRDY0RfS73tTh%2FxSsYs3br%2BYdZ8Tmht8uPY5UDHbJjIZMGiAhs6VmDlrEfiWGjJJK1pj1WXZZ%2BNVMDFgn21oDtAY3gOxBYxWAaY7%2BpZh7M8GCdJPg4REQqwLdoH1rccOjGT3%2BlnNHXp5H38YAdkxGhOF%2BwKlIInoVW4XPnPHWXsl45KOt2OrcNv1kXlYM6u8ub8skzd16O1n7I7J5pRHE8qvyD7FJzMsuzIzc3dP7w0vykfMkWmzjF8RDbzi%2FR%2BKznAihP2wg83jow3%2BHCzAY6pgFtUBSMJjWwPl3VRXLmEWEQgRmEbHbtXoOP6X0MijAweEDx8G%2FFuqk0Z8BR3AA8NwKMCYMCnWjLnbAi7a8GC%2F0mPyttCLCYEElLhKIfEaRVfyE0M3hwR2eEkEMjY87loriO8Kmi7O%2Beuf8%2FPv6chguSKWfHXFBNmgoRPa6o89Dpfw2gtW%2B0Fww8Ys645nVnG746efF7sn3Y0QGEaZSy4kKs5kh49mDX&X-Amz-Signature=04989c2d5a6b08d51325102a8a5578408ff4236aa479613b752e6559cd7bd474&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T723MHVF%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCICWbwKuo7RxFC%2BYD8zFPTYQHHC9mBCVUdqWX0DsnKmJHAiB1YmYWjkG%2FZW8EG6212s%2BiwgAGxgtcZZb%2FaXZq5xsN3ir%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMkjK6niDNsm%2FyNkgQKtwD30ko1IFyzv0gmGFQLHLYW53%2FU9E8SUDtFS3PbIWDkETjbfTn235G95uZB5NsFh8u3QABEelrW%2FQ8vGCFRCq9%2FPtjM%2BvL5zRjAEcSjv5dWw06egPh%2Bzktdn%2BU7ybrtQfKgwOvhCwSyDuhcn7gxCRnzEdSTqZPZOh9BvZ8Rpbjm0BSrjEykHSQwJLN0Snf5%2Fir0Iiul6JIbKsGchrPiiiv0XYdCRviAwfSlM3WMm%2BnS%2F558bkitF19VQ46fdQYPwYmuFbLccwQyt%2BYQ7whr9u0Km1%2FnEOtONgCtbaFTXLRMLlJsM5FMIfH%2FjJn9T7xfwqbx9setlXceafw6q7QqGM2YTpwJJ950Wu7MpyZ6EFphl0IGAJ5HVJNN4Hb7ag0brfmgm4nwkiUdZLt47MBlAOEQ32BMGcwYheo7HdEWwesuP%2Bd5oHjWCUyC7%2Fci4rYulWlegDkuxWfhGAFKbAXZNJjjkBokuXmkQAyMOABlx0ExaytOvEr2Rq56A10lhQ3rYI1dg0XT8%2Bbv5kT%2B2RGoPAKoJxx2CD6x2xEo%2Bxi%2FUWCX9hGJeklN8RAsnYcTjHh%2BUOy%2FQFptd7SL6Jbb%2FgQBzGVHqtMLiSFtisEFGOu35qsOw4LMAkwgV8XL0PvvQ4wseLCzAY6pgFsVQ5cUD1gQ7jlYJQ9MEuLA82yjzw76GWOkoqf%2BQvXcL4waWfMQjTZa7ugn3RoZo9bmPj8vla3rDrQl00RVZkNV53cnguIbS7N1F19u2tn8a91gXyVWsy3Mdllm5enVgVpkvTJwkLYzIaCOrFMTimn8042uGLUSKYA%2FwWkseGDFT0SpxCVMJkYHJOW3XdUeun31uKLphyL%2FWKTF4NwBr%2BCXBdybG2q&X-Amz-Signature=729cb034cd3066d4cfd67d493eeca934c54212ca21bc3806a3b1df7f79e1b774&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBGTHU7N%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQC%2FEqUE3Pk%2BF6ILGrY8uvHKHaCAaMUoOe1tQCBYcUeG1AIgebFpdiZIt%2B4PfVnkKWfEtrVG2q1UOTGNONiLQAK%2FuBcq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDDZtn%2Fml2%2FWu1eLrBCrcA7I5mZdCwyOE3RECf66dJQ85lTaSXwFhXCEA42S%2FgZvUbQHYjSDD%2B%2FHKUWYVVF8eKfZlwkuJj73cSzrIkQcYjeO0bPxr09mZdz6uTsZhBqmt2q5p3K8zvKvR6Y343%2FdMNfvrJwGFvA2RD7qDuwEQEXeqs%2BIg%2B7b9mB4Tlg3CaZ%2BFsBNx8SsuH6PNmslA7JdvownjMZVlXzGnfIePGF9gjJEhRK4GvQ9uU0pokh7HxzfQCHRpH%2BrrFiip1NiIDLWO%2B8iqVdR%2BEL7EScxGycjR%2BJ0ayT4bD3pUptfCaIEFDztFMLVXRjPwH5xCE9L%2B03xgEJm6jczCnXaiB90pWKeadDT2HJfQncKadlzH%2F7OPDo%2FoeLluCUggQWRWnp%2BY9ENL4cIbiqC5AXn2aSEsSzq1YQo6Vy0N97Uvv2rXF6c2XzhQ2PjAGB7xFfX4QmIjAD%2BsYMNe71EefZrdouw7QUpWytwMRf43rjmG0MWCJNeLqM37tBhRfC0YeaRTeEjBDzetmF8adE7WCR3dZuz8jKjxMrPGiOB2R8DoE%2Bl1nbAeCjMcGagq3KSm%2FszOtozTSJNlC2uIRozFEFfVpRt93LMbXBqgZWr73wNWG40VEuHDL9o3TOa9JoF5RHucFa1VMKDiwswGOqUBG2fFZoHql8%2Bl4Hc1Y6TasI1V5c2mzS0yUeQSLNJ3oIM9r33rcS3MOiyUdcY43wsqxIwK2u4q1rsPYPGE269A3lhenVnSWX8GiHnioZV9qJAMG3Alc%2Fdqjl0JX9Xg17zuYALU3pmq23Zh4SEkNV3LMSvaipnHoIB4rDush1rDccnNlAY3P0OCzoCpxAyBm9M5MsisdNS4I6s4Tbr0mTVRUmQZxxPY&X-Amz-Signature=da307610cfb3bfaf3281de1d598847f9ab5d46b9d8a06671628e9e0bdf4b104f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666C775MS2%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDOfcy9vHB%2FW2oIDS3LxSYsAZmTgUOjnkk1iclmtOWeDAIgAxVkk7sSjR08upt1Be7zZAcHAmyLLxn04XWki8uybA4q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDJNAPkAAO5Wb7swrRyrcA5kihPchWRPn07WRJT8ro6SdKagET2f4B2S%2Fo3lgycLwDRYzIBamP3tDgfqefvjLPE7jr5ZJqG5pVSM7%2BUVsxQaHOVJCuj8goqY3W17tVKHxvXFuoJYXn8Ggemkqz0RIO%2BZXcaBMXIHxKYwQ%2F3WWckXoQBhpi%2B4Vuwd01cjCdyclsHgY2CbyTaOzLeqBFphFKVwx3B5UGt%2Bk4d%2FOd2T8gpC1J2wvbU0i%2Bx0moULjCZvuUBxudacDIwCYrI3%2BePwfFj%2BnZHQUSDxJoC0FEjVvEcHMkaI29uHnBdvuCEknuCQ4GwE3XJETT7JwAjErqABKcfzx%2BBf1q4tpeedgkosIlpS%2FvY8CRnFYcYalmRP115e9jW3%2BNxzWdeQmMMD61jPM6NoFPS6RDZ0HvIKTZdWj%2B7oCrMl2ktWCO4q8ByL86eD9VNVp4AsyJA5rvp6O7i0v2RPm4xKScNmN6WYMgVQ8xghWUNwRcVlNg2L2l1b1qrwg%2B9Csz8R6PG6%2BfKBtmT007zWBysXG%2BVTkeYIwjRNYYoEp5RWoW8xQWq%2BqagOa82vl4lmxD0wavjkQzAhrpwtlBf%2Fr0UHymWhdFxGOh9UfzIv0Lzj4tNwcL8CevD7GWcH1Jx9ej4d9Oo%2F5XLUaMKLiwswGOqUBpubvYgFoTp5jbjQaBQo6UQEOWLf7n6ULPS5awXeECaZB6almcWmMfL6jzi7o%2FdSih77t57OTfI9b8pehzKMULJwW4EJ3TDIVxiO88JEBwUtcQlRTbotL1eyJQyha1xO925lqwnDmeGyy%2BQA2zOd3b6yvTarOkM7czen6G6LWc9dxCpSbP8n3WgVCV6%2B5MjgS3sBF0aDaVVuSPhLkoH9pN6bA36ht&X-Amz-Signature=800b856770d3e6f3f4054e71d4ce44346c9d48e45f42060ecf3d5ce19f9f2d3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IRXVYPI%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCrxXwd8Iot628qlC7xQRn181zHz26k4VYofQQRnjT0ugIhAPcZPXD%2B9YZzkPJvYeylTYnKtgu3EHoRbcPqxzjLCg8lKv8DCAsQABoMNjM3NDIzMTgzODA1Igxvh4GpF0ijUp9Zlowq3ANdsgtUB%2Bejob2cL1sKnmxQv6XKOMpuANUqpcGSew2yBII00x%2Bv96Rm7pJDvXF%2F8ALvxbU6zWzvn3E%2B%2BXrw4XWBSFqYb3C3BJRG%2B8p6R%2FZeOAEDvnwPyiQuMAeAZICxeiyGN0tr5QLRv%2BmeJOnDPHSv21Sz3mKHDrLeZqFb22UhRPXvKkWtju8J19CBn%2FdkdD0gwAPMJowmZYEzq39RN8jOG322%2F1lfz7lIgmNO%2F14JSwJ5%2F97yHrp21HcNfH5g5aQ%2BP7UMhCWkSKx2kZURP%2BAAlMKN443w9tQ4zWS5iDaPBF0AZ5H%2Fp%2FRiQFMCl8DDrMAuWf66mKrwDszg5StcBj1aWaKR7p3icmQwj3jMbU28o%2BKgYwvQ%2FOdcT1SP%2BGhZeIuk33H29Lq6ACpjfR19W7%2BCpfO2%2FJ9iw8TPglnMza4%2F%2FlRqRxIrtGjwfHLaG7d5ii8aYX1l6ZRp87JvFzltKAjjxnzLxFOCwlRMi%2F4EU5rw3BEoEOMK41DIcad7ZRQ6r9mDUvwSRK6jN7ZnTLfvn%2BKio1k9wBSFNir1WhIREe5nGAUzpkwOAB4%2FXY6rwrmbUHy9IZ%2FKIgrGEXajFwbiGPKztjTJjDZnOf0rWm%2Fa44ehE5xNgyOXxnmrtQEzGDD%2B4cLMBjqkARnzf9JOVHg4hYkw4GpIe%2FxZ433gVwuIy9knOceXF1LBNp4bIUFOFhAbkCPZyx1U1No4IFaSWXaoDyw02Xljai6fxJp7PVHKsOdi%2FQYF8XvpWsT%2Fwzqx7t80dCeCS8yZ4Fc%2BfZO50eXWaq7h84MKCZEUR4ugSPQ7hczz3ouQBYHWJMYTsTwZDDoJCz6uMDB04Z1%2BS1HHneuTdiTE7GGLIg9Xz3nt&X-Amz-Signature=808faa0c48b3a8af1a270f70ed24bab9daa68bfef02547f5a96a1c3c6d21fcc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IRXVYPI%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCrxXwd8Iot628qlC7xQRn181zHz26k4VYofQQRnjT0ugIhAPcZPXD%2B9YZzkPJvYeylTYnKtgu3EHoRbcPqxzjLCg8lKv8DCAsQABoMNjM3NDIzMTgzODA1Igxvh4GpF0ijUp9Zlowq3ANdsgtUB%2Bejob2cL1sKnmxQv6XKOMpuANUqpcGSew2yBII00x%2Bv96Rm7pJDvXF%2F8ALvxbU6zWzvn3E%2B%2BXrw4XWBSFqYb3C3BJRG%2B8p6R%2FZeOAEDvnwPyiQuMAeAZICxeiyGN0tr5QLRv%2BmeJOnDPHSv21Sz3mKHDrLeZqFb22UhRPXvKkWtju8J19CBn%2FdkdD0gwAPMJowmZYEzq39RN8jOG322%2F1lfz7lIgmNO%2F14JSwJ5%2F97yHrp21HcNfH5g5aQ%2BP7UMhCWkSKx2kZURP%2BAAlMKN443w9tQ4zWS5iDaPBF0AZ5H%2Fp%2FRiQFMCl8DDrMAuWf66mKrwDszg5StcBj1aWaKR7p3icmQwj3jMbU28o%2BKgYwvQ%2FOdcT1SP%2BGhZeIuk33H29Lq6ACpjfR19W7%2BCpfO2%2FJ9iw8TPglnMza4%2F%2FlRqRxIrtGjwfHLaG7d5ii8aYX1l6ZRp87JvFzltKAjjxnzLxFOCwlRMi%2F4EU5rw3BEoEOMK41DIcad7ZRQ6r9mDUvwSRK6jN7ZnTLfvn%2BKio1k9wBSFNir1WhIREe5nGAUzpkwOAB4%2FXY6rwrmbUHy9IZ%2FKIgrGEXajFwbiGPKztjTJjDZnOf0rWm%2Fa44ehE5xNgyOXxnmrtQEzGDD%2B4cLMBjqkARnzf9JOVHg4hYkw4GpIe%2FxZ433gVwuIy9knOceXF1LBNp4bIUFOFhAbkCPZyx1U1No4IFaSWXaoDyw02Xljai6fxJp7PVHKsOdi%2FQYF8XvpWsT%2Fwzqx7t80dCeCS8yZ4Fc%2BfZO50eXWaq7h84MKCZEUR4ugSPQ7hczz3ouQBYHWJMYTsTwZDDoJCz6uMDB04Z1%2BS1HHneuTdiTE7GGLIg9Xz3nt&X-Amz-Signature=05ca8425d92427ddb2e8354267239c12eceeb2df729aaf6831e18cf6f52e5c0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMXFILZH%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQCyzC%2FoJrBm2GBKJZbcyls4vJUimC2EGVQnw35%2FndidvQIgL0CUuCZOeat3E%2ByllC9H7h06rDhqdDVZebvwq63TwOgq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDL9hUeK7tEv0tQFgdSrcA%2B7EWutXyjriWhpIp3IHze%2B43ClJsiW0oCO%2BBtEdRjZKAs%2Fi1LrX%2B2D2a0UyTgrBFMcO%2BXfF0zMeCJeZFxkQDTws8z2eq3xO0FQLDG4jnT2GzfoBnjvL2pOx5R%2B705fZNQ76TQW59nuVfsSGRtedSkZvx6%2FBu9l9PUftrnyk1KrqQKItC%2Fv2PZMOVGvk%2B%2F2db6Ib9fyQ6ed1N8%2FJwVG1a7Y2ZoWeYLUAwvlePKZ8jJOuwRkwXQbTPnN0TElGMyxAaqJWlZYsj%2B2ujV3YdhEATZos4fiaQzm%2B%2FZXlygnwIM0ecIp%2Bq50ZIKz2RGoqC9fNLLFVkOsdk6CCNfhOMWTJ%2B%2Bd7%2B2UO1jjS8uo6xR43poJLGOf7nk00HquTVlyo8JUsLIL91ufJ3%2BAnB%2BSsLT%2F%2FT7SLZp5VVfWRTQtCJH71c36K%2Fh7hBrnKv4YqCbXOeBPJQ1zM9AnRnexkpRXG%2FEM6mq4qzy4lt9RnktiI29RRJs%2FZ%2B78YZwW5Y%2FEGJdFnNSRUmbQ05Kii3CLEoyuBuEaRKjx%2FV1pHoNFzvUcoSBlZfFHdgFMeYS63iKj29vDXEmf2KA6VLWkPTxVnjlEYYVL0QUdaZNc9C4DrwiveWxjqSzW513zsEYVxOgXl9TAbMLHiwswGOqUBVGDVPWxGWVBdanRZ4YtA6PjPP76z0%2BUG9sET6Q57U9OADY0YFZhsbYPTuATFX47VU4rS0QnbtYOW%2FV7D55Z6n0H8nc2i643Kl0ftpwGH7Tq1N8He4tZ7fhqBTfa3sne0Ps47%2BJBQkJz%2FN5zL%2FMpjRpoInRyR41s9UCO%2BUC9J7y4JNFJbuxVl55%2BHR1X%2F2l%2BORv8INfv%2F49bHbTKY07fFPq9MQF1d&X-Amz-Signature=a5e3c4e1ac4002e3f98357fb5a8ae05435e248ea96122fb73528a1804a3ead4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKTYLSRU%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCPiJ6l50x54nzt%2F7hnjn%2F%2Fv9HTFIKRwEXW5Hliho%2FZMwIhAI%2B8Jq85tVgOyup37PA5OxVeE3bHI1JsnFaGcg33m7XmKv8DCAsQABoMNjM3NDIzMTgzODA1IgxcArVKCctTsYyfmr0q3AO8Ot1vxx%2Fkz%2FrtbtKxs1FX5SMDU46QzoQJ87TpK9aomyTA%2BJPKC%2FVl1iJeG38MsT%2FqUIvz1PmawoW7k%2B9ymgr1XbWZdRZvM1sX8D44WytkquuG3AeEcpc1hGSJ2kBDiiMhex1C1Dp7QlVP0CHrpRehA%2FSwfLktWSKuN97kCqCIXCsPbR8mCR0F7t6OZLW%2BI6Nv4tmTo7KmdWQJf12rFeMVGpdG%2F3bhEUyP78xXeLGRTPHK4Ne4viusTBk0LCfuiFt0BVM%2F2cvmmTzBzpmKp1FdJNMhTYqh%2F%2FPhQhk5jBiIFe0TsCiiZhwOrpKFKFA536tl5CnEPHsUc3A3AOIO75jGTKjCzw9jzZZugE%2B64DBbUT0pqRCoxy34562lsw79adLYuCt4Hb9QfJaI64yMP2MWkgfDT0xeXQ9H6WGDOfrP9H16LO7wsB07iv9SHMlTBaRPlyJPhDBkkEHehwJPwwkJVXpaSXH7WSPB%2FEEFIkc8MRwxhGkyNSjGCkn1xB7ktP1%2F8MvxKUPUkY7Vm%2Bvbycy%2FpHuEdfGa1NOjqAJP4P0kDrf2VpsXKhLXrmn9C0lQgwtjiAwftzL5BoEcZILoYquuBA1WAwwkgXC6v4ccYMgYTQey6HxUkQ4WJAryFjC%2B4sLMBjqkAUaD15R%2BR03G5HU5HN5ErzYSIITr7rDjytrQyqZmoUhRiqBRpE4QupXKTCYnmPZf77lyqQ%2Fifn6VSGqoynWiEymPLkUfeMA3sJDmhEzef8OksQK5huTbLEhKuzze2x50I%2FNB%2F4febT5I5XQsQcG1pI%2BQXV2xwN%2FFiwFepbtgUNJdP%2B1BbIn6Va0KK2D%2Bn8lS00GUTtNh6YbKE6lfWMwieVL5BV4X&X-Amz-Signature=04da2b4a009d9bc3ab8e9f2272bdf939304df722d2c7e202bbca3c718f460ab4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKTYLSRU%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCPiJ6l50x54nzt%2F7hnjn%2F%2Fv9HTFIKRwEXW5Hliho%2FZMwIhAI%2B8Jq85tVgOyup37PA5OxVeE3bHI1JsnFaGcg33m7XmKv8DCAsQABoMNjM3NDIzMTgzODA1IgxcArVKCctTsYyfmr0q3AO8Ot1vxx%2Fkz%2FrtbtKxs1FX5SMDU46QzoQJ87TpK9aomyTA%2BJPKC%2FVl1iJeG38MsT%2FqUIvz1PmawoW7k%2B9ymgr1XbWZdRZvM1sX8D44WytkquuG3AeEcpc1hGSJ2kBDiiMhex1C1Dp7QlVP0CHrpRehA%2FSwfLktWSKuN97kCqCIXCsPbR8mCR0F7t6OZLW%2BI6Nv4tmTo7KmdWQJf12rFeMVGpdG%2F3bhEUyP78xXeLGRTPHK4Ne4viusTBk0LCfuiFt0BVM%2F2cvmmTzBzpmKp1FdJNMhTYqh%2F%2FPhQhk5jBiIFe0TsCiiZhwOrpKFKFA536tl5CnEPHsUc3A3AOIO75jGTKjCzw9jzZZugE%2B64DBbUT0pqRCoxy34562lsw79adLYuCt4Hb9QfJaI64yMP2MWkgfDT0xeXQ9H6WGDOfrP9H16LO7wsB07iv9SHMlTBaRPlyJPhDBkkEHehwJPwwkJVXpaSXH7WSPB%2FEEFIkc8MRwxhGkyNSjGCkn1xB7ktP1%2F8MvxKUPUkY7Vm%2Bvbycy%2FpHuEdfGa1NOjqAJP4P0kDrf2VpsXKhLXrmn9C0lQgwtjiAwftzL5BoEcZILoYquuBA1WAwwkgXC6v4ccYMgYTQey6HxUkQ4WJAryFjC%2B4sLMBjqkAUaD15R%2BR03G5HU5HN5ErzYSIITr7rDjytrQyqZmoUhRiqBRpE4QupXKTCYnmPZf77lyqQ%2Fifn6VSGqoynWiEymPLkUfeMA3sJDmhEzef8OksQK5huTbLEhKuzze2x50I%2FNB%2F4febT5I5XQsQcG1pI%2BQXV2xwN%2FFiwFepbtgUNJdP%2B1BbIn6Va0KK2D%2Bn8lS00GUTtNh6YbKE6lfWMwieVL5BV4X&X-Amz-Signature=04da2b4a009d9bc3ab8e9f2272bdf939304df722d2c7e202bbca3c718f460ab4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JFG6QX4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T181525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCpTz2WJEOdSixEyzyOfYR6nbsFMEXJD022uIIQs%2Bu8%2BQIhALiFrgwAlNSJa7mDWl1SR3LioedYecbMeMsIUFuNAr8%2BKv8DCAsQABoMNjM3NDIzMTgzODA1IgzPIZWoGnsAMl9OVuIq3ANDo69wwcvL4C1%2F%2BcaD42PeQVaeUKOU4PyGfgnpL%2Bt9%2FPUsujpjTZcJKaxK%2Bv%2BvPRuWEa%2FV8JUmBylQ9MLSWYWgkwyByg39Lp9yr9P9ZYQQsKW1phUykKq%2F%2Bu%2B%2BSZqmVq89vY%2BzsH4HU8EQ7vIgQC74k4Td4jIyJbanCMSF6rbAmmB2ZY%2B%2Bdjicz74Hz%2FuuBih0U4zLZw8RZlYwkdwR19hmMeaCU7wySjoYLChne%2FsM4emAX1MxqjY0aJYkUranMKYXu4KMZpR7ifPtYWQBtGdjyLBu4os1j3hgi3x3JJhUr1wVgpUNUo9rElUYD45fGjC5Z6HadreJHDDVcfeeXdmUmr%2F7I3Lv4g8%2F8E7S3IoyLlN54H0oyxYIcnfq1gfk0QDTJaj0cZCP0QDPG%2BmmFN88rDeORHJpMjqxLUcEudWBBT6CsgUCa4BaPza%2FWmnJ7rTWQR8VNkZWVI8cCujCI3khB02Lc6o%2BoCcypzG0zTHcF4bDi1nsVEH5m07VrNmUABdADGYoeBZIEwPYhszH2uK%2FlGDMl2ySFjyW096CjIcWqnHU8PWsHcd%2B%2FRAj8h1BWt8vV2cWhhFR5MZ7JYY4XuZeMhTL%2FR%2FJE0kdLPvN1GyGY%2BaD1gW7EPh2X1lxPTC14sLMBjqkAYOItcFTFrkRNKFfPq%2Ff8hN%2Bc0kpliODeKZrmmSuYQvP9%2B4k2XBuNzwQi%2B%2FyuawjKMqtyQuQV5WhGx%2B9k8bkzHsUeX5NxOAA4IYLDZDrbuPB%2BGWULz%2Fkgv9gnUktkKUbhWoiyfOXdmcxJL9CMx5q%2BFO9sz0HQwf6oH12Ntg%2Br6MJ341nTWWhoDidTKX3Qb7R8S56YjnjvrPVqjJrnRrXt7QC4dP7&X-Amz-Signature=c499028bcca07e664239296a3bedd18466fa3dbe8ed34bd2c9d23d96fcbe9b37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

