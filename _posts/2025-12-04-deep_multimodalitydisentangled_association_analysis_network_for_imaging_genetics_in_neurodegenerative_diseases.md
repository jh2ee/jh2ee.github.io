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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHGVE4MZ%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCIF62zjtFrZPV8s9HqZfhaAmEc7sVx5yAcUHyzzn%2F2qeLAiBM2%2BDjiirWvgervtKkxiUnI%2BT6HuGXYdPJ5dkra1krmyqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoVsHYopkwHAOoi7BKtwDSWN22C3QjoLqU2r8RSjnH4rNCWXJ0gDdfuPz4c75qcC9fY2tKuOqzMDU3oDDyt%2BnCI47eRfVbJsbt109TfXKer5KdaHyfdvBWix6PBXgyI4teXt%2BXJm6J%2B7JecBeE5dbwsPEw5%2B5YxNfLU%2BF3tj1JOAHz1T4DOSYEsdWUyL6fkOZ4%2FGsGq59n3douhv0web8P3hUsa1gGNEgYESBI1Bg%2Bmt1jbcyFZ2Q%2BmbxsrtjcCpsYyGlgVfQUrOtrTWfZzOVPNWl%2F3OdIyMbC3Poa0HtEJwvq4E2h6pCu1jN7Nx9G0CLjuoWAcWV5DW1Q33uvBziDK4ysHqf%2FbePKt3HH9WRR3bclwnzUB4VPUbuflmECqqBhIkoLJGdShREHVHh6AF6LtpdHEeHnuT97lFE1xtl4lb7sIDYqWWUYX6qmHW%2Bnte9XNiEKK4AeSh%2BMHjBsho8hQMI9T0pa6%2Bi1TpGlL2sf97BVl%2Bmi%2BJzQkZ7OA1B8s6l7ZONfL3FoNquowDHhCaA5jphBS6JD2AC3CslOU2QzvFFW5uHGX%2FJmgyEimVgn%2B0SZ6pZIks3su7a02ZJe%2BPHdnWwfEVO73bhCiTkBzt2kqTdRWi8Cjm2T%2BCnrk2TZwDdTCHtow2R6IDm5AEwjvXezQY6pgEDSPq9%2FylWaFFzXOnMcHdJeGFH%2B%2BVxC2zpRSFgWvzHaH8TG%2Fe2AviPdIGrpDYW310YMHhXcjD98j4l9%2FXFZhtWx2PdcEjHvlPDl%2FdW43oKaf4F8afyJ%2BysB2ce%2BkHNMQrEP0WRSvkn0g2ygB8OfqglpYvw4uXU3HFG%2Fduzgg0%2FaVUkzFYRMilFpmWHuFTkxlM9SO0IybRTDOYRWJFsWgLxGo8IgNyW&X-Amz-Signature=d4bb2810e985bd1e581f7d309fe2d7b5340409cbea2f1915c95c9e367b804761&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHGVE4MZ%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCIF62zjtFrZPV8s9HqZfhaAmEc7sVx5yAcUHyzzn%2F2qeLAiBM2%2BDjiirWvgervtKkxiUnI%2BT6HuGXYdPJ5dkra1krmyqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoVsHYopkwHAOoi7BKtwDSWN22C3QjoLqU2r8RSjnH4rNCWXJ0gDdfuPz4c75qcC9fY2tKuOqzMDU3oDDyt%2BnCI47eRfVbJsbt109TfXKer5KdaHyfdvBWix6PBXgyI4teXt%2BXJm6J%2B7JecBeE5dbwsPEw5%2B5YxNfLU%2BF3tj1JOAHz1T4DOSYEsdWUyL6fkOZ4%2FGsGq59n3douhv0web8P3hUsa1gGNEgYESBI1Bg%2Bmt1jbcyFZ2Q%2BmbxsrtjcCpsYyGlgVfQUrOtrTWfZzOVPNWl%2F3OdIyMbC3Poa0HtEJwvq4E2h6pCu1jN7Nx9G0CLjuoWAcWV5DW1Q33uvBziDK4ysHqf%2FbePKt3HH9WRR3bclwnzUB4VPUbuflmECqqBhIkoLJGdShREHVHh6AF6LtpdHEeHnuT97lFE1xtl4lb7sIDYqWWUYX6qmHW%2Bnte9XNiEKK4AeSh%2BMHjBsho8hQMI9T0pa6%2Bi1TpGlL2sf97BVl%2Bmi%2BJzQkZ7OA1B8s6l7ZONfL3FoNquowDHhCaA5jphBS6JD2AC3CslOU2QzvFFW5uHGX%2FJmgyEimVgn%2B0SZ6pZIks3su7a02ZJe%2BPHdnWwfEVO73bhCiTkBzt2kqTdRWi8Cjm2T%2BCnrk2TZwDdTCHtow2R6IDm5AEwjvXezQY6pgEDSPq9%2FylWaFFzXOnMcHdJeGFH%2B%2BVxC2zpRSFgWvzHaH8TG%2Fe2AviPdIGrpDYW310YMHhXcjD98j4l9%2FXFZhtWx2PdcEjHvlPDl%2FdW43oKaf4F8afyJ%2BysB2ce%2BkHNMQrEP0WRSvkn0g2ygB8OfqglpYvw4uXU3HFG%2Fduzgg0%2FaVUkzFYRMilFpmWHuFTkxlM9SO0IybRTDOYRWJFsWgLxGo8IgNyW&X-Amz-Signature=d4bb2810e985bd1e581f7d309fe2d7b5340409cbea2f1915c95c9e367b804761&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCUG5PA5%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAoaCXVzLXdlc3QtMiJGMEQCIElTZVAnXz%2BEODkSdHZRPf%2FlZ0Rdwv5i70x9a8ZaAvMwAiBxS82nATKDj6%2FFxEp9yThTNxEbrypL7IZNE4WuwJngPyqIBAjT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbDblR5jCWecc8aghKtwDn%2BTyZz4xEGgapp4zZfs8wXEz6qw2MbZL4PC9m6Lcak8Lcf3exQLpQnvcHRsFqelhGVhRFP9Noq4ym1rReVfSkUzb7wb4HQ8X%2BglwyFJVaDYoA1GPk9ccdOSww49iNLUx1A4D%2F%2BmoaEd3IwJv6jGUhSUVFfaHcup6Rt2lu7d8aZYSUKNZRz%2FK6an85YiaITuHJIngoa3TMb3XGEkGYdk6DPEUCOIb8akqds%2BpWykOBwjVu90pFNwebSCibBg5u91Og9LRJ8ZnNFc5R5TpghrtkZAotw9h1IqblJdk3s7U%2FN6BfD5omSLOQZb0THTzynALEkWxGUFrfwq61U1JT5keAhn8TAfHtAXsBHUSWpm2B8m5JZoR91WeJnss9uAGqp%2By5ISOSl7P4J5uoDd8%2BfnkdXyeZcV7ro6%2Bs%2F6rD7UFx%2BkJMkFYVZJSDie8zOvQZQF4ShCZzxPfjsv%2BCH8xXji2jollF1mi9dIZpMRmRaV4fEhyk1o8WOscHX%2F9YA0q9IPvpX3dKMJ6kKl4Xd2A9xgjEk5fJ7TxnX80ROJeBk9gg4ZNVrnZJ30ZjGUYG%2B3E67%2FyW%2Frixel26Xn8bItvsfJKkPXxjQpXBN3uKcOHmwgmWat78RDM6faflwfKDYUwsqTfzQY6pgG3fuWRBK8DlLNW%2Bbr01nMU3h63KrK%2BjJ%2F4ls8WB4i8Cy8IAgp12%2BXestgSVlw1na%2FtbTV3DRf4gAHhDAR%2F1DPzEMdP36uf6v3JZXl2t2G0COSiL%2FTKuod5joos%2B7LZIHkjhedqEpBdbeVlb2dhqJQW%2FWzPtUdAVvXQLTK0usvuDws21wQYCdknOx7747ng5YGcpFMCbMAbAmDZ6dEmY1VNWGCr3kxu&X-Amz-Signature=ba8824e136a55af1c3b99a3167ba43391ab08747f40cac4bf09ad8e4eda544d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SGAVLE6%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJIMEYCIQCC9POt%2FPOPK1KeX4OBqEFusFtGfpTdBe5M%2FkDDCUN3VAIhAIzW%2BAejZCfpPblLHe%2FdSSQGPN30aeGwWtX02aTyr1g7KogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyQLhoHyvXyDgPcWVsq3APvRVnsE0fi49QuLDiDj8G2OBM4CKcen06pZRiVcGnqaZY5nC3zKCKmWsFayqCYgZ3D3jwM9LvOXKrkLNhpQxV7l44GZyH4BMYZF9ABCrSNoqCl8wb6AQ0%2BXJ5vsYI9l9baZz2otouHo8teD8dsosfORIhwBcl6uVBcPT2MLo%2F6qUbKbrmUEHa09zhaKMw4voOV7oeQPAvenxEoHQ3TzBdmtTJarbUzw%2BaxJYor%2BDZsqf4tnC3zc%2BgHv94zOI%2Fbez1OR12lw%2Byrr42%2FLs2rfNMc3kQVxT4imsoYKGceO2v%2BV2To4FUykze8xd7P%2FCxGtyc7%2BCYiWTYfby8IF%2BcXMGTCqC0oeiAIBL0NQWZ%2Bc6ks5HGLclTWnqELf4Klt0rqFaY%2BEhH7hUR5dkCiuxmdrp8Rgzku%2BFpmzc8qhYJ9E%2BQzPifIcDwmiscRGElfmS%2B6iLORqnh5FWsqSTe%2Fa%2BN90cqy4Zue0sHDo%2F2%2BjHYcXAdR6X8zxtuKCfhQ%2FLVUgg5ye%2FA8NBZ48zzXZCX22r%2Bgb%2BTlrX3%2BwNLf3aTwqRAFny9JQVpAld2alsjLIcnpZnLvAS3KWwKghp1%2BjQ2ZNSWBMl3t%2BxaIe1Ulo7twtwWRJyDAHBa3XYjXSsFtZ44KNTD3897NBjqkAfGnz0P28luTOBPFYF%2FYM5nHI%2F%2B8y4xFyJvMdWZDm%2Bt%2F4t8U4sfucTVQ5t9J20u1I1IAlqYsDZMOEs%2BElc4EmjKP1Zrf1KK2SI0nFlEGBiv91Qd79C7%2BkZVVz78UcdtoBDUY3dmvZFeUBZNmNkdeGSyUA3rEeSf2ybosT%2BL5W8R%2B1q1nO%2FrvVs%2FGikHyVAGqOPDKUZKxeCsHvzH70PmOp14NkR1N&X-Amz-Signature=850f2275ddd060e9f0bb29aa630272d1464203aae6bcb563fc5b086731d75cfe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SGAVLE6%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJIMEYCIQCC9POt%2FPOPK1KeX4OBqEFusFtGfpTdBe5M%2FkDDCUN3VAIhAIzW%2BAejZCfpPblLHe%2FdSSQGPN30aeGwWtX02aTyr1g7KogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyQLhoHyvXyDgPcWVsq3APvRVnsE0fi49QuLDiDj8G2OBM4CKcen06pZRiVcGnqaZY5nC3zKCKmWsFayqCYgZ3D3jwM9LvOXKrkLNhpQxV7l44GZyH4BMYZF9ABCrSNoqCl8wb6AQ0%2BXJ5vsYI9l9baZz2otouHo8teD8dsosfORIhwBcl6uVBcPT2MLo%2F6qUbKbrmUEHa09zhaKMw4voOV7oeQPAvenxEoHQ3TzBdmtTJarbUzw%2BaxJYor%2BDZsqf4tnC3zc%2BgHv94zOI%2Fbez1OR12lw%2Byrr42%2FLs2rfNMc3kQVxT4imsoYKGceO2v%2BV2To4FUykze8xd7P%2FCxGtyc7%2BCYiWTYfby8IF%2BcXMGTCqC0oeiAIBL0NQWZ%2Bc6ks5HGLclTWnqELf4Klt0rqFaY%2BEhH7hUR5dkCiuxmdrp8Rgzku%2BFpmzc8qhYJ9E%2BQzPifIcDwmiscRGElfmS%2B6iLORqnh5FWsqSTe%2Fa%2BN90cqy4Zue0sHDo%2F2%2BjHYcXAdR6X8zxtuKCfhQ%2FLVUgg5ye%2FA8NBZ48zzXZCX22r%2Bgb%2BTlrX3%2BwNLf3aTwqRAFny9JQVpAld2alsjLIcnpZnLvAS3KWwKghp1%2BjQ2ZNSWBMl3t%2BxaIe1Ulo7twtwWRJyDAHBa3XYjXSsFtZ44KNTD3897NBjqkAfGnz0P28luTOBPFYF%2FYM5nHI%2F%2B8y4xFyJvMdWZDm%2Bt%2F4t8U4sfucTVQ5t9J20u1I1IAlqYsDZMOEs%2BElc4EmjKP1Zrf1KK2SI0nFlEGBiv91Qd79C7%2BkZVVz78UcdtoBDUY3dmvZFeUBZNmNkdeGSyUA3rEeSf2ybosT%2BL5W8R%2B1q1nO%2FrvVs%2FGikHyVAGqOPDKUZKxeCsHvzH70PmOp14NkR1N&X-Amz-Signature=34581ca212176d6fcb20bc0e4247992f5a304368a55bd6ef3d5e0218597f9873&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJGYRW4V%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCIDaYUMjXcc013m7RjcuhXUHzQnyXy8V9qEhZCF%2BDLjfWAiA%2B%2FrzfuBm%2BGE91RHxD0M%2Betapa3atR9FxuQKQSvZrYMyqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkZrbtJ0OeW9D8%2BxXKtwD045aiEB24CWBN5stUfnil%2FbO%2FqjTKt1rKtF2bBLu%2BybRWc8OhXttcJ%2F0AKigXlUsPc5HpSM%2FVovRvnhnMHr6PIDx7UUglT3%2FVALMPd%2B0vUhe26d%2BEnDw8iXdIYw%2BGR690uVGmryF64BB96rvrYUngtFEOnL6WasP%2BBh996v8Mh%2B6mbbgXiMdkUurtd7D%2Fpt%2F03S%2BN4c9LsxRhMQtaPMtIA8nu6szv6I8NcQdNZ6OZ53o6%2FjKcsDGdyQ9hJFTXiKajO7BtDixh6W00DRZPERtWMlLjl%2FS23MA9PW9EZ0s60HtQE9B%2FBEChNlDfIFifzjRN4AVoo3FD98P%2BIzKI180Bw5%2BprjnelrjKnwHulgPUoh4vF6LJ%2BHNNNkkI0g%2Fq96%2Fx1%2FAVkXyzn7qNEVLARuuG2M%2F9eqTrapUJW6ip433RQtGeFZY%2FUN6VxClj4%2B95Pja6j2JLzn%2B1rozG%2FSFFfRcC4L5CHYrB38Yw37tjflm3pHVKi%2FG5Y1%2BBpMy638t%2F%2FyFCi0jAPFlSlgya7kBbbs2296aE5NxSsJMBdfgiDBcJosfBh8YKOZTC9gs5QszsgmLcsvlRt%2FB4e9z7vGgxHQ%2FaB3jMKoX8rKD8F4M23OFTfSfT4U8znWxVOBaYnIwy%2FbezQY6pgEDwzdvjPe%2FsLJ129vOmspz4cOqvRaR4LCfVcEr1B42mNH4fN7K%2FP%2FHUYZaPizt2w%2FpnE4RfYqYphvOO5ihSjeIAQ%2FR97y9ZcJ%2FokEA9rt%2BEWOrKSOkte7uLlHEZM2ICQOIoQ4xyrjqqgf81BqUH91Iv%2BrtviJNu7q%2FLM%2FVpFydxm%2FbwW2GC%2BV7p6og9SUdVHVenBhdXyZmmOvWgDtCgbYiTbCciHi7&X-Amz-Signature=15e4a4131b0ea7fae1ff2740264ef0bb906f05226a688824e5118ad5a137b441&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QF4NBJY%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIAor7EBrOaYBHos1uBfOQoM0KWzYmHB89AB5MYftPNiTAiEA9eDZ%2FAGW01gjC5zzIPdKa0wkihvoSPJdll3icHki%2BJYqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC9B20fIcTbyqEDxkyrcA5KiA5DRSs2sHgtjASQ%2BgC59M6A5rTK7jYI%2BIXdnncIkCHWzfJtwIc0nJQByvDvcF8uUPIQHk9urwXaKeBKe9SOoxsL%2BXSuAENh2CMZZMnvWka%2F%2FlAb7ggnN4uyxcQzxXSHJUbrJBRPiHkxJ%2FlSIEypktd%2BKTqW6dM300bk1bebj7wzHNOZYVu4WLdJHrugfLVAhK4Rsz67%2BJ4CIsYgmKPSlJ%2FSHjJLwO6D8Jw4jbS6gZLsHqoqxO0YYi5PSluDqk9Cm3EEqF1wig4juAyKLvErtwhdM2l5PIJD5VWxeOa5VabqzrSIDlQch1BfMBDpt7aVHcQ576s0IELA%2B%2FRHqyPYR2wPtWAgvB7zH1DE5%2FNmKLAdB9Rg5zKmm7nlKEeTIyCXr0wyGC1NpYzadPpCTHIuTjvlmOERPef8upHcMnl3XIurkVC58usEhbwvHZ3C0PYOOmtFnaDjUHO%2FDu7AI8VkAMaMc8Fkoq%2Bq3VFcocTTwvlY1cVMWY%2FQDU4zpCWatQIl7VrI1tMpTrlyHDlo%2BhW3hzGG%2FxrwmhLmgr7UM4kUUeu2p%2F8UErc87%2FmwMueTBwnlHNOYJslJNOUXv24gEFW5G2FcV9%2FwDvuKedCIqswQDqfcXI7byk8DhD2weMNf03s0GOqUByPJPnYv3Ki%2FEtGAV8sopHfofsbRhNRNJVX7KXiujZt8%2FreineB2ylI%2BTKhkPwzLrQGUgjzVNhVDZwTiHP88jhH4k%2B0KLWJeEUC4e7OUXLMbXeXW%2F8xOB2AuKoi0q3nhIx21DJaj10hY8hELob7xFZ%2Bdmk04ANiCwoKRLX%2B9qnhD46A4GVo33Q4OyXbd1IkV9aNU36THUfCp3oePAD%2FJaECvCrRJy&X-Amz-Signature=68a3b276fe0a71f67e6b62c296b3546fa7faec036b2c63643d525008e94d64ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXNT74JE%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIF2zQL4xaAl3CdlK2mWB8GHg7NNZIOi2fTPACNSKjA8pAiEAshgtVmB2NaN7j112%2FWbb8mKDPetDcZa8FPZqKZDPOMoqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFLNivE%2BG6yPRDMtyyrcA06ZV8M0qSsBf5Dpq2ZlRBZlmexwpP8HZMZjsL2BfKK2M%2FjdYXtdPM1wZy7tbnof8XHBUe3j%2FC5gped%2BuCZe1V4xdZvfAXsOYOMyXAq390a6LSySPvTOv05r4TIR6Aoy9kScCij%2BHHFYFEhqYLp%2BEm%2BfQ4EY%2F1KhxEIwYOQT5SBDbI5GkIFctp9ZFCpl9wD2SP7jPQJMNj5UtgzwT33ngYsCgAYV%2Fn%2BuAY34dt0hRnhEKMXq8RPElzTStM6yYlsr3TYfTsflajxiBLv96AUzqUsaoM6Ld9cFnrIXXdzPAf7xmF2Befa533f5vVngsErQprF0VBukKZGTOv5bBMme1rBHmTtUGQ1B0CUdDUIvwySK7YOOpgsARPXAfi%2F77lWLLfoNPG8sNF%2BBZsmKpleNH%2BBFfh2Tw2HWYcYiXBdUv4JNleCl50DRD0EOP6Ke8KL1BjRt7wfUAMnCmafnPIIim7aK%2FeieTMgLTRQIF83SkWdgdE7rqRBwhVLBVITmDJaXM7noqF4krx5%2BWCZAIU646pR2rf1ePLIMEp9As6cY8AOQ%2BYWM024p0YM6oAyGSHfn4OHCps1aro4M0gL%2Fvgt8atWHZqfZw%2Bzl1FTMwGh6bbK%2B3WkAWuU1Zt5s8m73MNzz3s0GOqUBnxEnxwdQpNvM4saLXDQquOKfWPQRwcIeRgG6YEuisEN0uZi5qpDZTXkD2hTGwWzAtZTm0YxABnfUpV5mWgZrT4rXvw3bnHv20K%2FGFS957prX28toM%2Bb4XsaHnwgreniD9JhObqdklVq%2BOKUezE58ulyMro2vEOjk4ZT5JOluFslC66vF0HMrFPBiscx2bR1PvsC68sIU%2FlrYp3pFkDQSeOJEtv3m&X-Amz-Signature=6e13926a87c82227bc0d9a9e968ed297030f11ae9e614b53b3ebb4114aa042d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SYMGIQE%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIEmghtfG0TMfkkXbh4NBelF8iQM2MG6oT4ME8DKvwTuZAiEAyvCR0G76lxzxIwpySnGNDUOB5IPqMQBAnnG1uzYhc3MqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEqu2Uv5hAy%2FCLV2mCrcA4ZD5nQiaqKwcEhGUsH6ObncxYI3aAYNJFUXgDOgN2Sn6nziXAS1SnwuSMuX9N2lqqCHRV%2B8ke1HdX7e69IrcU7TDz%2FH7PO4SBczqB7BymA9XzpHiDA5eSs%2FpitrgEO060J0FXSDhp0MbXHBEDZaONu5l1B0enF7mN232%2BL1fhVcea2ZKlVX2oth9HGYfV9sXTcc6VewwqJ3vp%2BfzKD1Hfx2V1N%2Ffr31Y1EhhTEqjZezmNycndpdPw1PGAo1V47g%2BiQavJIZLe3HAMNG9d7DdjpORYAy4zrT0%2B0DKqnjmXPkRTTt1PgOQ2TKuC0pLvY%2F5OIhWXSSsrsx71%2B7IOUwKh4hfndXw257zJujSCYrQxufhtqlhpU1oYKg66hNTDncHXen2Se2rKmKWwKz9OP5l8Bw00G2Im9ke9uHJI96%2BmM8QFLgYwCyE%2Fa9Oca4ItzLwe1%2FC6MetS6zLQ8g%2FfOZBCkfGSh%2BoHYVHORA0ioMuFLSQ0cswZhWnKymGyoN1PHk9fLYe8EHzzPLa%2B3Jxar0P1UPCOnASNptfvSfom%2B2MSCc6RMf59CwfSUagLTaLLPJabbOFemaM3ncB2PyJHjd%2BXHuiEAuX%2FhZ5EKk2yhAgMoLA5m3GdeSG0oAHR2NMNr03s0GOqUB9navfVkQS8hWyzOqpHy4Os8AwGLjWxIq7F66IF1XWNVChAT%2B6%2FIZsWKQb773tHWezd%2FE5oBUUS%2FEgQ7GGXUOeHoCyY%2BQD4h2JCzmtEg%2BOKMUKuR%2BGjRG6XstAcgb9OSfnFUPb7rS0cI0%2FJiegw4aQ4A4KLbQHOcmm05GjX5J6zm5%2BN8j2EtAPI8sEEh4YOYOxhqc5Ch0pDSA%2FLJZEI4eq8wJ9ZCd&X-Amz-Signature=1873c77196ff1e6f49623a2d39c767e0224da0f4768df266ae18f0eaef324f1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SYMGIQE%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIEmghtfG0TMfkkXbh4NBelF8iQM2MG6oT4ME8DKvwTuZAiEAyvCR0G76lxzxIwpySnGNDUOB5IPqMQBAnnG1uzYhc3MqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEqu2Uv5hAy%2FCLV2mCrcA4ZD5nQiaqKwcEhGUsH6ObncxYI3aAYNJFUXgDOgN2Sn6nziXAS1SnwuSMuX9N2lqqCHRV%2B8ke1HdX7e69IrcU7TDz%2FH7PO4SBczqB7BymA9XzpHiDA5eSs%2FpitrgEO060J0FXSDhp0MbXHBEDZaONu5l1B0enF7mN232%2BL1fhVcea2ZKlVX2oth9HGYfV9sXTcc6VewwqJ3vp%2BfzKD1Hfx2V1N%2Ffr31Y1EhhTEqjZezmNycndpdPw1PGAo1V47g%2BiQavJIZLe3HAMNG9d7DdjpORYAy4zrT0%2B0DKqnjmXPkRTTt1PgOQ2TKuC0pLvY%2F5OIhWXSSsrsx71%2B7IOUwKh4hfndXw257zJujSCYrQxufhtqlhpU1oYKg66hNTDncHXen2Se2rKmKWwKz9OP5l8Bw00G2Im9ke9uHJI96%2BmM8QFLgYwCyE%2Fa9Oca4ItzLwe1%2FC6MetS6zLQ8g%2FfOZBCkfGSh%2BoHYVHORA0ioMuFLSQ0cswZhWnKymGyoN1PHk9fLYe8EHzzPLa%2B3Jxar0P1UPCOnASNptfvSfom%2B2MSCc6RMf59CwfSUagLTaLLPJabbOFemaM3ncB2PyJHjd%2BXHuiEAuX%2FhZ5EKk2yhAgMoLA5m3GdeSG0oAHR2NMNr03s0GOqUB9navfVkQS8hWyzOqpHy4Os8AwGLjWxIq7F66IF1XWNVChAT%2B6%2FIZsWKQb773tHWezd%2FE5oBUUS%2FEgQ7GGXUOeHoCyY%2BQD4h2JCzmtEg%2BOKMUKuR%2BGjRG6XstAcgb9OSfnFUPb7rS0cI0%2FJiegw4aQ4A4KLbQHOcmm05GjX5J6zm5%2BN8j2EtAPI8sEEh4YOYOxhqc5Ch0pDSA%2FLJZEI4eq8wJ9ZCd&X-Amz-Signature=0cabc97b42f58bcca61e20a59b96165fc4e7a1cfb55509f52a0e6c169ccc1948&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XJNU74D%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCIG%2BsmSro%2FZrLx6dZTAhKY2pqC23Dbph3IgxYmSdmJdX8AiBnewxSe54QhIr%2FvmoazrKvetYSahRvPLoPBMVr8epzPyqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMohtr6l4GveuALvUyKtwDs%2B4f%2BWzCqSYzPT%2Ba8r6lEn2D%2BVSteAAjJj%2FKHza%2BjpURtNgmYWZ4zCgMzoozFXaRaFr4tfMkGuMroP3DYYCSqEVXA4kfUqACsBwptSGPHDpJIzE%2Bz9is8wz5YoIP8k6bCu3p2y%2BTVB8hvl3TPGyUQDphavD1AsK%2FP%2B5iFfx4ib8YYl5jsCnTwOtOrPdBrM2d3XyfraS8kN2xO8dWsyFud127YMj0lrmud2b5x8AnoZbPd2DyipgHc5xloKcUonI5R6DBQ9F8TvWcKQ7qYgVTIBGmiMyoJOEkHMydKG6BmWdUc1e3xAvLEsLU5XQWu5bXXzEFQvE7sXaKyS7PZ%2F%2FfmRPr93xXzae4WmOvj7X4fXBlZmf7WOT%2F8ozsfxr3CkGxN2Fs3dCO6AnzNfsXBTbGO5hq3UgMVz2LWK%2B%2BCx3cmGRcJUxYuZzNzKq36UERHVBJU8kqY2fGS3oGObxFoePdnySj6oj5%2FhllJCMocez%2B2W%2F3rtTrf6T5VfbP48utgMqWpZcLWEEuzt14wPhOd%2Fg4qCgSalgPXm5bd%2FP0wdbii%2FnzYoDY7bq0p%2BH%2B4l%2BEaH%2FUQgi8MTunlEWb0rf7LYax0ThP%2F60WJuBoIHoLut4I9aSPZQ5sGdVDO8xKh0swo%2FTezQY6pgEIfkvLuFPkFuAS5JqE%2BEMxmjXSUIX%2FgHB8bA6HEaoiIIOMrPv7nud4KnhxfbQjLgZvKJCTffdzTku2GyONKAgWPJOXYXu0yc6ylH1VKycwfMV1up%2B2vbbezAZe5QThYMWyfDeeZ0AmPVIA%2F%2FimJY3g6HxQLzZx4hkwH7FMSI9ibBxxu6c%2FUH8%2B5%2FSbtmgN5za9EmeZ3iQIbsmG7B6thi3rD%2BoX%2FUrW&X-Amz-Signature=89b4a18220b539d1cad6a20091845437fadf57292b536f99464792a068319d04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657GHDGP6%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQCUGbPxKomFzyaTYt%2Boo8oFFDROC%2B7gEcMfjAcFTR5A%2FwIgSRFshZ8qSSHgVZVZkXpkx7SH73iHa1kVfSUetTiifqsqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHMgdpb8%2FfQ8gKKf0CrcAyoIBAbi5wJXEqr9QF3RzTXN0ovGPue%2FvGb2QpdjAjv7foVkH8xDzI2mSZvtNSIgsRBR%2BHUY9%2BlCZmeKKaC4S%2FnX0q41B3gR3v30x1mjZJIyfWsbREKWVuzAm5Zjdr3kvh0%2BHGz7aVGPSh%2F9aH5A2ygHJehQ2bDs%2BE%2BIatzYM3WblL1lWmzVbziCsnGiIzXEVNywRoT1a639vjihhihhPgKpbauE7CCIei8F1sPQ5CfZViXLmt%2FhHnJao%2BgSe8drb8AgD1QXm5a89zSdCAasF2JUza13TQRbIYfXT34bhB%2BytbXviyMeRbEsj%2F3zQdCtUUydl56d1AE%2Fe3gGgl8nQK%2FZmQLBYmCwW%2BaYx%2BlE6vupfUtTexZdTS8uh1ePX83NmVroq9pZbvdhjrz8tkaNItFKq9d2XOYuUXP2sWo86j%2FvPSCgTPMJSNDvempDteD5fD24Lxz0aU8e1%2BlJH2wSJKrDpPSRP6ah0oecYqhWMcMnUXQOJDc05b2sx1J318jAqT0vrLugW5Vzo9w4QnbhZALR2slZbR9rlyEoyRtK%2FA0mXDNrh%2FBCvA%2BogdX%2BqxEM2kBbjSSjGyxAiqlxMudJjTRDsLWu0GUApU0zlkdBIaPWqpsScoRBd0nW%2Ff56MNT03s0GOqUBWzPY%2FMLevvGTiVy%2FkVQWWK%2FLa9oMk%2BI02Jmh1hWMYLL2Ab5mKbUh5ysaFwbKO1nBnZMe9fcFEtLJfuE4GMHC9yoKr3V8lkWZcNpY6Zubd5M8VC5W23YzZuwfJK6JwKfyTFWruQTuKMjzCMQmxHZWPI7CS2II5gUAPrLiN%2Fogsu9pnOxxPk64XiR%2FYEeGwPMmD21kMCYRPqpnUhQCLR4S7%2B9oQaEP&X-Amz-Signature=ee5cc74f7ba2b7c03e315190c4c9442281bbef679fb378aafcb9f44808bf4f24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657GHDGP6%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQCUGbPxKomFzyaTYt%2Boo8oFFDROC%2B7gEcMfjAcFTR5A%2FwIgSRFshZ8qSSHgVZVZkXpkx7SH73iHa1kVfSUetTiifqsqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHMgdpb8%2FfQ8gKKf0CrcAyoIBAbi5wJXEqr9QF3RzTXN0ovGPue%2FvGb2QpdjAjv7foVkH8xDzI2mSZvtNSIgsRBR%2BHUY9%2BlCZmeKKaC4S%2FnX0q41B3gR3v30x1mjZJIyfWsbREKWVuzAm5Zjdr3kvh0%2BHGz7aVGPSh%2F9aH5A2ygHJehQ2bDs%2BE%2BIatzYM3WblL1lWmzVbziCsnGiIzXEVNywRoT1a639vjihhihhPgKpbauE7CCIei8F1sPQ5CfZViXLmt%2FhHnJao%2BgSe8drb8AgD1QXm5a89zSdCAasF2JUza13TQRbIYfXT34bhB%2BytbXviyMeRbEsj%2F3zQdCtUUydl56d1AE%2Fe3gGgl8nQK%2FZmQLBYmCwW%2BaYx%2BlE6vupfUtTexZdTS8uh1ePX83NmVroq9pZbvdhjrz8tkaNItFKq9d2XOYuUXP2sWo86j%2FvPSCgTPMJSNDvempDteD5fD24Lxz0aU8e1%2BlJH2wSJKrDpPSRP6ah0oecYqhWMcMnUXQOJDc05b2sx1J318jAqT0vrLugW5Vzo9w4QnbhZALR2slZbR9rlyEoyRtK%2FA0mXDNrh%2FBCvA%2BogdX%2BqxEM2kBbjSSjGyxAiqlxMudJjTRDsLWu0GUApU0zlkdBIaPWqpsScoRBd0nW%2Ff56MNT03s0GOqUBWzPY%2FMLevvGTiVy%2FkVQWWK%2FLa9oMk%2BI02Jmh1hWMYLL2Ab5mKbUh5ysaFwbKO1nBnZMe9fcFEtLJfuE4GMHC9yoKr3V8lkWZcNpY6Zubd5M8VC5W23YzZuwfJK6JwKfyTFWruQTuKMjzCMQmxHZWPI7CS2II5gUAPrLiN%2Fogsu9pnOxxPk64XiR%2FYEeGwPMmD21kMCYRPqpnUhQCLR4S7%2B9oQaEP&X-Amz-Signature=ee5cc74f7ba2b7c03e315190c4c9442281bbef679fb378aafcb9f44808bf4f24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W27ZTAOT%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T095105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCIGVjK1BYpr4IrSz0MbC%2B%2FyU82IRzHcRllU0LBTp3rLUJAiAN9ywXsHusLq7omwdsHXMh%2Bt3P6WcsF0El4%2FRTwJ%2FvXSqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMghAIhU46KMcA0PWXKtwDPGGSVE4%2Fv5cpE35Jqq8EcRzzDC6520%2BECSKNAaXNTMtTALSL3i1Tov66gEvWadKyAjZjK25xDuLydfrATrR9NuiFoBPifUsluNVvkvnPRT7sfynTB6LYpPMV6%2BdhmZUVJnjVxe2650KO6Zvu1ql5pyBSO6J9rGuBcUjuFVExWfSlNU%2FRzgyV9di4oGeAiUckASFIHZPoz9ZyzqZe1x8BKwRuL0McnyQU3V3ATGYIzmdhRtAnSlJxufInVMKzdevgD16LRvmnfoMdSWQtj6tldCjYnkqR320DEZZ4dMq1P4QwjLcbl%2FqiJa1RXTjzO4rhLCCFcgl9UIoPnhGw2vtA2WsbQUhhZ3Y5GLt%2BMxhsOEzEOfbb7rH832yx0qkZMJvK6iOEWAm%2BhHti0XeSMzw8u8FTW6KgaJkc0hnHrUr2V2YmLh3aVaOuqJVBVrtbHrYNag%2FRoa6g8YbEfYERJMMiHcEA%2F0lT3uvcBMm%2By1EiKslaidjWsP3fSdcEWoi2YlC5qqrAdkO%2FxbKj7b34ir3GFskffxHg0gNzY5h02NRoy8%2FrkduCBGpUlQra%2BBdvqaa2Juwc60EI9XAHbL1SO44mAc8rcNPWIy7HnUDAIUG3DvuVDwrrLSaZeGz64eYwxvXezQY6pgFG4Nji3rkx8BfXB4XTGApImnqneKS3ZfDnzZ4%2F9m9B2t7dccSU67%2FQK57wYwwshkbXm4JmzfgNAJOALFz4qqw6KWtlY%2F0wV6YW%2BmKBtXsxOMYAxg2RI0wGocbL%2FosqPNE2keMwdek6tv3GVzY%2B0HypyKyB46CCXry3PGjrtc%2FDHcn4RndqWXG2v%2Fzx5z58IW%2BP17AJzkU7CYjmaGMKIZuc4mkjiVfY&X-Amz-Signature=552f38e1c8589529b4d0d81b85c65beda3d1a8e3a48b68819dde9598696ca195&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

