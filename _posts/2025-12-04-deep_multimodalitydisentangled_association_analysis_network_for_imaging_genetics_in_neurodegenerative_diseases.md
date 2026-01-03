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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4BBG5UF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIDE7e%2FI8yNipHkzJlcZNQlDSrlY91sz2lsuK0tY1FKhvAiBMOHQ%2Fu0JobdF91KPX3uB2HtEEvE0OwoOyBsp%2B0IBBFyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMkE246Uz2ITkhnFDhKtwDsGrJrwv91Kdg1IaExKOoMKGZqYRF%2FtEhTV%2FWGmbgYmYM2M2uaYjm4kCsFleOp43FK2tIZejxFXkvpL5Vtlkf3Yi0tC2yzqW69KamcPfnSZVGtuCasf7jqxgce8caII8Pb2xUJQ23zAM2KcbXKXPmf%2FxSupb7m8%2BeNgQbNn19CC9CJzM3hGVi1hCZT764hwCcDY0wGXtOf71EIRf3qO7oe7jHJ1U3q1pCQqrs%2BOZw3aJcurxo8AE2WxL7xqCAsI%2FhuigPDgKOyBPoYxBb8vL0dUfAc8HGuwKJjkxdTWaJEqZGXnd5SzLOsTjWd5pGnyy2jjmW1z%2F%2BF%2Bxzf6Yp52eFp3VeIM4mFE%2BAV0NN0Xwx9RjLpumRYnBT%2Ffn8VEVYWrki42EzscoddsxrN3Ey%2BnrBngOdFglxMFAa3irwaeVo9B073Yi3DcAWEWzQYoK0roUtMOtAq818hwmhZTHnUn3fDeFbGSUuayRxZMND7RG4OS8f2Swq%2FcXkzU8IMTC8u0HyDnUWQDix6tzkosJ5G%2FfJaBJqpENGT0s996NDzuuSQhWICTnqPeM8NU3o4wgQb9pE%2F3A%2FvyH128uTs7svwg0XWO%2F7Ryb%2FkkBJlvh6tjs046TKjP3HZaQwX2ronZMwiOrkygY6pgGBVB0qNQQYtlV6qh43p5TOmZHiS%2FbPjQmqITIy7Dc5oe67elFhs4Yrbr%2Fw8TM5xUxkOhx9t8JqTQeLpXaswOl1EZtoa7WCN58FIB4UZH%2F14XMdUlcpwSW6RZz4499cBgqvuVJthoQOeoy6pOnqfhLEBbyYTj0bA7ZUa4Tf2X2EZrTxsPQ9ruqS3xuq9Ds%2BJ8%2Br%2BCi65CzTYdn%2FCE6gD%2BpdIsTERVzY&X-Amz-Signature=d67b39603f192851449527575e2c52ae90430f027f4b06d0ad1b3a43e6e771b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4BBG5UF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIDE7e%2FI8yNipHkzJlcZNQlDSrlY91sz2lsuK0tY1FKhvAiBMOHQ%2Fu0JobdF91KPX3uB2HtEEvE0OwoOyBsp%2B0IBBFyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMkE246Uz2ITkhnFDhKtwDsGrJrwv91Kdg1IaExKOoMKGZqYRF%2FtEhTV%2FWGmbgYmYM2M2uaYjm4kCsFleOp43FK2tIZejxFXkvpL5Vtlkf3Yi0tC2yzqW69KamcPfnSZVGtuCasf7jqxgce8caII8Pb2xUJQ23zAM2KcbXKXPmf%2FxSupb7m8%2BeNgQbNn19CC9CJzM3hGVi1hCZT764hwCcDY0wGXtOf71EIRf3qO7oe7jHJ1U3q1pCQqrs%2BOZw3aJcurxo8AE2WxL7xqCAsI%2FhuigPDgKOyBPoYxBb8vL0dUfAc8HGuwKJjkxdTWaJEqZGXnd5SzLOsTjWd5pGnyy2jjmW1z%2F%2BF%2Bxzf6Yp52eFp3VeIM4mFE%2BAV0NN0Xwx9RjLpumRYnBT%2Ffn8VEVYWrki42EzscoddsxrN3Ey%2BnrBngOdFglxMFAa3irwaeVo9B073Yi3DcAWEWzQYoK0roUtMOtAq818hwmhZTHnUn3fDeFbGSUuayRxZMND7RG4OS8f2Swq%2FcXkzU8IMTC8u0HyDnUWQDix6tzkosJ5G%2FfJaBJqpENGT0s996NDzuuSQhWICTnqPeM8NU3o4wgQb9pE%2F3A%2FvyH128uTs7svwg0XWO%2F7Ryb%2FkkBJlvh6tjs046TKjP3HZaQwX2ronZMwiOrkygY6pgGBVB0qNQQYtlV6qh43p5TOmZHiS%2FbPjQmqITIy7Dc5oe67elFhs4Yrbr%2Fw8TM5xUxkOhx9t8JqTQeLpXaswOl1EZtoa7WCN58FIB4UZH%2F14XMdUlcpwSW6RZz4499cBgqvuVJthoQOeoy6pOnqfhLEBbyYTj0bA7ZUa4Tf2X2EZrTxsPQ9ruqS3xuq9Ds%2BJ8%2Br%2BCi65CzTYdn%2FCE6gD%2BpdIsTERVzY&X-Amz-Signature=d67b39603f192851449527575e2c52ae90430f027f4b06d0ad1b3a43e6e771b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DE7Z5L4%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCID49TttTGOJZ41tie0pppljwLoPFtgUiJ2EClrW9nmcZAiBxaj1OFeOl5ZJDeB3y2n17%2BXCyQ7J1J6ZCW3tXk4kUdyr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMptILZrK3uXVhwm%2B3KtwDriJJ3bZcvb%2Bf3mRIys%2B2HnE1DlhjlCoIH2e0ICDIa3UDjLwsHXYZKYCzlGB4pujt%2BczdKYMIeSRsmUqSgkGnWlvyiL6c%2Fx8QV%2FKdmGfjF9EivOHKMuq1VOV6634GrgpN2SW%2BCUqmronZJ%2FVrhc3J8hItbfr5yPoYlA15qTCck2eQawTic5GspnWZEQOW3SiWUzdqYAVQRJq22nsV5BWnijbFpNwgF5%2BVSpskJfzV866sR9XJI4H9%2Fza9ZeKfD9iMu%2B6emj2FC6Mv9%2FZN4PQmgtYyQfc7yG30vrEfBmWji4yyjGZPEISXCYHIJecdFURYM77DTdjww8zTsYMpKzDaF7PgMPD41ynCJvpUNBkDgYQWey%2FNpzNzzrkuhhYSTB4GAOQgNwoMalDDdKW3zM50Oz%2Fah4mlBiECaLrLnkIgqkRJVjkxso%2FqivPyvSsv%2B%2FRvybBc49dIGMur0O1sOOjS7HKABTNGSJ%2F%2FpatncGo6smvqgD62zIWPHxvuiZWvghZlCuVAOOpfJ4M9eUgqL%2FjIt32aolDlSaFM%2FiigQQXES2m79Xsk%2FArkcqlF%2BPdkzJAuLRTVsxIoOv4pQh7NFr2SJOCjg83SXZ%2BrJQxN%2BqZVkSMzjLCAj5dGOG8EjM0wnufkygY6pgGkQ62gnhS5N2uIJODHzIx6rnnlbydeH4yLVMGwQRkaLaBxQ6gtb9fyVN8lXyrdgOsIfHZqJhFpnNd%2FDqTC7KqtsMeLZL5l1lwKE8ZUJBgXzTS7G4L65gZH4mfYkErngDKevcb7V6bObUFgqTUMR3YmrZ6TZxtO59o4nSTnY6c3%2F2NJfWDOctd0mLBMyWvn6KyKMz9H%2FbCpiCSVVLkcZYIPZJ%2BASUzf&X-Amz-Signature=0d4436a12426f9c9b8e5efc21a91ed43edd359cc6a06abff8abed5539ae92ffa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665R4DY3SG%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDtBd4OLJRAoeZJHFipp5zE7BGVtZL5bGEA67aW2DPd8wIhAKu7LzjUxkOke5RpfZ9e9SiwxxunuOXMY7UBnVNuIQZjKv8DCBkQABoMNjM3NDIzMTgzODA1IgyzmwUjHFu%2Bf4jN294q3APiVpv5Ncuzd7Vh9ie0CewnjMhkkiJEmTvHjeSayNvVh4M8UiDSVxCSPFD0t24bMX7Dg61%2BpD0%2FRIUhN%2B0h0hjIQOrWnrWnnZtSoD4oPfPv71L3s56oOuCb8ObFo675HL%2BeUpHx%2FyQgSKkGqaHZbb0%2FTLWYRcOxYInNn6efMjPtsD%2FIYLndx0MChUkuWbwJixRZZcpZ2oPUzYNtZIWpui6k4lR0oLKS%2FEOFn%2BKDZblDtKKdyAGTRO7x0V1pS1hG%2BAdMZxgI9uulhWvwDHq8h0mgE59UK1KAicKZqaMtOba3W78thfcbHhDsugbwI5HtxcRyM3EOEa%2Fwt4cTqFgocXsXkUXK3jVGHg9h2WRxlODReIkNl3SSBA3o327CXXnbH0PWC2zT1Xj2W8L6U1UCyXLTgfv1IM6O%2BLnjUGaw9dN3NBeOYi7JcdbFx%2FvnPaueS%2BH7sBDxvNUNzOKTXTuDpiraDR5EphpvFQwD3WYSvsqIGG1cjGa1HFCWXH%2F4M38l7rAOuQj4eb0Rfam%2FJJMevPG7vUYVlx9ttPuYupquEimMBtyhuqg9hAEB%2BLVyVdSvG%2FzB4MWGpdAv3%2BoW0cgDBJjKi9I4I5PkuzplchjaK97ZyZcXSzc229x0NhbzsjDl7uTKBjqkAf5opeLHSg%2B7Ir4Pun3NkO8tAp4B3eGngzg%2F2KSYs7bDjTq%2B6gWCsqXGhZe2KXv2dUWzor2jwk9vbDRubgHMdUkwFU1k3WPeZg%2Ff7jyn6YGddHowM%2F5sXAakFNVJZ9O3el3VAdhp7Z7erjjDN0dPQBRBKOBOTq8MTHlxE%2FsGVREkXouLqD8Jfdh0wSDlHsYaMbtrcfn33NLiEM%2BTGBpn7c%2FyE9vd&X-Amz-Signature=6861090349abce9c5c75c6475a1ac652ec8266f05e0ddbc8427d02839c6f3929&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665R4DY3SG%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDtBd4OLJRAoeZJHFipp5zE7BGVtZL5bGEA67aW2DPd8wIhAKu7LzjUxkOke5RpfZ9e9SiwxxunuOXMY7UBnVNuIQZjKv8DCBkQABoMNjM3NDIzMTgzODA1IgyzmwUjHFu%2Bf4jN294q3APiVpv5Ncuzd7Vh9ie0CewnjMhkkiJEmTvHjeSayNvVh4M8UiDSVxCSPFD0t24bMX7Dg61%2BpD0%2FRIUhN%2B0h0hjIQOrWnrWnnZtSoD4oPfPv71L3s56oOuCb8ObFo675HL%2BeUpHx%2FyQgSKkGqaHZbb0%2FTLWYRcOxYInNn6efMjPtsD%2FIYLndx0MChUkuWbwJixRZZcpZ2oPUzYNtZIWpui6k4lR0oLKS%2FEOFn%2BKDZblDtKKdyAGTRO7x0V1pS1hG%2BAdMZxgI9uulhWvwDHq8h0mgE59UK1KAicKZqaMtOba3W78thfcbHhDsugbwI5HtxcRyM3EOEa%2Fwt4cTqFgocXsXkUXK3jVGHg9h2WRxlODReIkNl3SSBA3o327CXXnbH0PWC2zT1Xj2W8L6U1UCyXLTgfv1IM6O%2BLnjUGaw9dN3NBeOYi7JcdbFx%2FvnPaueS%2BH7sBDxvNUNzOKTXTuDpiraDR5EphpvFQwD3WYSvsqIGG1cjGa1HFCWXH%2F4M38l7rAOuQj4eb0Rfam%2FJJMevPG7vUYVlx9ttPuYupquEimMBtyhuqg9hAEB%2BLVyVdSvG%2FzB4MWGpdAv3%2BoW0cgDBJjKi9I4I5PkuzplchjaK97ZyZcXSzc229x0NhbzsjDl7uTKBjqkAf5opeLHSg%2B7Ir4Pun3NkO8tAp4B3eGngzg%2F2KSYs7bDjTq%2B6gWCsqXGhZe2KXv2dUWzor2jwk9vbDRubgHMdUkwFU1k3WPeZg%2Ff7jyn6YGddHowM%2F5sXAakFNVJZ9O3el3VAdhp7Z7erjjDN0dPQBRBKOBOTq8MTHlxE%2FsGVREkXouLqD8Jfdh0wSDlHsYaMbtrcfn33NLiEM%2BTGBpn7c%2FyE9vd&X-Amz-Signature=19cf078a63ffe66a64861de35894834af778660a0954c3048e4779f421cb20c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIYU3GKM%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCICVpoEG4SJzjaeh1TjeI8xO1lKEV8smKRsNvhI8mmEqVAiEA6dKrO4KF1k2kAtc6hyG6XqxA2ZpoVRUfOPh9tbR5i%2Boq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDGc5jtloF9I7gsMCLSrcA7PXMVX27NcAbgvG0Pe%2FnqlU%2BCsk%2F2kQ4cQtfC04qXgYM%2Br3%2Bba3w4X3q48b4KzGTvWPDL4ZK7ItSypbHMi0iW1dRZEpQ6kRGC50FN1r4lFtAvu7xOV7HoZJG3MQSa015JVuu1pqMnfBryI%2Fwkd2E2RuoN78XNkc5CGKKCL6ajVddfEubjy%2BnEC0tvtXJmxA07QokpaQkJCuXW%2Bmys9PEU5iH8UC0fCiCnj7TsxkTZG6ZdlZiYUrqoAA3%2FRGzOnbB31NHSMIJ9b17SI%2FQoqPIRpGlxfKP%2Bgx%2BS8toH8gzoY7G9OKBYMFt%2F%2FryuEJGOrwbXuWBHyIJjcQct5uBI5E%2B3YfDgG5C4a8QssbaMKH0axdVx708QlviRildosIfOAHpQppf62oQa0Y9nMTDROjL91IiaVS%2BtWaC9ODbT92EmkAqy6FRZr798sfx3euEq%2BTZSTt3mN6%2FGMWMrVLjlLwRphsanVQ3mKo35a%2F21tOnjjWU3%2F7giLX1sXp9X5LreldwzWkzs%2Bq3K5ewfkIPG%2BWn6vDb8w%2FUEvr%2F0nyKghcWIjBfQIL%2FmlcsdBF%2BJPboLDnTN%2Bx5G0UPml9FeEKm2LGoXLA9cay4YwzC672tZQnRAhDvH3Ilw%2F7zwTufqWFMMTw5MoGOqUB1oW89yRrV9015DrdcqEFykbRqjwcEXnK%2BDbHLKDFZHxu0rP82%2Byk4QnxQBAIl3r9kmj9JCu4R9mwhEm%2FyJAeUUMcLCnffMEKNbzAT%2FUEFA9jkkWh2MYRCuqwbiu%2FgM0dKmIUlrAX6tBmJhtTN0TXSiEnkzAp3hV1UvJ4inK2VGFH93A6RqNjJKGjpqQC8RjFTLHJGCZP%2FjgEy1CsGWEPv1z9J3DS&X-Amz-Signature=a1c96c71ed05f9b3c0e3e60b76e56b0327cf2f7239affb5f9b22c1a5d855161f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EMIOPTH%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCID2vFyRGDB84TXcif%2FDgu5qZmA95MzyelKfRYvHJ967MAiEApEZwXaQQCDTAFx6h7fx1B5D3GUs3YSjgXgcLNEte%2FwEq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDNQU6bTrPMCkHFjCayrcAzMVA0XWGSKdatV%2BWKSDC4MApY9oTsDjnzIadwkUUSbnlRD7%2Bf38ujSulbQP%2BAowApBg7fFFxOhRVpWxzgwEohhxm9RAHPqZGkVQcNicZWilhzTrDHGhjnIDpNIQYnbTIbl%2F81nzccMNTkGMYdBOCCFidCsoaWcBHjo0CNvNMpV5fc02760DB2YybtdTkWngOzuE4GOcMcaYsu6MrqC1A7OvdTBLOwZIQoNdHwy7M14dBrV9QbJTQ%2BZcZKAM3HKQ2enoonQXK7fECaZjwP6h5095W3%2FYWT2wuEkQoONeyaUxVWYDzJGiFoEEFhM7V%2FjJiq3d8PJmXfyQYKq%2ByaW25a4yKxT0DSIJ50e5qLHd6l0o8tU%2Fo9TEl55Z9oh%2BpDwe%2FRpdmJaRQoavVmlSVNt61aW3wrNog2%2BCtjbkba4UHY%2FQkGesDRVwtMDikj7wIrgh83bRcgwQd0%2Bbc%2BO6JPoPAbFMr7eQb5TffPmUO0H1blPZCtP279mYNJUI%2F9md5V14Vnui6sp54EExHK0ZvVni3i8aV2RTj9zVIWZXxCpsv8qqZjB3qFTL%2B1gBmJ1TjlcedamTXx%2FwzjzGMXGo6M74lPE7dlD9zR7PVdIG%2B9KoiHARl9GrMyF1zzHxcIbdMOzk5MoGOqUBWVI8GQCaHdc%2FBZNT2aLNwDPFho08qiLHGKLZ6cvElGPaRXbG%2BPmuY1VuEWFijo%2FUCbbp6j1a6xTgvUlgFqVspIb%2FhbdZ5NnsrD8nEz%2Bd5%2F3u6QUb4p90aYbWX9apGnCCnJdXe%2FBySQBuYwKnf%2FM9NiaCe3aW5A0vYTOoTwiohn2aIPmzuyvyNw3zPh%2FJ8cJ1lYU5sGA1uw6Cz5S9xPKFQ9fnhDpH&X-Amz-Signature=e0244dc1bb6302edd86bf61780653b031c684c27520401006a56f132785563a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFKKVUJL%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIEwL9PZQFeD6UGgAi7TMaaP6iZTq4aMV9pedQj386Y%2FEAiA5FbGd2Y5z%2BiXIrnLvsQ%2BBf8qntp4udKduPkaXnVasMyr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMbPcZ0QHQJtyNK3ZTKtwDUfv%2Belk%2FKYI9InQ%2FaP9OwuI%2BM4SZjvY%2FS9Rki0wgTD%2F0hgppCocbY4pBwVJ7%2B0WJ1dDB95ErqDnwnmc4svDCZEvgngpwdau%2F9J8CqOWk1y0g9aNEaQZ3jEYP14xJXyYS0J3%2Bj%2Fu2EJdnsVxOP1mCgCfGoEUOIo3lGdFNxu0VgBk1%2FYDHFolD2HhL4qwn6S%2F%2BhpeWPjyYHv1huTeYT6D%2Br%2BeZwAEnZsTuM2eUA7CALhriN6J%2FNNNgmtGz4aPDcQmZHrTlAqyCRhZ5eunALNz5IYxOY8E9wVdGc7Zms1ZKMJ2nAmwOCo5VfsQkcLQcznbf%2BYxxUetZo0b8QDsb4dD5Zb6Xd4HZK7M5mQfFxnBrygi4HDCffT1xdzBhuoxOlg0cu%2FLH9LW0DRhR4B8cy55Ek%2BYKocQAcBwCvxlgXScRqyoJxNsvvHjy9ttoQCSkCs%2FvxNEllMx%2FPdgsjDETVsbCMrTgEYLK2qL8mp%2BebROvC8msGzGo9mqYiFxRsL5I7QJMN4J0ladLVM3bAWX8LwFFOVK8kWNEUgoRgItTetWQxytmCWt8K%2F36aPo0W%2FwDORQHj1lc15fz%2FXofOs3v2pBTKlrgitnkugAi0WbsKkxoUMTIhIhppTVdMfx3lyAw3ebkygY6pgGykF2IajdgZrzqSw6pK6yiwTkZqm03jlFRsTcO2aLP%2FoQITLy7ra40OEsFuRV1RW5ZdirtS11YrfYPFDW%2FvxyqqnwYBqWPJNEKzy4ZYUY0kgaYU%2FNMsgJY%2FWni6n8FcG%2BTyeaCm0LHs1SaBj9rx%2Fcp%2BFMqeTS%2FYO3tru3whRuuQ77fT3Kg5mpOcmKrwH%2FB1R4P%2F2UeXm4wbDqIrvDHb9K6EDahM5aW&X-Amz-Signature=c2d19412e5815d20103dbf084f39ea7cf219c602f6ad31fcf2b18d478ed0eb24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677CDAXBP%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIFuDyAFK4HkeJOy94z2RR5rezb%2BSxXXrQg%2FJziSpRVzjAiA3JqccV4%2Fxkvk1nZt1uda0bD7nGnWKs0heNU5rKFvIPCr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMImQ2VKTCQ%2FQdGgD3KtwDil2yoDTWxKK%2F7LzxX7C2VGk%2FuyISm8fX%2BNodq1rqoh1j2wxg5BqM%2B70%2B5Umotw%2BeZmcjluAUuKLmzHR2FkKbXUddFZd21WwdGBDUIO8EC8COjJsubUTXZ49BlxbnunzhwbGJ6yHF4%2FItShL8YOikVzm6WvRMiy0e4xxgBkVnVyaiMKSfyCh0USXZ%2FpAkmH9LJolGj2Ff3v3LzwUyDFg%2FwmZgl44Fs5URrh%2BehGEn1fC8FArdzloUzaYX4jKZYUI4ILqWmDmW4aKBi6BEasgyjKRjgwXbOfeO63kj1zTVEduollI4RjRWrxfcZk9%2FexVKVVt3nFbwphzIA06J50sgKSLygrK0%2Fm85%2BrCrQXL5FC7ecCzZb4pjemLpgE5wAiWrL%2BD7gr3xDWsIAM9opPJofKlA4sjqEOELqpQngZ68tfCveP1o%2BKZHL21a71jhAI4Ybg5GMmTniJik4i2odpeKxWpFNr5Pjj8vSh%2FkW%2F%2Bz2FMWlwEIKl3Oxx10I2wcpvPxwjdBvMLYHXUx6WDdw%2F42Lys1Nuy6d4ZP%2Bof9njq5TRZ8kyCJl17nYZnalI%2BDRW01svntwNsl383usC3Rswaa4rKJD2iQt76hVQIiT5XILaJKN4EO6gkSYvx%2BLxYw5urkygY6pgE%2FMazrP8OPGNTwiMpilBZxYJPa%2F6Q%2BgBxeAzQf3knGGI%2FgY%2B2e9w0HokrwGDt3wn3ma5xR8KuISnRDWqPKDb1fozYhIujpiabVeY7EOblmJ2b1O9D5gNdJxmk%2Bri9fDBY4GoS3hDunvZIkzefLpRpLrujHkyZp3UNLq%2FFzHHJTqVmEQxSetmGxLxaDEmRQcGylC%2BbaqSXefNJNasCASTj%2Flfo7U3LP&X-Amz-Signature=65c521825f1b28f64705ec2b5c4c747a1a95442fac372a8fb2126253a7610ded&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677CDAXBP%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIFuDyAFK4HkeJOy94z2RR5rezb%2BSxXXrQg%2FJziSpRVzjAiA3JqccV4%2Fxkvk1nZt1uda0bD7nGnWKs0heNU5rKFvIPCr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMImQ2VKTCQ%2FQdGgD3KtwDil2yoDTWxKK%2F7LzxX7C2VGk%2FuyISm8fX%2BNodq1rqoh1j2wxg5BqM%2B70%2B5Umotw%2BeZmcjluAUuKLmzHR2FkKbXUddFZd21WwdGBDUIO8EC8COjJsubUTXZ49BlxbnunzhwbGJ6yHF4%2FItShL8YOikVzm6WvRMiy0e4xxgBkVnVyaiMKSfyCh0USXZ%2FpAkmH9LJolGj2Ff3v3LzwUyDFg%2FwmZgl44Fs5URrh%2BehGEn1fC8FArdzloUzaYX4jKZYUI4ILqWmDmW4aKBi6BEasgyjKRjgwXbOfeO63kj1zTVEduollI4RjRWrxfcZk9%2FexVKVVt3nFbwphzIA06J50sgKSLygrK0%2Fm85%2BrCrQXL5FC7ecCzZb4pjemLpgE5wAiWrL%2BD7gr3xDWsIAM9opPJofKlA4sjqEOELqpQngZ68tfCveP1o%2BKZHL21a71jhAI4Ybg5GMmTniJik4i2odpeKxWpFNr5Pjj8vSh%2FkW%2F%2Bz2FMWlwEIKl3Oxx10I2wcpvPxwjdBvMLYHXUx6WDdw%2F42Lys1Nuy6d4ZP%2Bof9njq5TRZ8kyCJl17nYZnalI%2BDRW01svntwNsl383usC3Rswaa4rKJD2iQt76hVQIiT5XILaJKN4EO6gkSYvx%2BLxYw5urkygY6pgE%2FMazrP8OPGNTwiMpilBZxYJPa%2F6Q%2BgBxeAzQf3knGGI%2FgY%2B2e9w0HokrwGDt3wn3ma5xR8KuISnRDWqPKDb1fozYhIujpiabVeY7EOblmJ2b1O9D5gNdJxmk%2Bri9fDBY4GoS3hDunvZIkzefLpRpLrujHkyZp3UNLq%2FFzHHJTqVmEQxSetmGxLxaDEmRQcGylC%2BbaqSXefNJNasCASTj%2Flfo7U3LP&X-Amz-Signature=68a70ea7ab5f0af725d2167ff286c5107de9058565a4791c568e6bb41aac7661&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664W7EVN4Q%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIAi0Vj8lAUheHJvw3G8RykKABiIbso9nVh4B5rsm7IHZAiAc%2BUVRR34241WG9uyYUSpeNY0MybtR81yGmmdrLkPoPir%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMqT%2FK4jUuZcSWkesVKtwDOL7h39lhXEPMIEY58w6sasAVBOiO8nByKdSAM1ePmmSFJIlcN5fOfS9ySxN7qgdBMIRYHXAwxh%2F3KnfwG0BW9wmE2JtlQphHjI2dpUlmVUcGt9dJY0511pYFRSygo%2FcytbVccCuPeVEnTtHUjvZtLtgcJiRF9%2BpI9MxbX1nysy9ZW0cz4h8RPLV4MWfCuSktC0gNBBxXv7lNuDNh2hiqe7JWwvL%2FPueRBsBpVt5i8rcoQlh7MSXxZhR0RPRWrTCNTW1mmyHt9DYaaiQLdTDDIcXz4Abdo09jtGTnM43shyzomqQBKt55%2F2daklMQP%2FNeca2CxX1oijtkOztrPBM33heNx%2BOm0iB80TLFAwa6QfszgzWwKHB6Z160n48D1z3hi5eDpIFKaykTIx6MlEUjvhUbWlsUf2upCq9zPA5PxCk8aZBm3Wgs7iwRWtZ7%2BgndrHtEEhY5UZ7mJtjYdAN9S0WURvs6eifv0GgW6ku5HzJT54PXtRxkDd6pSD0qcErhwI0T63FrREyCMEUhvUdViinIQEtaibko%2FYbFw8hRp28jp1mC9FhztpmrVb3i9ZVFjFa3r42PVu3HQUy962fdUbVven2kvt7%2FS0c7L1aenaeMXFkeEBwP2BF3GO8w5erkygY6pgERJB02FYIc%2B23%2Bk%2FvqjMwyfBmEQ42i4jSQW66UUwCdBl1CBzBiIcMsJxGkPMG7pBu9wDXRCC0ZVZXLv8JHBPzUUw9q0OmP2%2Bp2%2FZB6vOlSoGeVWEJ%2FNhdHdN80VfDeR0DVS5DUxvhe9vzjDnRtKgNLTuYqAKVJTgt6zN7uOjkzt12bAl%2FT9OnJS7fw4zMbqKfCZJxET6wtXgqeZmdI2sSeebciMPf4&X-Amz-Signature=fa3baecde1b4233aa7d926ac20266c69cd396d10481aea9cba25cdb966e3e108&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IASUKZP%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDgc9K5zO7C3OjrqUu4GDChp1QZLTncvfeWkfXQN5BPuwIhAMxkUYB2EgOpp9y599phDnEVDMUXzxufWqBFvhUQfv8QKv8DCBgQABoMNjM3NDIzMTgzODA1IgwnJq%2F4RXyorw6To5cq3ANwYGKrCETlWu6TrcNRz%2Fvb6PAuFfGdqKGwjBluTDPdor2TM4zmCWBfQ3LbcWxjkXTT2wbg%2F9Jvpa66a82THqdsh9OIn1nIcmPCVTHdv1yaNruA4IbQJuP0en2enAogKvF2nWiBF1xkp%2Fu52oLQOeYOhp%2BGfhy44Nh9z4%2FXoZ4mfN69d03Xu07KpFPm2kui1V1THlr24bkGqKJvIvBt4tHv3y8oEPdyk9vwmfb3JjEH4nqqy67FR9kEskiPGzrepNkPwGqn7fEug%2FEnM28piBS2ITxiDT0LevlYJklET9dmEFRc%2BVvXkWjU4Xcc%2BKgNszpkbW5bLxhpFNWKNFVxPZNYM1l6DmBzaT2I%2BnJupqLWVxkNBxIzLFW5jF2TMupYa9OSWIjpI7phEuPUrqEIWl0tULQBzSFNtrErb32lvCwzWCPMtCSfOdgUPWrKpxj982c43tcZo3iVmu8Qm2ldKUADtpimo%2BQ945cpyJBvIyfXve6JmJrvunqcc7vDeek5%2F51rjhMNi5rRmr7zC%2FEgvh4s8qSlsa%2BnpMTGIW4Z6pBPrQxaYKXCbVGubLeC44JDxKMj%2BvEgwhyfT%2Bz%2FFpacCV75QN3Home2HEs%2FVVjdEab1STlV4CfCOn4YTbtd7jDA6eTKBjqkAaKmpfiaNBYcswwLaoT2g728LQIhE62FGPwMSFoOkmUAe%2FLvHcbgcKyQCkg5igQv%2BKdw3kmkgAmKmgbgGpFHODjSdjjFbpHfEX4PQMzzdcm4TN%2BBXiO2hAfB8y%2BdGfA%2Fa0mt9D%2FfZWyVsxgUezNq5NNuhjbhdJQ9aAHIS49b6vPklUD8AV3RXntEOq1CW1IDPq4ynCZ6XLYA9r2af7XPPWLnt4Sj&X-Amz-Signature=5f52779fd07e277dbe9fd3757bf8a60ef174452c671645b8b261287b1be05861&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IASUKZP%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDgc9K5zO7C3OjrqUu4GDChp1QZLTncvfeWkfXQN5BPuwIhAMxkUYB2EgOpp9y599phDnEVDMUXzxufWqBFvhUQfv8QKv8DCBgQABoMNjM3NDIzMTgzODA1IgwnJq%2F4RXyorw6To5cq3ANwYGKrCETlWu6TrcNRz%2Fvb6PAuFfGdqKGwjBluTDPdor2TM4zmCWBfQ3LbcWxjkXTT2wbg%2F9Jvpa66a82THqdsh9OIn1nIcmPCVTHdv1yaNruA4IbQJuP0en2enAogKvF2nWiBF1xkp%2Fu52oLQOeYOhp%2BGfhy44Nh9z4%2FXoZ4mfN69d03Xu07KpFPm2kui1V1THlr24bkGqKJvIvBt4tHv3y8oEPdyk9vwmfb3JjEH4nqqy67FR9kEskiPGzrepNkPwGqn7fEug%2FEnM28piBS2ITxiDT0LevlYJklET9dmEFRc%2BVvXkWjU4Xcc%2BKgNszpkbW5bLxhpFNWKNFVxPZNYM1l6DmBzaT2I%2BnJupqLWVxkNBxIzLFW5jF2TMupYa9OSWIjpI7phEuPUrqEIWl0tULQBzSFNtrErb32lvCwzWCPMtCSfOdgUPWrKpxj982c43tcZo3iVmu8Qm2ldKUADtpimo%2BQ945cpyJBvIyfXve6JmJrvunqcc7vDeek5%2F51rjhMNi5rRmr7zC%2FEgvh4s8qSlsa%2BnpMTGIW4Z6pBPrQxaYKXCbVGubLeC44JDxKMj%2BvEgwhyfT%2Bz%2FFpacCV75QN3Home2HEs%2FVVjdEab1STlV4CfCOn4YTbtd7jDA6eTKBjqkAaKmpfiaNBYcswwLaoT2g728LQIhE62FGPwMSFoOkmUAe%2FLvHcbgcKyQCkg5igQv%2BKdw3kmkgAmKmgbgGpFHODjSdjjFbpHfEX4PQMzzdcm4TN%2BBXiO2hAfB8y%2BdGfA%2Fa0mt9D%2FfZWyVsxgUezNq5NNuhjbhdJQ9aAHIS49b6vPklUD8AV3RXntEOq1CW1IDPq4ynCZ6XLYA9r2af7XPPWLnt4Sj&X-Amz-Signature=5f52779fd07e277dbe9fd3757bf8a60ef174452c671645b8b261287b1be05861&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RB2I6RI3%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T190112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIHUXymzp10aq4S40NoNvNRgwsn8xHAsxxOx9bOb7vfMvAiEA9aUq1u3zrXXkmjR9UwK95V3orQnkzsq82jaeGYr98f8q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDGGGHdwlAjpRLbEpOircAxPwFYxk2hT7KqNRHKnGEkfW9fTr52eR9if6xVfyKr6jg%2FJva3PgkimaMp00JSy6vtH732e16Sm0DZUPDcatcHfknFmGRLDQ0m5X2oOHTeNA8NHXwYi0WfTDoTxKHioppL%2FI%2B0sqyGFXb%2FzFgEALDYmzPkFxpasT%2Fdr3a4gAzPFapdPDyO5ReOITEWcW7oxi5gOfRiWmlQygp8DpUZTNT%2BTzxGkaKsSdaCP3aWdSuKRMKVIrdGVz%2BLCM46NBmxUtFXQ8%2F3kcQlQKzeXoyqBL6L8tqqgXA20vQtbcQ0vsbyUzKp5i4nvoKDQ2C%2BOP8ueHukEGD5VfKNnu%2BkxXUKa9Kmlm7U%2BuZh8RCsJuiF%2Bhl%2Frvv2JfWBrXaYvBO%2FM3uYuDCBZrVlr%2FekzHVA1fnGqOjZPS2V8iuKZClXAhnRxEc2NfTFTYIre9Tftuw8Ptu9%2FjHFdaLNhBy4mDdgv9WCRg2kXzRV03gr%2FkgipCvHW9V6BCpRSSFJcemDQuPGbF94VAtnQmUnx4S5%2FXCD1HNJoKLKLiK4g9m2WVfUwNcPcKTIr0rbdY6dBQ%2Bmdkh9R3yoeh1ok8y2v3gE%2F8BF1O5LNkg940U%2BQnaiO9T9vUNNYquqMoMzGHPQ24CBG6nNPpMJ7w5MoGOqUBkGdwmrJsAKiqqR2f4AKNDM6aT1xMprM3%2BNz3YbJbadRSXpNqWq3HaW%2FrxVI3MhXh88VsL8xN2uRpJjqxpyhTzt%2BtFdWLBd1AHf23mmy6a5TJvGtDyjTGJrNXinaPNNoOqZPBGxUFbhmbkEBy0FhpgBFvz%2BPw6e9LvKhb5wCd2ato%2FcYQxOqDI%2FLRA7UmZU9UiQL7IOQRgeVaF4ohyRR3JTOuZg9a&X-Amz-Signature=00db7a7be2b62a2fc1148cba160179d43f7b1deed63ea3050011510b7bcbdd5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

