---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TX7LIYSD%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T171248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQC%2BB0igOcWOm1Rw8LALK8HwEaztJeNxWisPWvn2wiwACAIgNQR8NQP1MGYI5YeXwnsOYkl%2FEhjVT4H%2BxRm85YFynJEq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDNOKALIqZ4jM55odQyrcA%2FFaJoZT%2BinHPO1DzXK30beVlIc8XD7yXAsAp4wveYoxoRH%2FW9eunXvT8MD5jtg7kCMsvm5ik25SUoTx3soMuJdb1WhEHYrPkU2tWDtzctbUKOotovxIZr3dHdX4OD9QdHtFMNIxNhwBCyY4muHCy%2FH0lQCZfdFB92n0n%2FyH2vyL%2FSfd0sX543i39YotAPfPb6K61UqY89tCwShwVxvopY8do2BN3fuvqbuXypAG2RGPqUf7z1wL1kPveYBQVf07DrgapSxtWooq8BDKHsuSLCXsSdvudxNXd%2FmhQhLRF2Y5ZYWIpySwSC5xZvhm0x5njkLSrrZVUuF%2Fw1%2BHGI1tuU9fkGpxt6UQEX0cPIdVl03ahYTZQWk93kT7MpRxvjkcQeZh%2FCT3cNXiXKsAwoREkmX8BT1z1waGFFKXSkt3P1i4%2F30ADwjiqlI5o9gFVnHGqspKbxX1wIzT5qoIHUweOYvdI1MHe8QdKihkbgvMmb%2Bsq5n0riKKfT7bqhUfxSl5Y9m1ZVpqByNxbHn0r6MaSINHtJzutVRos6DRl8fl%2FwTH5NcuUv2j%2BjknG0Ufq9iFQEThg1eZkUsmVJnP2vs48yLcM1%2BUJ6OQG2db0JMUCok%2B%2Fw916PaesTP9FiJhMPSfvMkGOqUBNTqKm8iu4uwUfldxMMxsfR7hhpPhyBrQi1evrDK2hQ%2FnnXmI6qmfGDOw60XYGr%2F6iyjWCp1XaZqktyxBdOAOLnBtxDRUcX%2BZBPCIMZW%2BeC6xRRCGLNQu9pRvY4ViKPMloVNJr74bJr43DX9HKDYWRUP68XlXdtI2Sh%2BVl87RKReahViGTFPDpZJs9a28yHPbp%2BCdrHbGEwu7YZ1PAgLo2CpuqeLf&X-Amz-Signature=e6c7bdd1c7ed7974268c8c64185d2bc48df1a5329c0bb898ebb2c21cf9d7ba91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TX7LIYSD%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T171248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQC%2BB0igOcWOm1Rw8LALK8HwEaztJeNxWisPWvn2wiwACAIgNQR8NQP1MGYI5YeXwnsOYkl%2FEhjVT4H%2BxRm85YFynJEq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDNOKALIqZ4jM55odQyrcA%2FFaJoZT%2BinHPO1DzXK30beVlIc8XD7yXAsAp4wveYoxoRH%2FW9eunXvT8MD5jtg7kCMsvm5ik25SUoTx3soMuJdb1WhEHYrPkU2tWDtzctbUKOotovxIZr3dHdX4OD9QdHtFMNIxNhwBCyY4muHCy%2FH0lQCZfdFB92n0n%2FyH2vyL%2FSfd0sX543i39YotAPfPb6K61UqY89tCwShwVxvopY8do2BN3fuvqbuXypAG2RGPqUf7z1wL1kPveYBQVf07DrgapSxtWooq8BDKHsuSLCXsSdvudxNXd%2FmhQhLRF2Y5ZYWIpySwSC5xZvhm0x5njkLSrrZVUuF%2Fw1%2BHGI1tuU9fkGpxt6UQEX0cPIdVl03ahYTZQWk93kT7MpRxvjkcQeZh%2FCT3cNXiXKsAwoREkmX8BT1z1waGFFKXSkt3P1i4%2F30ADwjiqlI5o9gFVnHGqspKbxX1wIzT5qoIHUweOYvdI1MHe8QdKihkbgvMmb%2Bsq5n0riKKfT7bqhUfxSl5Y9m1ZVpqByNxbHn0r6MaSINHtJzutVRos6DRl8fl%2FwTH5NcuUv2j%2BjknG0Ufq9iFQEThg1eZkUsmVJnP2vs48yLcM1%2BUJ6OQG2db0JMUCok%2B%2Fw916PaesTP9FiJhMPSfvMkGOqUBNTqKm8iu4uwUfldxMMxsfR7hhpPhyBrQi1evrDK2hQ%2FnnXmI6qmfGDOw60XYGr%2F6iyjWCp1XaZqktyxBdOAOLnBtxDRUcX%2BZBPCIMZW%2BeC6xRRCGLNQu9pRvY4ViKPMloVNJr74bJr43DX9HKDYWRUP68XlXdtI2Sh%2BVl87RKReahViGTFPDpZJs9a28yHPbp%2BCdrHbGEwu7YZ1PAgLo2CpuqeLf&X-Amz-Signature=e6c7bdd1c7ed7974268c8c64185d2bc48df1a5329c0bb898ebb2c21cf9d7ba91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWKO445M%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T171251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCk4BRTDkEWKDMnP%2FksqHmkKr%2BWRdrNfwL5ixHUvA8qnwIgAyl%2BUwibiL0JltsP%2F1AbDjhLnflpVECgoI1Nc4%2Fnmp8q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDO%2Bz9MBA%2BGRJqLK42yrcA%2BKDCKYrRHJ11b%2F3pMsJ1F%2FolvUwRwAF3bpvJN61nZJihXvPtO3yrAUQnuNHT0bkJbQfcLJrzVtoZKcEe8FvptUaShbGf8oVNN9wVqpikYdY%2FF6k4C1VZ4sezcw3u7lLIEaw0s%2BvkaxaXt42e7zFKTs3bj1fepDxn5lMaLiDkGdkxBDtb6eE94Er9KTmdBPuMuVJD6pOO2YVsDK0RRekxketcSH3HG9DGru7x9WGRDbtxDa3DYk%2BsufStUQtP85AYzadKdAx1dqGg7zsv8chMOrWpTCqCk2PgwKAPKTt4RkXccu3CUxuHAI4GgEOmGGEayk9oQbQNuLQehVq3dcOgfL0Hwgn1FrigOEAGLOHcIeIeXW6qCP8OPQt2NHVKXkCb6nAk9l92EqkcGOdOJ8ddLQb7%2BiLKztIirhUdAJBHy8fMYvKobF2g5dj5e1yPQYLc2rl81vKJKHrsRk28DKR6j1StRAQ%2FTkoje4tK5z3XJgUtqF7iWmk8FFVbrP9pmFSBx8Oxvx0P%2B2Br0H1J45F2DpxoqLcCKKQGiXUaN2AQGMDX8jg6Nm8AmgJ6QmZbrePoke5vCzqPFDJnc%2BpTu71q9Dk21LHpib7IMQF1vYW%2BS15Lo4xX806T90whEt6MImgvMkGOqUBHcFlxs%2ByhHbmkePlI3McP3%2BqKW4yJWlBn6Bf9Mcnqkob8og4UhhN3goP%2Bqn76hecc%2B4nFL787wWaA%2BM7jzGLF%2BW09%2F4LQ%2FYpy74%2FqQoQLX3yeSHO8XcvOWkWqiEIYTqSdiHTcwDi5R5S3PhxCeQUV9eTh31rbF2lIcvvIh4%2BCA7%2BgQy7Wr0URJfN%2BAElQJmAOwekf047b%2B9hL0cRAHSSN24w2onP&X-Amz-Signature=b00aa5322baa06a41b287a2133e2ec142f1d3b4cb1c65a8b4d0f70587823feee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWKO445M%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T171251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCk4BRTDkEWKDMnP%2FksqHmkKr%2BWRdrNfwL5ixHUvA8qnwIgAyl%2BUwibiL0JltsP%2F1AbDjhLnflpVECgoI1Nc4%2Fnmp8q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDO%2Bz9MBA%2BGRJqLK42yrcA%2BKDCKYrRHJ11b%2F3pMsJ1F%2FolvUwRwAF3bpvJN61nZJihXvPtO3yrAUQnuNHT0bkJbQfcLJrzVtoZKcEe8FvptUaShbGf8oVNN9wVqpikYdY%2FF6k4C1VZ4sezcw3u7lLIEaw0s%2BvkaxaXt42e7zFKTs3bj1fepDxn5lMaLiDkGdkxBDtb6eE94Er9KTmdBPuMuVJD6pOO2YVsDK0RRekxketcSH3HG9DGru7x9WGRDbtxDa3DYk%2BsufStUQtP85AYzadKdAx1dqGg7zsv8chMOrWpTCqCk2PgwKAPKTt4RkXccu3CUxuHAI4GgEOmGGEayk9oQbQNuLQehVq3dcOgfL0Hwgn1FrigOEAGLOHcIeIeXW6qCP8OPQt2NHVKXkCb6nAk9l92EqkcGOdOJ8ddLQb7%2BiLKztIirhUdAJBHy8fMYvKobF2g5dj5e1yPQYLc2rl81vKJKHrsRk28DKR6j1StRAQ%2FTkoje4tK5z3XJgUtqF7iWmk8FFVbrP9pmFSBx8Oxvx0P%2B2Br0H1J45F2DpxoqLcCKKQGiXUaN2AQGMDX8jg6Nm8AmgJ6QmZbrePoke5vCzqPFDJnc%2BpTu71q9Dk21LHpib7IMQF1vYW%2BS15Lo4xX806T90whEt6MImgvMkGOqUBHcFlxs%2ByhHbmkePlI3McP3%2BqKW4yJWlBn6Bf9Mcnqkob8og4UhhN3goP%2Bqn76hecc%2B4nFL787wWaA%2BM7jzGLF%2BW09%2F4LQ%2FYpy74%2FqQoQLX3yeSHO8XcvOWkWqiEIYTqSdiHTcwDi5R5S3PhxCeQUV9eTh31rbF2lIcvvIh4%2BCA7%2BgQy7Wr0URJfN%2BAElQJmAOwekf047b%2B9hL0cRAHSSN24w2onP&X-Amz-Signature=b00aa5322baa06a41b287a2133e2ec142f1d3b4cb1c65a8b4d0f70587823feee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VINIBI4A%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T171248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDT%2Fh98A2BEc0Xd8g7yJITWXO%2Bh%2Bmbq0FTFFXMINTHNEwIhANbnH6936sBSBPHfj92Vu0GpZkfph0MGLuRj3sHcHtRtKv8DCBkQABoMNjM3NDIzMTgzODA1IgxJ4Jh6RfGHRbwl3Usq3AN42jf2u6oB6LqXL%2F34qi0xTAdAJu8bGx2OvOOZDdcazU0R2vhYQhL54uCtJaSTdTPzSN8gNAxE2k2SWgeIAux5vj2OcrvPc58rnuMZKDi4q4K1ulnjadxz5vRqpta5LF80C909FHOLRB%2BYECG8%2BlPUp6dWV8fFavi7bJzp8OTUfonS5Zafu83w%2B8KWQT83u%2FTXbf3dMUKWURLSyb7ADMkUeqR%2F3ZhqlGfC%2FFtJut%2FDSB39FYZr9mDO2BqZfAR6nHJI%2F3zPiDr8nBwa8fameG%2FqsSRWB9PAe9ggidekQz8bhNqoaee4Y6hJFCwYEtgxAZjRKdNsbSDAUoezs5wdLqLqEqZSOwc3OL8MgeYcUB0rOyA0Y3T%2BV7ccRUHbTQ%2FZXSChOvT88Pb12MOaR7drgEHmQMgWZ6MYN7%2FQYu4Nh9gk2xTGRf8tMtkWb%2BCWJkyxOGpvqEl9nqzmd5w0lo8SMdaWxcS1%2BZq9z%2Fp%2FPb%2B8YyvVubl0XwuFqDxEGFV5vMgfA3v0CmTR%2FyOnGLu4mA0R%2BsCKDTvU9oIyMDmEfP6RyXU0qr5MnihemIzbqOpTRqky8E6GFELVzuvCDKdAbSbysKDmyACjXJaEaC5dB05diBDoFsvSRbhPboLenqLn1zCKoLzJBjqkAR6luCZNiE7KMmLIdA8z3UWtd2YsX36rUzYJvKBQx410uxfsmVYL1NcLjl89gSdqhTnmWdfF4VS5qKW9kXUSLBFTr27GEchOAqpEg7I2wiPnyRKSC2TrTM0jWBIt0mBLbo7tfrN4Fal9vVsm%2B7%2BfJeXnvMwQdBbi9K62UwNEK5nOtuumvzwPF26pHq%2FadS22t8QV%2BwOmiTKsBfUWpvuGhI90pPS3&X-Amz-Signature=3c1812fcfbd7c50984dcb7d50eff7c4eb50d9275ef5e245dbf29814cc46ae997&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4XCAFI6%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T171301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCICWut0KN8YaYJQGPoz31toIgRAt%2BtZVa0kWaWdE06XaZAiEAkqlva0p%2FN55LW1jNEG7%2FBSARphsV%2BLol6ENqVhKxipMq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDGmzEhAjMTzwFoo9vCrcA39GOInmAWi%2FU3PfCsV1cUZOeii%2BQrbuqpx6I8y6NkyXVdJzLowrZ6X6JshPU088UNxOpHBEYRS9hsbl%2B8ucR6BsjKUWVUSpY1qRDvB4dyr3RH8BOloKlqfXiZM1QmkIxEHV3sxD7VPB54JVTDDvNuTbdE4BeZ1jI8dXTTy%2BwlxGHVMSC0plbk067Mb2AOujIRNhVS4jfU7WPB6dfteW5xB70Cb04pCKXzyyiaNdiZ4mythwMB0qpk4yH1xSh7MF8Ta51sH2SwvHQlt80Mv8cSyA7hnBzn17ShV%2Fc0ck6e63YZm3FcfqaeQpPtuS5ZKgDx80e6BGtT3Vil%2FCTFGipU2e4QJv8ga0ah%2FqNj%2BTsgQ9wrqU9r%2FTVvxvsZAmR8QV%2BwhnhZ%2FYiuyvyFSvDpJi7F%2FTgi%2BaYBiYL4wkHIbqrd6E2zSox%2BynlOhlU8O%2FqlfHZcaHKJXgmFT%2BVhptCO959Pf6N7wFjGtbH%2BJHCXM2v6PakYLrGrTwIsD7HGrtZ3NA%2B88akiYRX8CDgGtd1Q7dglHm3xHLg2cfJWRiudk6NlN4OjfByRsil0suiFeYMgm0fFmIc1glHjdSoE%2BSk%2BL90%2FN7YrVjQB9dlhMAOh7KHbjJBfDKhEnYcRhEH9Q%2BMJGgvMkGOqUBDzt5RtxSUHG99l4eTMkKQcW9J4C2gXn8bBxmvmdsKAEqBJyZ%2FMQw3kNYxxKedQAmcu2TDG131rYUJDZqhTAvxlfkczig25HoSlxqKZAFzZIwGOGS58yJXwIr5TnlTPUj4SJQcDsEMps2VggkRpUK%2BemoNJk9f7QOMlJPHixLEuQN0z5noACeM9XUXrryDUlXnPCogRzLeYWg%2BY8u6XQOzhHYpZnK&X-Amz-Signature=88dbc5138c25e33118fd20fbdffc313f981248cf05d6100df73f799b096f1db3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4XCAFI6%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T171301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCICWut0KN8YaYJQGPoz31toIgRAt%2BtZVa0kWaWdE06XaZAiEAkqlva0p%2FN55LW1jNEG7%2FBSARphsV%2BLol6ENqVhKxipMq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDGmzEhAjMTzwFoo9vCrcA39GOInmAWi%2FU3PfCsV1cUZOeii%2BQrbuqpx6I8y6NkyXVdJzLowrZ6X6JshPU088UNxOpHBEYRS9hsbl%2B8ucR6BsjKUWVUSpY1qRDvB4dyr3RH8BOloKlqfXiZM1QmkIxEHV3sxD7VPB54JVTDDvNuTbdE4BeZ1jI8dXTTy%2BwlxGHVMSC0plbk067Mb2AOujIRNhVS4jfU7WPB6dfteW5xB70Cb04pCKXzyyiaNdiZ4mythwMB0qpk4yH1xSh7MF8Ta51sH2SwvHQlt80Mv8cSyA7hnBzn17ShV%2Fc0ck6e63YZm3FcfqaeQpPtuS5ZKgDx80e6BGtT3Vil%2FCTFGipU2e4QJv8ga0ah%2FqNj%2BTsgQ9wrqU9r%2FTVvxvsZAmR8QV%2BwhnhZ%2FYiuyvyFSvDpJi7F%2FTgi%2BaYBiYL4wkHIbqrd6E2zSox%2BynlOhlU8O%2FqlfHZcaHKJXgmFT%2BVhptCO959Pf6N7wFjGtbH%2BJHCXM2v6PakYLrGrTwIsD7HGrtZ3NA%2B88akiYRX8CDgGtd1Q7dglHm3xHLg2cfJWRiudk6NlN4OjfByRsil0suiFeYMgm0fFmIc1glHjdSoE%2BSk%2BL90%2FN7YrVjQB9dlhMAOh7KHbjJBfDKhEnYcRhEH9Q%2BMJGgvMkGOqUBDzt5RtxSUHG99l4eTMkKQcW9J4C2gXn8bBxmvmdsKAEqBJyZ%2FMQw3kNYxxKedQAmcu2TDG131rYUJDZqhTAvxlfkczig25HoSlxqKZAFzZIwGOGS58yJXwIr5TnlTPUj4SJQcDsEMps2VggkRpUK%2BemoNJk9f7QOMlJPHixLEuQN0z5noACeM9XUXrryDUlXnPCogRzLeYWg%2BY8u6XQOzhHYpZnK&X-Amz-Signature=88dbc5138c25e33118fd20fbdffc313f981248cf05d6100df73f799b096f1db3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

