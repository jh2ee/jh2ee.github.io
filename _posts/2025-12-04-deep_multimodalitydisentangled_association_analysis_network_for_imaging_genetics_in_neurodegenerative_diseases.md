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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRM4MOKP%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICJQzyeiWQuGnQTpJUx5uSAjQtWxBMqfsHk5Tj6Dsmx0AiEA4zyr0kNX7ktHD1VthaOwbPJfd4%2Fe1FrU1hv5r5QVu8EqiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAKNr59FyUXx8nq5rircA3fHgZ7ZVeQyoCpwmpWAXgqsrmCQJgYHml4lFWNg6zwX59ZBvKErjj6%2Fkwc%2BL0IXknrjkwvjG2fmZRrT29krXZUoroVpfSzTtMRO0VMPXCi1%2BisQue%2F1U43XvRLDaCrW6e3titZUetzSWorXXkA0X08oldEV9ghtPWz%2Fp6am8Qv5NPjcwgEokb%2FeO1sf58Vgh73TRDzAX%2BcXv%2B4%2F3xHHxBbkq2JnQ316FWJkhu5QkvgemPktHjpiFEpdKE2cXEJ0FVK9vr9aBQWglwDCLB1fCeKux%2BgcguAwvuMve0Dlp6IpzntH%2FnYZjyn79YPwGW7k4ZkrxHbRMnW2LVUxQJnOJ4yg0o4f%2BB3cJcqIl5lMo%2FVrr5enJqkZAJj5n47z7wJuRii1QvfMLtchxgrd%2FTML4TIe8GNzKdraIEiHbjOxHkTrCLncJcEvvqRmDPxL%2FEkDkgCqKL2q3Wky53%2Ft7QOoEHuPbMHVMXSPRVz%2FN2fjNJ9rjpZR25GhPlExINtfAX2%2BvT1bivhvUXPGL%2Ff75Fh9zkJdG%2FgSv1zzSaNiqJcBWpoPHJQ%2FtBWc%2Fi%2BsRuPMx4a24eKz4XWgKItRW%2BuVpG%2Bj5kozoNkE6q1G4iWwRIdZ2JvG9WB4egCKTbikHTj4MKac0c0GOqUB3Stc0rDBX8pZIsGk1a150D6nkW%2Bvo5RbSsaSA7oPuVhangvc5QxkZmw0wwMX5%2BUrbWisM2fp3D7lQCMtvs7KUUC6PM7RbyWRh8Ib%2BS9wh414PeRpzkfeNbRhdAi6a%2FvQls5vryXrbozwvkhnPGMUCT%2BAjJQfXcTIGEL30c29QP6F%2BoRvppFP5CEu4xDlwcH2wCTho%2B9bXCip7tlegbMVPEe7VSX7&X-Amz-Signature=6a2a5cd8e856a61706d8fcd99de9a197d73d8f7b2d2cc0035d6e4dc4573243d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRM4MOKP%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICJQzyeiWQuGnQTpJUx5uSAjQtWxBMqfsHk5Tj6Dsmx0AiEA4zyr0kNX7ktHD1VthaOwbPJfd4%2Fe1FrU1hv5r5QVu8EqiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAKNr59FyUXx8nq5rircA3fHgZ7ZVeQyoCpwmpWAXgqsrmCQJgYHml4lFWNg6zwX59ZBvKErjj6%2Fkwc%2BL0IXknrjkwvjG2fmZRrT29krXZUoroVpfSzTtMRO0VMPXCi1%2BisQue%2F1U43XvRLDaCrW6e3titZUetzSWorXXkA0X08oldEV9ghtPWz%2Fp6am8Qv5NPjcwgEokb%2FeO1sf58Vgh73TRDzAX%2BcXv%2B4%2F3xHHxBbkq2JnQ316FWJkhu5QkvgemPktHjpiFEpdKE2cXEJ0FVK9vr9aBQWglwDCLB1fCeKux%2BgcguAwvuMve0Dlp6IpzntH%2FnYZjyn79YPwGW7k4ZkrxHbRMnW2LVUxQJnOJ4yg0o4f%2BB3cJcqIl5lMo%2FVrr5enJqkZAJj5n47z7wJuRii1QvfMLtchxgrd%2FTML4TIe8GNzKdraIEiHbjOxHkTrCLncJcEvvqRmDPxL%2FEkDkgCqKL2q3Wky53%2Ft7QOoEHuPbMHVMXSPRVz%2FN2fjNJ9rjpZR25GhPlExINtfAX2%2BvT1bivhvUXPGL%2Ff75Fh9zkJdG%2FgSv1zzSaNiqJcBWpoPHJQ%2FtBWc%2Fi%2BsRuPMx4a24eKz4XWgKItRW%2BuVpG%2Bj5kozoNkE6q1G4iWwRIdZ2JvG9WB4egCKTbikHTj4MKac0c0GOqUB3Stc0rDBX8pZIsGk1a150D6nkW%2Bvo5RbSsaSA7oPuVhangvc5QxkZmw0wwMX5%2BUrbWisM2fp3D7lQCMtvs7KUUC6PM7RbyWRh8Ib%2BS9wh414PeRpzkfeNbRhdAi6a%2FvQls5vryXrbozwvkhnPGMUCT%2BAjJQfXcTIGEL30c29QP6F%2BoRvppFP5CEu4xDlwcH2wCTho%2B9bXCip7tlegbMVPEe7VSX7&X-Amz-Signature=6a2a5cd8e856a61706d8fcd99de9a197d73d8f7b2d2cc0035d6e4dc4573243d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIWYIDW7%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICbqeStFQH%2BvztZXSqQLRMBlJbfGHh1NBiuEratvR8iDAiEAi87QlxrUb0dtKrzHH7EK9J5HlSulgMvFKWUWOmbXDW0qiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDnBucMUOft6cUkd7ircA0ctvTOL9nYDIwlBUUNeqg16F9J9MbKpmEQ9Y23288wZIgzpqQdKyOTbNmAjmqqWVgDuNw7iQimuPBQBLZYv7iafXvN7iOUkXxeagJ2dYQTd%2FHfV848LWi5Zl8o4qhODxnNy%2FmCgcRTRzxpBq9ik6AqVXmiB0N%2FO5pVGBsuHOfhpf8DtxuvJwpZuPgkwSvSrTMhxf%2Bb03SeLOndcP8eRHV4GdiOL455guirOCPoy8gnTYuj%2F5OLLBHvJ%2F8WFEFBaSW%2FCzZD%2FhNRpQ2szsKgaLzkx4pwKwxJmk0Pds9qUloWXoReDs3a1zZaHH8DuUpOVVIAVJXFgJuiXQj3FW6W74VcUeV2UDvY%2F5zzhyQ2kxLvOMI95OWzge9wpbni7BM4gpI1pBmvTRY6Be6ugvOYl8DEId9%2BtJcZUoi2Fvj%2Fx%2BbpD3FtC9nMppvhg8x0c%2BbjzjH6hTPaYzvqgyRFAMnQqAZJ15BbjpRGqeNvCDtQy2INZEUZGaTUvNiRffyZJqUMGR%2Bytgl2TQaqI0cxFk42XZptrryc4Jc4roY8ahdPHjfI%2FRQgEF4zlDQRRmEfZBhmnYbSpYcL09mVvbLnq65BNyRdAv4nKseHZQ%2BgFTv6o2AmNQ8fX%2FMUKiSFPN3%2FVMLe%2F0c0GOqUBDV%2FsrtOgSeO0wXWUxKO326iXSw17muh8E6RtGhA7Cdufw8SWI1bwgzbXNFv%2B3vCgN1G6w3QBoc3zBuCX3ozXLCntY0wN30Ns80hXHm%2FlFRx0F%2FieFJ6q5AVIRB7C1cuEMORQx%2FDUjEUk5Hg2V2IwNh9fnK5JIXSbr7SUIfmVJtnG19tl2Carau1AReqSFtVp%2F8B7tF1iQqZ%2FIaxYHwi8rZsXjwTt&X-Amz-Signature=d706c41c026b3148617983a39fae7b6e81b10ec609dc02191dc2b2af48f195b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U77EIJQU%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEdga61GjtCSjPqyHFCiiYeJtGnvK9ftYJQtYN9FTBR9AiB2oXFsSxEQDaLXeNyoJ2RZrMTGKnxnEozj3vF3isW%2FEyqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJLb6szsm%2F2oCoOULKtwD4wI9eGtPDIqKPo%2BqOSTk2gR%2FSWgrgxj%2FIkOD1%2B6GPttcfCWxxxC1TBHpLpvma8xBB6QmXlMUNeapRw0JEYK%2FuPsADj%2BHxe1w6hlC34jANBYF4P%2Bq%2Fh%2FszenFAkm35MbqCSAqJHCkDfggrYnX2pQASEoif%2FM%2FBrobQtCSuwIlJIlBVgVH%2Fu3q51zML%2B%2BLSeObAV9ckYDAFcaq55ZWce5zJuA%2BbeEqpMEMIL91%2BvQtvn1Dvdv4ONaRTswi4G1Etx%2Bfhus71EOtjfLQxg9YHCHkGQF%2FjUia1%2ButuvpJl8CEsCbvnYEY%2FBqJpTUhmJFPQOoUO7Mi4oMkYvIYAEsw4yGpsEa08JpZ6eY7MSPxQrnnyK0LLJXUj0ZL5u0DF2UFznq8aT6xlDqphqX3sBgcBFWVZpqW%2BPbIfFSAG3%2F1Mtd%2F4K8OnlPdn8YtgQohqFMo4k8YYNRmwjt2K99rrPVb2mgMunn%2BwR%2FCT8rcw8J1%2F17zI45Rwaqq1xJNRUJfPIwsAd0cIbTKPWeZMFGEnoJv27xgyU1sK%2BNcnGztZ%2FYncozdkkf1oT6kXjknvmp3w77J7Lnq1t0WSE%2FE1Z2nH9Uas5%2FA%2BGVsYrbTD0NKhaWjJAxWvRVBe4fCvoLEo3DVwqgwzZ3RzQY6pgEwgXegbdD5AFjsOSQ8%2B6XBmxdJsMQzwMAWk%2FyG5Bs5Mg%2FFlFUq9YaJHifdXyu4fRHMIFm6gTScDYUgXPwFo4RYlI%2Fqscgsb%2BZSLSEy5uJA3KVxqphqJ2pS8v77M3dU4ddgvM23%2F09aD4TRvJFG2qbGMIucceqvMtDRXZZ4eKz4%2BnIwJur%2BCXKT14bzm9eR3yDajwOSLMc7vxJyUZCIrI%2BPc0GZ1YHI&X-Amz-Signature=e1f4630c26be46013e4db456210e8dbb9d29489c98ab2de51062882d4d5c968c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U77EIJQU%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEdga61GjtCSjPqyHFCiiYeJtGnvK9ftYJQtYN9FTBR9AiB2oXFsSxEQDaLXeNyoJ2RZrMTGKnxnEozj3vF3isW%2FEyqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJLb6szsm%2F2oCoOULKtwD4wI9eGtPDIqKPo%2BqOSTk2gR%2FSWgrgxj%2FIkOD1%2B6GPttcfCWxxxC1TBHpLpvma8xBB6QmXlMUNeapRw0JEYK%2FuPsADj%2BHxe1w6hlC34jANBYF4P%2Bq%2Fh%2FszenFAkm35MbqCSAqJHCkDfggrYnX2pQASEoif%2FM%2FBrobQtCSuwIlJIlBVgVH%2Fu3q51zML%2B%2BLSeObAV9ckYDAFcaq55ZWce5zJuA%2BbeEqpMEMIL91%2BvQtvn1Dvdv4ONaRTswi4G1Etx%2Bfhus71EOtjfLQxg9YHCHkGQF%2FjUia1%2ButuvpJl8CEsCbvnYEY%2FBqJpTUhmJFPQOoUO7Mi4oMkYvIYAEsw4yGpsEa08JpZ6eY7MSPxQrnnyK0LLJXUj0ZL5u0DF2UFznq8aT6xlDqphqX3sBgcBFWVZpqW%2BPbIfFSAG3%2F1Mtd%2F4K8OnlPdn8YtgQohqFMo4k8YYNRmwjt2K99rrPVb2mgMunn%2BwR%2FCT8rcw8J1%2F17zI45Rwaqq1xJNRUJfPIwsAd0cIbTKPWeZMFGEnoJv27xgyU1sK%2BNcnGztZ%2FYncozdkkf1oT6kXjknvmp3w77J7Lnq1t0WSE%2FE1Z2nH9Uas5%2FA%2BGVsYrbTD0NKhaWjJAxWvRVBe4fCvoLEo3DVwqgwzZ3RzQY6pgEwgXegbdD5AFjsOSQ8%2B6XBmxdJsMQzwMAWk%2FyG5Bs5Mg%2FFlFUq9YaJHifdXyu4fRHMIFm6gTScDYUgXPwFo4RYlI%2Fqscgsb%2BZSLSEy5uJA3KVxqphqJ2pS8v77M3dU4ddgvM23%2F09aD4TRvJFG2qbGMIucceqvMtDRXZZ4eKz4%2BnIwJur%2BCXKT14bzm9eR3yDajwOSLMc7vxJyUZCIrI%2BPc0GZ1YHI&X-Amz-Signature=6adc87da35742b1bbd14c413b5f1f118371f136c1045e9d5f819871a6dac37c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAWXTT7A%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICeUYtXrPAkavasv7u4ZzSL%2FeN1r873g6MMnUPrOpng9AiEAvmKErfJ53wcmNH1jvd%2FUGyiK15FIvrnTHproOH3Q3DMqiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLXfanFVJpU9wg9WCSrcA9ifInTnLumW8DBge4duvO3yOJE61L5BcytUWR4%2F65uQpX%2BROh4DJeFhkQ1TiKsHexFvZXN1F3obQDCAuSxNjxQQXM7HKOFFuEy71bZJozb80KToNZnk0PV%2BvKXj%2BzBQPWm0LGb7OR0%2FdC63yOm8SbQMLEZV0AR3Jm0p6xP1z6d97hocWbwy2eFImHj9joEQJEUVrV%2BX%2FKUeNAQXXZ9SeS9wsn21fVE3hcZGyGU2fd9PpjnEFzp3wOvaVx%2FsBnPOkFjs4Y9qUSNW6%2BNmKzxxU9L5Ui4QJnBaiVLn4thIVFnWmZ7NG3HppxriYCUi7uH6V6OrZ0xP7S7Lf1hUdcDEsy785%2FUPB17fhVWWXOjdAHz4u19DZCSohT8KZDA2yao0BXQN6iYqO5hq3N2zkvOj2DzPvNW6luE2834txzI7g55UarD9fASRF5YSVFBIWQBt9ud2HUbMT3uL0BJUYfXnRayTImIExgnbWYU%2BsyjailfW3LdRfejRrl1k5Zo6I0ZFtpbRRq1pAuMjHWiK7HAQeBRX%2Bz7%2FFCd4xBSEcxMwUodH9yK5Uh8mt3friinEOga306j%2BtJ%2BXQzD4ktVwOrUnl2PlVdg%2BkLYOefZJZozrHIt56N1arD%2BkII5wr0oEMIOc0c0GOqUBngnFndAHs%2F7US75N9AHQvzunv4UBMrcskzGcgTBKt7IELtUCORwpVp3s%2FSNYGsJiYeWHG3XlfKqpg5cLeelJRjPf4AzG6qTFZBpATo6FWB7HHHQA%2BKsCf9GFc0G2JyfRibVY%2BnrI5JBeP5a6ZOt%2FqRFXDd1pLMMzMWTxFvjVo9Y9YU%2Bk7zrU3WOqWshsfGR7DBXUlwXmNILHoTFwyOVjYE%2Fhoggq&X-Amz-Signature=85591b481ec581c7d24d459a04183e580e96fc2d771c8ef1278b9785904a3482&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CHONGZB%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAdxhooXzHjSH6EF6tz0CrgIcCEkY9QXMKZvvTI09yHRAiAwaskhrFRbxQuS%2FOfr7BpRzgHObjSswHmkxqo57y%2F81CqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhZ2xGrWqAr7BPSFjKtwDq3%2FLZVZioZahKLLaVPKrnNmpa%2BaOnJni%2Bn2L0jHQ7cGzgYSeC1b%2FTZTpkeaCmS1L1Wes6M6IN27e%2FrIPcu4EFb3Q9rDnGroDjb2kUYHIN7te%2F%2FV2bPnr2KVKn6sxTfPwvMr4ww8zO6rapYHGeHXuqdVOAlR13dlaEJ5UiZRv8Ok3q%2BJu35BeYT9gKt6zdv3F%2F87Rv%2F3HjZzwOKEPgeBzlv8yg2uuH%2B6ITza1hAYpzhcMtSb7sD%2Bx%2BoV0FJzJIKYrZ7%2FXCw2cUNxM1HuX2EPJLr7bv%2BRJvoqpEUZ12Blnga1gZvpOIuFQFyHKFmIY7YMAEVmgjfc5FHnRU7YWbh%2Fx8v5heTkRxjnO5YzlHQ89n7Oqd7Lu8cDH6TjW2DCOiqCEaeB93tD%2Bhe3na%2FXDqBbpijc7HDwKRzQB7T606cqhpne0jwwsrgkI6oe%2FFy44Ou5SYc0QSwQ8OEm1HljZHnFvUnUhP%2B4UL5T0CQ5ERYn69%2FbE4DrKdwM1a3p1qlD%2Fi0trnZQq7K4L%2B7gS4nKE%2FBfrw41G1GIUtbJAyyb0LibPcgtxZD0x6I9MGPjl7brBmCX2bF79Km1y9uhZQzIncGOCPXm9XXQArx5jt0fKV1NrhJFfwweG7ZqsRRmTC28wrJ7RzQY6pgF1xG0SDgd6ym4aQZMPwy0TJuCoE8kfz0xbmE9B2BjRtF836XP8OgHmrAWdERcJmJmBlgVGvSOzjYhL7xkPndqG38k6fAXPVQ4cT5w%2FbBO8DH%2BuM8pyK5qwBvTNzcTbx5%2FFYypz0IVBy9nh02vj%2B4v1SDtMp7Yg0WJ%2FQTSNHL06SJQ6lYJRPPJ8nA1B%2BTg%2FHND7IC%2F4inryUVoKzMrAxiIsuCObGeiv&X-Amz-Signature=f00298261c4328c1c21336de006e16079483e48d8427f83e40711d3ce647a105&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZOM2BXK%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192235Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDt16rZg3GUfY41sRjtFKWwvEGaWcE%2Bx0UoOAZDswXXUgIhAKzPEPtY%2Ft%2FMIxm2FjWMBmFbKlblw8MjRiBakdVkMeUsKogECJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIIsXEejDR8FJjN8Iq3AOu7CofNPftoM%2FqWcvcv4Gky1kThzVB%2FeOfXeKdHAngJtVpLkosbkJVNU4E%2FVstjxanHH6seaIIVLH1ulTNYBxa%2BRbGKqa2w%2Bn%2F5Iw5hiOgeQAv%2FgL68h5F8z5yWXrx98Z1Pe9xSbqw%2FVyCTpkCcRm9NNlR7lYg3OXYhpVgWchMq6K463Lw0BQcWpR5Yt%2FcnRTIcn8hltrdfni%2BxBc3%2ByYNm8IHZ6z6B5%2FkwhdRRXka7F4a1MKmGOSLfhKfJJHoFGmCCKr0ffaP4i7kyjPFZ4xgRdKj58%2FYsrm6g5het8P54OD7j1CtlGX5iph1SbFLMMysfN0pxmvq4%2FxT5OE9ZbxNTKBqCVsP4TvF2K4HbuW2kfWr2xDszrX7LwG%2FgGPU%2BP2ywvJAM6LDsut4yniRwRL%2BQ62da4WY99WSfU3ud6IJRSGMU%2B4dT8QutwXGYRRxhGmB46uEYJBZudsPgTxQAhLva0EpFtYaYuXwEECDg1jom64h1%2BEW%2FKlVKJqq9Y1udoO4yh4btueLtI393zCc3izPxn9o7k5050e%2F49eOqxiY00QIRiW1F07z4FCMM9076BGkH5TOn%2FH20ifNlM%2Ffs%2BepKU%2BwUDPvF2ZS6MieCkriTM7geRdvc7cnBuwLKDC2ndHNBjqkAWxfmVrpMqjPM1nbyxwhrsKy5DOeVW5GerzPzGWxohxSTYI24i8WesQ89BiSnj1JKiQPhMcI2v%2FV1JC9flC%2FWp6HMLW%2BkgzxQXhVBrkXxiasvYqnbOrrIpwnm3koOzHQRfMnxAeElrJodmmO2jAxwlR3bLSeQjju%2Ftr11Ei8GbauBVfjwaKFldcxHGsPU2J5TuYaQJyeqYXD9iNy4MUD%2FeJ6eX5T&X-Amz-Signature=14f843d6ab5fa1c7fb0bc9fee95d05915b8fb3a241c76f7ddf8d0bb7380b495b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBO34L76%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAnZnwsPddZXIfe%2BQeVco3v75fx9A5DBqKAj0B00wDnKAiBxVYVKzDjCa3vZ6eN9lD1XeKvxfHJSaMUHadcIs0msKyqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMy45WuNDGII4jvZDVKtwDZdixCZ%2FnogP4EBAeugs5Tj4t9lcOEU1MgLw6fdaUDlCbSVVdwG4efKptrzFuk3cR0qiAu58iTfHsF6qUHVb%2BYtnXK%2F1Ei0GEW4IqFuLnx5pJE65yJmB0NuR49FeSRwWKU7erlI2A2IGi00nMcThuSxBhyXhMkZSpjxtdijkSIIgSyHSLOEBU8x42ArT8B2MCCSiZWqATT5Dfjz9d9LCL7yuwvOr0aHadFUwB65N4IZkofyyx%2BNV1ySSQd7m%2F7bzx3yiUKv4E5L%2FsK5U2QT0PrElM7Ewuly%2FQ%2F5N02XFEE4R79VSJSY0uuHw2VKNffAAI38frg67VYKQME%2BWA4D2FCzoSg38vOC9e1W1%2BgOBFY%2FL54gaiS7gxrwCqkkjenZ3QSP3QMzl6DYT5c0WNycQ6ZCDhmcZnOOySIIcdcLJdlYaEFI%2B64VGnM7C5l5GQDE4NoNVn3TrVzFNmdTxSmnJKzJavjMv0XaAm9vV9yfZBPLbjQXiB01thbPUeDWY054YMsQTQTQe%2Ft4CyuG490jAbbiHebj6evSKHDdphLdgftUZETYffo0YCQrzHt2N2ddx1FHTlnAxUkLTE%2BLRjtfQ%2BeO7JCZU%2BMuOYZo0BKTAd2Zsf617mVIJ13yfDEn4w1pzRzQY6pgG6a3ijMjoUJbLTYSeGZBcrvIt4NzI2NuXa8Icssh3hNIG559Q04Udy3bcT6C88bEHyMW8Fyc45cjn87VyD5HYKxRu54x%2BeQ2Ejq0ms0%2BXPbBUsz5sKcjp08kHRajpONvJ%2BbuOHWeNllacU5pzmS7OiY3fUpgl5xUd6VdpqVQdk5PDw277y3YJy%2Bo8iH6ku9J73U9Aci2%2FZrzwNOxZ9cusCeAQo0hF7&X-Amz-Signature=644344243e794f142f7b9189e5514cde8a630f7269887ae39dcd149f3cd6c0e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBO34L76%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAnZnwsPddZXIfe%2BQeVco3v75fx9A5DBqKAj0B00wDnKAiBxVYVKzDjCa3vZ6eN9lD1XeKvxfHJSaMUHadcIs0msKyqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMy45WuNDGII4jvZDVKtwDZdixCZ%2FnogP4EBAeugs5Tj4t9lcOEU1MgLw6fdaUDlCbSVVdwG4efKptrzFuk3cR0qiAu58iTfHsF6qUHVb%2BYtnXK%2F1Ei0GEW4IqFuLnx5pJE65yJmB0NuR49FeSRwWKU7erlI2A2IGi00nMcThuSxBhyXhMkZSpjxtdijkSIIgSyHSLOEBU8x42ArT8B2MCCSiZWqATT5Dfjz9d9LCL7yuwvOr0aHadFUwB65N4IZkofyyx%2BNV1ySSQd7m%2F7bzx3yiUKv4E5L%2FsK5U2QT0PrElM7Ewuly%2FQ%2F5N02XFEE4R79VSJSY0uuHw2VKNffAAI38frg67VYKQME%2BWA4D2FCzoSg38vOC9e1W1%2BgOBFY%2FL54gaiS7gxrwCqkkjenZ3QSP3QMzl6DYT5c0WNycQ6ZCDhmcZnOOySIIcdcLJdlYaEFI%2B64VGnM7C5l5GQDE4NoNVn3TrVzFNmdTxSmnJKzJavjMv0XaAm9vV9yfZBPLbjQXiB01thbPUeDWY054YMsQTQTQe%2Ft4CyuG490jAbbiHebj6evSKHDdphLdgftUZETYffo0YCQrzHt2N2ddx1FHTlnAxUkLTE%2BLRjtfQ%2BeO7JCZU%2BMuOYZo0BKTAd2Zsf617mVIJ13yfDEn4w1pzRzQY6pgG6a3ijMjoUJbLTYSeGZBcrvIt4NzI2NuXa8Icssh3hNIG559Q04Udy3bcT6C88bEHyMW8Fyc45cjn87VyD5HYKxRu54x%2BeQ2Ejq0ms0%2BXPbBUsz5sKcjp08kHRajpONvJ%2BbuOHWeNllacU5pzmS7OiY3fUpgl5xUd6VdpqVQdk5PDw277y3YJy%2Bo8iH6ku9J73U9Aci2%2FZrzwNOxZ9cusCeAQo0hF7&X-Amz-Signature=57d6d4b56b4e0e6c1843e3bbec61400692c0623b01d5cfb67da449f3bacdb5a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTQPLS2J%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQChECCXGihVgNryPAbdQPtgnkygXAdv00Uqo5ZBkGqH%2BgIhAIgWwzwqQiya8eS2I4FBTb%2F20w%2BSRt4b%2B0YXf6I4sxnxKogECJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgznJVfvSfhka%2FBYyzwq3AOnJRy09ZSthEqHUEHP6X0u0fvHsFdDjkPy3cpF%2B3ND368YEPTHnczmWGN%2BXrO4KWPr7V9ayJdJgYJC00a5ZZl5kxNd2hS2JkPMBfH16QmkA3ZYJGIc1yySf5felVVPAa4Reuws0tQWOmnN74DV4TkBHG98AORlStsNZpx5WyigtP5dgdmZbFo%2FmbHtbrSnzNnOETy4TcZ9GPhwuQ1O62uMVg%2BUqqmLGfTY%2Fbp7ymFZWwzUheKSIKh2HJVM0NJIH755UzuWwBlBKYqWSlIA4JfGwpjZ%2FbQVVnofdCsHohoqwKjXnAPAb70%2BNHzyOLUVfmdycBba2k23F0l0r2U%2FX3qv%2FzM2bvTUsNcMbdEIdOLSGuxCYP2qDYzTXpRTImDV2s1tqZa8wlz6nc859%2FOe3%2FGFpG78N%2BwSSn9ZtwrAkqTQvXIWGXju9ECe97ZJwiENZRL5rqCu%2F%2FLKIjMICfkalhqrZCv0os8TX51bpjfU8QZJSu63eZSoWztnCQwMzJZKUERwxLI5LR1z0BctjH9BfUvZuQgadonMwlDicV3w6UpkXPpLSCy8wi3KejEf%2FR2bzS2bJHLPnUaxKGBQDcon1Jn2icj1hq8qzhz49d0b7yX8j36FSbD%2BXs9CL6OHezDvm9HNBjqkAZetni827kVQHCO%2FhHqqBPBvzkxpfWjHt3NWLiN9bqP8jRiZ%2F%2BEG9bx7sCkylTBP0kEAfh1BIa2XEKyb453UJ%2FG5yvUDZ%2FT2G4yTMwBANuR2%2FaKMqnwParzujiJsTvoSuWFhAwmZc9rRyHskAMsYtVoPAlbIXrV2vkUgyMHIEdkmX1MCbp3fmHdkLhhL6%2FBgioZG44HLVoe6%2BYo5yXQ25QGfNm4D&X-Amz-Signature=549cfcf13e05c6222b4314857b75629c0ffeb031b4a512d2df0bd5c08bf43477&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VJWSNUN%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBxVi%2FPGrkBqWwr%2Fqr78sdDm27TZDSIuDnjeKX1aBDPAAiBnBqGSobqyujwdTp%2Furg1x3xJsvjNEAVRG8KmU5ak6jCqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRj2HPQ%2BYBP%2FCh2xMKtwDpmA4Tz4EZ%2FICmuYOhfXPIOjsBrK8DfEy7B5qcEJqSBir7dZ6O%2B9sltzcZGtd9j5NUgGnVcGNC%2BVa6vyhCaaCg2CHveZozr74imUe8aFQDf5PWa1FU%2F7AakWO3v%2FjEbhymb0APPjFXcpo81JYhoiQEXOiUMoQl7PVTGQymIk1rjvdK4FtSN70kKy%2FV2UbIpAXXuPaRaK4WY9SVehGqg8kCbiAMhKBGT1eizuXLL3CWDrqRA7p2l9IHLK65FIwqIh5PG13qRhcDHA9HMMrjpUvoSARdV6f%2FBdjdNCAmPFMexD8xAw5rFjrSNpVU2FZmf1Sa%2Bt9MUIuYBTqIjw%2FJVTCRqdUReqBoEaiMvsbtb8nDSULT7qkA%2BUGjRL8o8yatbCZyYRuSJZe267mp9Ha7XFqT7YnxI%2FjRNEpnX%2FFuCismwIJi0FV%2Fbv0kc6%2BQbSBF3FGfXKUsPeCzR8iHmy%2B0dGm62tH0OH%2B5pTe%2Fcyft6j6G1e5PMhc1KeVNslxnSMFDo3h2iNFahG0eEX7iPWTiCvyLSbv9tlYal0i%2BuP4E08JJ3RWoiIwlp%2FLvy3y%2FzmrjLo6GBDkhDcoJ78%2FapuY902LbAAfidDh013vErWqwjsW%2FmSdfQDe2i%2FFEO6rD74w3Z3RzQY6pgGFDfxCf6uBGDEXIRoP32NpOyYQ7meUagqCOwPLNCy7dJe8eW6xiiEAN%2Fh%2FeGS7gilUJ7vlnD1h7YbLHZybCEqTkNrZwxU%2BPkXyXp8FH8ZQKiGnS5%2FSOsSVRvqMWYhGsFl%2FK8lE%2B%2BruKEwls0mAfJ4rlo0naSc8lAUkzwYdjYtKnGMXsGe9CLQgEFK6MTT7Hx2w1jHH6X2nrciPP1WAtoxnBk0hUAQE&X-Amz-Signature=2048d6e06b3ccce7c627f00562dbfba9b2735344d515045f859d82f56385877f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VJWSNUN%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBxVi%2FPGrkBqWwr%2Fqr78sdDm27TZDSIuDnjeKX1aBDPAAiBnBqGSobqyujwdTp%2Furg1x3xJsvjNEAVRG8KmU5ak6jCqIBAiT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRj2HPQ%2BYBP%2FCh2xMKtwDpmA4Tz4EZ%2FICmuYOhfXPIOjsBrK8DfEy7B5qcEJqSBir7dZ6O%2B9sltzcZGtd9j5NUgGnVcGNC%2BVa6vyhCaaCg2CHveZozr74imUe8aFQDf5PWa1FU%2F7AakWO3v%2FjEbhymb0APPjFXcpo81JYhoiQEXOiUMoQl7PVTGQymIk1rjvdK4FtSN70kKy%2FV2UbIpAXXuPaRaK4WY9SVehGqg8kCbiAMhKBGT1eizuXLL3CWDrqRA7p2l9IHLK65FIwqIh5PG13qRhcDHA9HMMrjpUvoSARdV6f%2FBdjdNCAmPFMexD8xAw5rFjrSNpVU2FZmf1Sa%2Bt9MUIuYBTqIjw%2FJVTCRqdUReqBoEaiMvsbtb8nDSULT7qkA%2BUGjRL8o8yatbCZyYRuSJZe267mp9Ha7XFqT7YnxI%2FjRNEpnX%2FFuCismwIJi0FV%2Fbv0kc6%2BQbSBF3FGfXKUsPeCzR8iHmy%2B0dGm62tH0OH%2B5pTe%2Fcyft6j6G1e5PMhc1KeVNslxnSMFDo3h2iNFahG0eEX7iPWTiCvyLSbv9tlYal0i%2BuP4E08JJ3RWoiIwlp%2FLvy3y%2FzmrjLo6GBDkhDcoJ78%2FapuY902LbAAfidDh013vErWqwjsW%2FmSdfQDe2i%2FFEO6rD74w3Z3RzQY6pgGFDfxCf6uBGDEXIRoP32NpOyYQ7meUagqCOwPLNCy7dJe8eW6xiiEAN%2Fh%2FeGS7gilUJ7vlnD1h7YbLHZybCEqTkNrZwxU%2BPkXyXp8FH8ZQKiGnS5%2FSOsSVRvqMWYhGsFl%2FK8lE%2B%2BruKEwls0mAfJ4rlo0naSc8lAUkzwYdjYtKnGMXsGe9CLQgEFK6MTT7Hx2w1jHH6X2nrciPP1WAtoxnBk0hUAQE&X-Amz-Signature=2048d6e06b3ccce7c627f00562dbfba9b2735344d515045f859d82f56385877f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WNAAEEH%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T192239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFOT6j8StkrhS9hdNfLxhlChy3IRD4oWBtvLBGnLqI0XAiEA9xevflta4683qK5o0UBi84QwbPFokZT7ChuLl9VCkMEqiAQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKfRLOPxc8CqMEUZFSrcA2GHgdBN2QFCihqONGRrtEQgZ%2BbMt4JU%2BEhjSs5t2wdqAc07HAtN8reHhRNZSAvKa5v9aZj0CVoHGnXPfSErWJpfEiMzkgd8QzI8XErA1K3lQwA%2BH%2FubS6B%2BBQXYflhqD%2Fea7zbt0Sp1RfKR2b06kKm291WGxSwWYCZ7R%2BzbR%2Bi1TfV634N%2FuwmtDBCFwrz%2BrePxc6CokdFlmTZAkR4m1wFdNhnW4v%2B4LFvV3%2FuOZafAJ3xLQDdQKQFaPb0Tg8oSgCbFG1LNLmjaTAQqgbDZLi%2BbiTLBfm9o10FXQj8KEjqeMNAb%2BwcrDng7qjDjxqtH1V%2ByxF9j1eBetphpVPIvhN9t6LttO6mIwD%2B1KaK%2Fwn0X0FfqpRfiVfvU1npaOy4gJpNUEoHAdzNgWQofCLQzJe92zg%2B6B8TBncA%2BtE5745Wt8i2ulC70V3KpDgNyyEFzTYfJUy0BZZ1dq8VUkOVRi4Xf3Fstsq2s9SIR0zMRFPw3V2fClsINH9rFmujorMVq11gPofurVXVzbyfzY5sXNxx95LQGU1OfonTPYaVZzfGtadY964r8%2FaEFlj62273PBtnP1pJJaWah012OlhKI517mD8BImeM23ThaBAB%2FA%2FftB%2FQ9PorcOkN58%2FzIMKed0c0GOqUBXH1s7pqpKq4oyMpwCAJ4BdXCJM0%2FTza%2F0d%2FwKgNzCgf8vnbMB0exjqOXpHhYAGPeil1dX%2FKTbI0HbNRLU9FxBjQCCB780RNyV4m2dgMVNgo4p4oF6I%2BLiSQjOv5GZlJoRfcZP8Rlv4GqjYQAkq1eD5XPI%2FSqK5doyXYRLQ5jucq7h2%2B3IaMnAIIvUrd8wYBI2YUjbjwhotjU7Cf0ytWWxT8UoyiK&X-Amz-Signature=74440e3add80e7266a1bb7863ef570e6c0d11882e93317c57c542f4e286edfc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

